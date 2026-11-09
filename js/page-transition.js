/* =====================================================================
   SURAJ GYAN MAHAVIDYALAYA — global cinematic page transition
   One shared component for every page:
     • builds the overlay once per document (no per-page markup)
     • plays the full intro on the first homepage visit of a session
     • plays the same cream + logo + gold-sweep transition on every
       internal navigation (menu links, buttons, back/forward)
     • prefetches destination pages on hover so the reveal is instant
   Loaded as the first element inside <body> so it paints before content.
===================================================================== */
(function () {
  "use strict";

  var REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (REDUCE) return; /* calm mode: plain, instant navigation */

  var root = (document.body && document.body.getAttribute("data-root")) || "";
  var COVER_MS = 900;   /* time the cover animation runs before we navigate */
  var ARRIVE_MS = 120;  /* settle time on the destination before revealing    */
  var FADE_MS = 380;    /* fade-out of the overlay                            */

  function read(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try {
      if (value === null) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, value);
    } catch (e) {}
  }

  /* ------------------------- build the overlay ------------------------- */
  var overlay = document.getElementById("pageTransition");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "pageTransition";
    overlay.className = "pt";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="pt-inner">' +
        '<div class="pt-logo">' +
          '<img src="' + root + 'assets/logo.webp" alt="" width="146" height="146" fetchpriority="high">' +
          '<span class="pt-sheen"></span>' +
        '</div>' +
        '<p class="pt-name">Suraj Gyan Mahavidhyalaya</p>' +
        '<p class="pt-tag" lang="hi">\u091c\u094d\u091e\u093e\u0928 \u2022 \u0935\u093f\u091c\u094d\u091e\u093e\u0928 \u2022 \u0936\u093f\u0915\u094d\u0937\u093e</p>' +
      '</div>';

    var here = document.currentScript;
    if (here && here.parentNode) here.parentNode.insertBefore(overlay, here);
    else document.body.insertBefore(overlay, document.body.firstChild);
  }

  var closing = null;

  function dbg(tag) {
    try {
      var l = JSON.parse(sessionStorage.getItem("pt-debug") || "[]");
      l.push({ t: Date.now(), page: location.pathname, tag: tag, nav: document.readyState });
      sessionStorage.setItem("pt-debug", JSON.stringify(l));
    } catch (e) {}
  }

  function reveal(delay) {
    dbg("reveal");
    window.clearTimeout(closing);
    overlay.classList.add("is-visible");
    closing = window.setTimeout(function () {
      overlay.classList.add("is-leaving");
      closing = window.setTimeout(function () {
        overlay.classList.remove("is-visible", "is-leaving", "is-entering");
      }, FADE_MS + 40);
    }, delay || 0);
  }

  function whenReady(cb) {
    if (document.readyState === "complete") return cb();
    var fired = false;
    function fire() {
      if (fired) return;
      fired = true;
      cb();
    }
    window.addEventListener("load", fire);
    window.setTimeout(fire, 350);
  }

  /* --------------------- arrivals and first visit --------------------- */
  var arriving = read("sgm-nav") === "1";
  write("sgm-nav", null);

  var isHome = /(^|\/)(index\.html?)?$/i.test(location.pathname);
  var firstHomeVisit = !arriving && isHome && read("sgm-intro") !== "1";

  dbg("boot arriving=" + arriving + " home=" + isHome);

  if (arriving) {
    /* We left the previous page while it was covered — pick up seamlessly. */
    overlay.classList.add("is-visible");
    whenReady(function () {
      window.setTimeout(function () { reveal(0); }, ARRIVE_MS);
    });
  } else if (firstHomeVisit) {
    write("sgm-intro", "1");
    overlay.classList.add("is-visible", "is-entering");
    window.setTimeout(function () { reveal(0); }, COVER_MS + 150);
  }

  /* ------------------------ outbound navigation ----------------------- */
  function targetUrl(link) {
    if (!link) return null;
    if (link.target && link.target !== "_self") return null;
    if (link.hasAttribute("download")) return null;
    var rel = (link.getAttribute("rel") || "").toLowerCase();
    if (rel.indexOf("external") > -1) return null;
    var raw = link.getAttribute("href");
    if (!raw || raw.charAt(0) === "#") return null;
    if (/^(mailto:|tel:|sms:|javascript:)/i.test(raw)) return null;
    var url;
    try { url = new URL(link.href, location.href); } catch (e) { return null; }
    if (url.origin !== location.origin) return null;
    if (!/\.html?$/i.test(url.pathname)) return null;
    /* same page (in-page anchors, filters, modal links) stays instant */
    if (url.pathname === location.pathname && url.search === location.search) return null;
    return url;
  }

  var navigating = false;

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest ? e.target.closest("a") : null;
    var url = targetUrl(link);
    if (!url) return;
    e.preventDefault();
    if (navigating) return;
    navigating = true;
    dbg("click " + url.pathname);
    write("sgm-nav", "1");
    overlay.classList.add("is-visible", "is-entering");
    window.setTimeout(function () { location.href = url.href; }, COVER_MS);
  }, true);

  /* Prefetch destinations on hover/focus so the transition has no wait. */
  var seen = Object.create(null);
  function prefetch(link) {
    var url = targetUrl(link);
    if (!url || seen[url.href]) return;
    seen[url.href] = 1;
    var tag = document.createElement("link");
    tag.rel = "prefetch";
    tag.href = url.href;
    (document.head || document.documentElement).appendChild(tag);
  }
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType === "touch") return;
    prefetch(e.target.closest ? e.target.closest("a") : null);
  }, { passive: true });
  document.addEventListener("focusin", function (e) {
    prefetch(e.target.closest ? e.target.closest("a") : null);
  });

  /* ------------------------ back / forward ---------------------------- */
  /* Leaving the page while covered: reset so a cached page never comes
     back with the overlay stuck on screen. */
  window.addEventListener("pagehide", function () {
    window.clearTimeout(closing);
    overlay.classList.remove("is-visible", "is-leaving", "is-entering");
  });

  /* Returned from the back/forward cache: play the same arrival reveal. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    write("sgm-nav", null);
    overlay.classList.remove("is-entering");
    reveal(ARRIVE_MS);
  });
})();
