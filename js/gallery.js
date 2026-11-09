/* =====================================================================
   SURAJ GYAN MAHAVIDYALAYA — gallery.js
   Photos/videos tabs, category filters, lightbox and video modal.
   Reads everything from window.MEDIA (media-config.js).
===================================================================== */
(function () {
  "use strict";

  var M = window.MEDIA || {};
  var ph = window.ph || function (l) { return l; };
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  var state = { cat: "all", index: 0, items: [] };

  /* ------------------------------------------------------------------
     TABS: Photos / Videos
  ------------------------------------------------------------------ */
  function initTabs() {
    var tabs = $$("[data-tab]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
        var showFilters = tab.getAttribute("data-tab") === "photos";
        var chips = $("#galFilters");
        if (chips) chips.hidden = !showFilters;
      });
    });
  }

  /* ------------------------------------------------------------------
     CATEGORY FILTER CHIPS
  ------------------------------------------------------------------ */
  function renderFilters() {
    var host = $("#galFilters");
    if (!host) return;
    var cats = (M.categories || []).slice();
    if (!cats.length) return;
    host.innerHTML = cats.map(function (c, i) {
      return '<button class="chip" type="button" data-gcat="' + esc(c.id) + '" aria-pressed="' + (i === 0) + '">' + esc(c.label) + "</button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-gcat]");
      if (!btn) return;
      $$("[data-gcat]", host).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      state.cat = btn.getAttribute("data-gcat");
      renderPhotos();
    });
  }

  /* ------------------------------------------------------------------
     PHOTOS GRID + LIGHTBOX
  ------------------------------------------------------------------ */
  function renderPhotos() {
    var host = $("#galGrid");
    if (!host) return;
    var all = M.gallery || [];
    var list = all.filter(function (p) { return state.cat === "all" || p.category === state.cat; });
    state.items = list;
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">No photos in this category yet. Add images in <code>media-config.js</code>.</div>';
      return;
    }
    host.innerHTML = list.map(function (p, i) {
      var src = p.src || ph(p.title || "Photo", 900, 700);
      return '<button class="g-item" type="button" data-lb="' + i + '" aria-label="Open photo: ' + esc(p.title) + '">' +
        '<img src="' + esc(src) + '" alt="' + esc(p.alt || p.title) + '" loading="lazy" decoding="async">' +
        '<span class="cap">' + esc(p.title) + "</span></button>";
    }).join("");
    $$("[data-lb]", host).forEach(function (btn) {
      btn.addEventListener("click", function () { openLightbox(+btn.getAttribute("data-lb")); });
    });
  }

  function openLightbox(i) {
    var dlg = $("#lightbox");
    if (!dlg || !state.items.length) return;
    state.index = (i + state.items.length) % state.items.length;
    var item = state.items[state.index];
    var img = $("#lbImg", dlg), cap = $("#lbCap", dlg);
    if (img) {
      img.src = item.src || ph(item.title || "Photo", 1200, 900);
      img.alt = item.alt || item.title || "Gallery photo";
    }
    if (cap) cap.textContent = item.title || "";
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute("open", "");
  }

  function stepLightbox(dir) { openLightbox(state.index + dir); }

  function initLightbox() {
    var dlg = $("#lightbox");
    if (!dlg) return;
    var prev = $("#lbPrev", dlg), next = $("#lbNext", dlg);
    if (prev) prev.addEventListener("click", function () { stepLightbox(-1); });
    if (next) next.addEventListener("click", function () { stepLightbox(1); });
    document.addEventListener("keydown", function (e) {
      if (!dlg.open) return;
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }

  /* ------------------------------------------------------------------
     VIDEOS
  ------------------------------------------------------------------ */
  function ytId(url) {
    var s = String(url).trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    var m = s.match(/[?&]v=([\w-]{11})/) || s.match(/youtu\.be\/([\w-]{11})/) ||
            s.match(/\/shorts\/([\w-]{11})/) || s.match(/\/embed\/([\w-]{11})/);
    return m ? m[1] : null;
  }

  function resolveVideo(item) {
    var s = String((item && item.src) || "").trim();
    if (!s) return null;
    var type = item.type || "";
    if (type === "youtube" || /youtube\.com|youtu\.be/.test(s)) {
      var id = ytId(s);
      return id ? { kind: "iframe", url: "https://www.youtube-nocookie.com/embed/" + id + "?rel=0" } : null;
    }
    if (type === "drive" || /drive\.google\.com/.test(s)) {
      var m = s.match(/\/d\/([^/]+)/);
      return { kind: "iframe", url: m ? "https://drive.google.com/file/d/" + m[1] + "/preview" : s };
    }
    if (type === "vimeo" || /vimeo\.com/.test(s)) {
      var v = s.match(/vimeo\.com\/(\d+)/);
      return v ? { kind: "iframe", url: "https://player.vimeo.com/video/" + v[1] } : null;
    }
    return { kind: "video", url: s };
  }

  function renderVideos() {
    var host = $("#videoGrid");
    if (!host) return;
    var list = M.videos || [];
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">No videos yet — add YouTube/Drive/mp4 links in <code>media-config.js</code>.</div>';
      return;
    }
    host.innerHTML = list.map(function (v, i) {
      var thumb = v.thumbnail || ph(v.title || "Video", 640, 360);
      return '<button class="v-tile" type="button" data-vid="' + i + '">' +
        '<span class="thumb"><img src="' + esc(thumb) + '" alt="" loading="lazy" decoding="async">' +
        '<span class="play" aria-hidden="true"><span>\u25B6</span></span></span>' +
        '<span class="v-title">' + esc(v.title || "Video") + "</span></button>";
    }).join("");
    $$("[data-vid]", host).forEach(function (btn) {
      btn.addEventListener("click", function () { openVideo(list[+btn.getAttribute("data-vid")]); });
    });
  }

  function openVideo(item) {
    var dlg = $("#videoModal");
    if (!dlg) return;
    var stage = $("#videoStage", dlg), title = $("#videoTitle", dlg);
    if (title) title.textContent = item.title || "Video";
    var resolved = resolveVideo(item);
    if (!stage) return;
    if (!resolved) {
      stage.innerHTML = '<div class="empty-state" style="margin:1rem">' +
        "Video link not set yet.<br>Add a YouTube / Google Drive / Vimeo / MP4 URL for this item in " +
        "<code>media-config.js</code> → <code>MEDIA.videos</code>.</div>";
    } else if (resolved.kind === "iframe") {
      stage.innerHTML = '<iframe class="video-frame" src="' + esc(resolved.url) +
        '" title="' + esc(item.title || "Video") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    } else {
      stage.innerHTML = '<video class="video-frame" controls preload="none"' +
        (item.thumbnail ? ' poster="' + esc(item.thumbnail) + '"' : "") +
        ' src="' + esc(resolved.url) + '"></video>';
    }
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute("open", "");
    /* stop playback when closed */
    dlg.addEventListener("close", function () { stage.innerHTML = ""; }, { once: true });
  }

  /* ------------------------------------------------------------------ */
  function init() {
    if (!document.getElementById("galGrid")) return; /* gallery page only */
    initTabs();
    renderFilters();
    renderPhotos();
    renderVideos();
    initLightbox();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
