/* =====================================================================
   SURAJ GYAN MAHAVIDYALAYA — affiliation.js
   Renders the eight affiliation document slots and enables a slot only
   when its PDF actually exists (so visitors never hit a broken link).

   Used in two places, from ONE document list:
     • pages/affiliation.html  — the Affiliation page cards
     • the course popup "View affiliation" (js/main.js)

   Document list + file paths:  affiliation-docs.js  (EDIT THAT FILE)
===================================================================== */
(function () {
  "use strict";

  var docs = window.AFFILIATION_DOCS || [];
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var probeCache = {}; /* url -> Promise<boolean>, so repeats are free */

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function cardHTML(d, i) {
    return '<article class="card doc-card" data-doc="' + esc(d.id) + '">' +
      '<span class="donum" aria-hidden="true">' + pad(i + 1) + "</span>" +
      '<span class="doc-ico" aria-hidden="true">\uD83D\uDCC4</span>' +
      "<h3>" + esc(d.title) + "</h3>" +
      '<p class="muted">' + esc(d.note || "") + "</p>" +
      '<div class="doc-foot">' +
        '<span class="doc-soon">Document Coming Soon</span>' +
      "</div>" +
      "</article>";
  }

  /* Is this path really a PDF? 404 / HTML error page / offline => no. */
  function probe(url, method) {
    var opts = { cache: "no-store" };
    if (method === "GET") opts.headers = { Range: "bytes=0-0" };
    return fetch(url, Object.assign({ method: method }, opts)).then(function (res) {
      if (res && (res.ok || res.status === 206)) {
        var type = (res.headers.get("content-type") || "").toLowerCase();
        if (!type || type.indexOf("pdf") > -1 || type.indexOf("octet-stream") > -1) return { ok: true };
      }
      /* some hosts refuse HEAD — retry with a tiny ranged GET */
      return { ok: false, blocked: !!res && (res.status === 405 || res.status === 501) };
    }).catch(function () { return { ok: false, blocked: false }; });
  }

  function available(url) {
    if (!probeCache[url]) {
      probeCache[url] = probe(url, "HEAD").then(function (r) {
        if (r.ok) return true;
        if (r.blocked) return probe(url, "GET").then(function (g) { return g.ok; });
        return false;
      });
    }
    return probeCache[url];
  }

  function enable(card, d, url) {
    var foot = card.querySelector(".doc-foot");
    if (foot) {
      foot.innerHTML =
        '<div class="doc-actions">' +
          '<a class="btn btn-blue btn-sm" href="' + esc(url) + '" target="_blank" rel="noopener">View PDF</a>' +
          '<a class="btn btn-outline btn-sm" href="' + esc(url) + '" download>Download</a>' +
        "</div>";
    }
    /* the whole card opens the document in a new tab */
    var cover = document.createElement("a");
    cover.className = "doc-stretch";
    cover.href = url;
    cover.target = "_blank";
    cover.rel = "noopener";
    cover.setAttribute("aria-label", "Open " + d.title + " (PDF, opens in a new tab)");
    card.appendChild(cover);
    card.classList.add("is-ready");
  }

  /* Fill any container with the eight slots and resolve each one. */
  function mount(root) {
    if (!root || !docs.length) return;
    root.innerHTML = docs.map(cardHTML).join("");
    docs.forEach(function (d) {
      var card = root.querySelector('[data-doc="' + d.id + '"]');
      if (!card || !window.fetch) return;
      var url = ROOT + d.file;
      available(url).then(function (ok) { if (ok) enable(card, d, url); });
    });
  }

  window.SGM_AFFILIATION = { docs: docs, mount: mount };

  /* The Affiliation page has a grid ready and no further setup. */
  var page = document.getElementById("affGrid");
  if (page) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { mount(page); });
    } else {
      mount(page);
    }
  }
})();
