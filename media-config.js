/* =====================================================================
   SGA MEDIA CONFIG  —  THE ONE FILE YOU EDIT FOR IMAGES & VIDEO
   ---------------------------------------------------------------------
   Every hero slide, photo, gallery item and video on the website comes
   from the arrays below. Add, edit or delete entries freely — the pages
   rebuild themselves automatically. Nothing else needs to change.

   Each entry:
     type       : "image" | "youtube" | "drive" | "vimeo" | "video"
     src        : local path (e.g. "assets/images/campus-1.jpg") OR a URL
     thumbnail  : optional small image for video tiles / posters
     title      : shown in the lightbox and to screen readers
     alt        : accessibility text for images
     category   : gallery filter bucket (see MEDIA.categories below)

   Leave src as "" and the site shows a neat labelled placeholder
   instead of a broken image — so the layout always looks complete.
===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Placeholder helper (window.ph) — generates a labelled SVG
     placeholder as a data URI. No 404s, no broken icons.
  --------------------------------------------------------------- */
  window.ph = function (label, w, h) {
    w = w || 800;
    h = h || 600;
    var t = String(label || "Photo")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    var big = Math.max(16, Math.round(w / 22));
    var small = Math.max(11, Math.round(w / 38));
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<rect width="100%" height="100%" fill="#14498f"/>' +
      '<path d="M0 ' + Math.round(h * 0.74) + ' L' + Math.round(w * 0.3) + ' ' + Math.round(h * 0.46) +
      ' L' + Math.round(w * 0.54) + ' ' + Math.round(h * 0.64) + ' L' + Math.round(w * 0.78) + ' ' + Math.round(h * 0.4) +
      ' L' + w + ' ' + Math.round(h * 0.56) + ' L' + w + ' ' + h + ' L0 ' + h + ' Z" fill="#0b2f6b" opacity="0.55"/>' +
      '<circle cx="' + Math.round(w * 0.79) + '" cy="' + Math.round(h * 0.22) + '" r="' + Math.round(h * 0.065) + '" fill="#f0b429"/>' +
      '<text x="50%" y="50%" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="' + big +
      '" font-weight="700" text-anchor="middle">' + t + '</text>' +
      '<text x="50%" y="' + (Math.round(h * 0.5) + big + 8) + '" fill="#f0b429" font-family="Segoe UI, Arial, sans-serif" font-size="' + small +
      '" text-anchor="middle">Suraj Gyan Mahavidyalaya \u00b7 Konch (Jalaun)</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };

  /* EDIT: the college logo is set in js/main.js — search for "EDIT: LOGO" */

  /* Local paths are made root-aware so one entry works on index.html and
     on pages/*.html (which sit one folder deeper). Leave URLs untouched. */
  var ROOTDIR = (document.body && document.body.getAttribute("data-root")) || "";
  function m(src) { return src ? ROOTDIR + src : ""; }

  var MEDIA = {

    /* ---- HOME PAGE HERO SLIDER (background images) ---------------- */
    hero: [
      { type: "image", src: m("assets/images/campus-courtyard.jpg"), title: "Main College Building", alt: "College building seen from the paved entrance courtyard" },
      { type: "image", src: m("assets/images/classroom.jpg"), title: "Smart Classrooms", alt: "Classroom with blackboard, desks and benches" },
      { type: "image", src: m("assets/images/library-reading-room.jpg"), title: "Library & Reading Room", alt: "College library with reading tables" }
    ],

    /* ---- HOME PAGE PHOTO STRIP ------------------------------------ */
    photos: [
      { type: "image", src: m("assets/images/main-entrance.jpg"), title: "Campus Entrance", category: "campus" },
      { type: "image", src: m("assets/images/indoor-games-room.jpg"), title: "Indoor Games", category: "sports" },
      { type: "image", src: m("assets/images/classroom.jpg"), title: "Classroom Session", category: "classroom" },
      { type: "image", src: m("assets/images/library-reading-room.jpg"), title: "Library", category: "library" },
      { type: "image", src: m("assets/images/computer-lab.jpg"), title: "Computer Lab", category: "lab" },
      { type: "image", src: m("assets/images/annual-function-2025-26.jpg"), title: "Annual Function", category: "events" }
    ],

    /* ---- GALLERY PAGE — PHOTOS ------------------------------------
       category must match an id in MEDIA.categories below.           */
    gallery: [
      { type: "image", src: m("assets/images/campus-courtyard.jpg"), title: "College Campus View", alt: "College building and paved courtyard under the campus trees", category: "campus" },
      { type: "image", src: m("assets/images/main-entrance.jpg"), title: "Main Gate", alt: "Entrance porch with the college name board", category: "campus" },
      { type: "image", src: m("assets/images/corridor.jpg"), title: "Corridor", alt: "Covered corridor along the classroom block", category: "campus" },
      { type: "image", src: m("assets/images/classroom.jpg"), title: "B.Ed. Classroom", alt: "Classroom with blackboard, desks and benches", category: "classroom" },
      { type: "image", src: m("assets/images/seminar-hall.jpg"), title: "Seminar Session", alt: "Seminar hall with a stage, banner and bench seating", category: "classroom" },
      { type: "image", src: m("assets/images/manuscript-workshop.jpg"), title: "Workshop Session", alt: "Students examining illustrated manuscripts spread out on a table during a workshop session", category: "classroom" },
      { type: "image", src: m("assets/images/library-reading-room.jpg"), title: "Library Reading Room", alt: "Reading room with wooden tables and cane chairs", category: "library" },
      { type: "image", src: m("assets/images/library-book-shelves.jpg"), title: "Book Shelves", alt: "Aisles of library shelves stacked with books", category: "library" },
      { type: "image", src: m("assets/images/chemistry-lab-balance.jpg"), title: "Science Laboratory", alt: "Student weighing a sample in the clean beaker zone of the chemistry lab", category: "lab" },
      { type: "image", src: m("assets/images/computer-lab.jpg"), title: "Computer Lab", alt: "Desktop computers set up in the computer lab", category: "lab" },
      { type: "image", src: m("assets/images/annual-function-2025-26.jpg"), title: "Annual Function 2025-26", alt: "Annual Function 2025-26 backdrop with the college stage decoration", category: "events" },
      { type: "image", src: m("assets/images/independence-day.jpg"), title: "Independence Day", alt: "Independence Day display with the tricolour, freedom-movement newspaper clippings and a 1947 map of India", category: "events" },
      { type: "image", src: m("assets/images/cricket-ground.jpg"), title: "Sports Meet", alt: "Cricket match in progress on the college ground", category: "sports" },
      { type: "image", src: m("assets/images/indoor-games-room.jpg"), title: "Indoor Games Room", alt: "Table tennis table, carrom board and chess wall art in the indoor games room", category: "sports" },
      { type: "image", src: m("assets/images/physics-lab.jpg"), title: "Physics Laboratory", alt: "Students performing an experiment on an optical bench in the physics lab", category: "lab" },
      { type: "image", src: m("assets/images/chemistry-lab.jpg"), title: "Chemistry Laboratory", alt: "Reagent bottles lined up on the chemistry lab bench", category: "lab" },
      { type: "image", src: m("assets/images/zoology-museum.jpg"), title: "Zoology Museum", alt: "Student studying preserved specimens in the zoology museum", category: "lab" },
      { type: "image", src: m("assets/images/volleyball-court.jpg"), title: "Volleyball Court", alt: "Volleyball court on the college sports ground", category: "sports" },
      { type: "image", src: m("assets/images/college-building-grounds.jpg"), title: "College Building & Grounds", alt: "Upper floors of the college building beside the open ground on the campus", category: "campus" }
    ],

    /* ---- GALLERY PAGE — VIDEOS ------------------------------------
       type    : "youtube" | "drive" | "vimeo" | "video" (direct mp4/webm)
       src     : full YouTube/Drive/Vimeo link, or a local file path
       thumbnail : tile image (a placeholder is used when empty)
       Leave src "" to keep a labelled "add your link" tile.          */
    videos: [
      { type: "youtube", src: "", thumbnail: "", title: "Annual Function Highlights", category: "events" },
      { type: "drive", src: "", thumbnail: "", title: "Campus Tour", category: "campus" },
      { type: "video", src: "", thumbnail: "", title: "Convocation Ceremony", category: "events" }
    ],

    /* ---- FACILITIES PAGE IMAGES (keys = facility ids in main.js) -- */
    facilities: {
      "smart-classroom": m("assets/images/classroom.jpg"),
      "library": m("assets/images/library-reading-room.jpg"),
      "science-lab": m("assets/images/chemistry-lab-balance.jpg"),
      "computer-lab": m("assets/images/computer-lab.jpg"),
      "seminar-hall": m("assets/images/seminar-hall.jpg"),
      "sports": m("assets/images/cricket-ground.jpg"),
      "common-room": "",
      "canteen": "",
      "campus": m("assets/images/campus-courtyard.jpg")
    },

    /* ---- COURSE AFFILIATION / NCTE PROOF --------------------------
       Shown from the course details popup: "View affiliation".
       Keys are the course ids used in js/main.js COURSES
       (bed, bled, ba, bcom, bsc, bca, ma).
       Each document:
         type  : "image" | "pdf"
         src   : local path (e.g. "assets/images/affiliation/bed-ncte.jpg")
                 or a full URL. Leave "" to show a to-be-added slot.
         title : caption shown under the document
         alt   : accessibility text (images)                              */
    affiliation: {
      bed:  [ { type: "image", src: "", title: "NCTE recognition — B.Ed.", alt: "NCTE recognition letter for the B.Ed. programme" } ],
      bled: [ { type: "image", src: "", title: "NCTE recognition — B.El.Ed.", alt: "NCTE recognition letter for the B.El.Ed. programme" } ],
      ba:   [ { type: "image", src: "", title: "University affiliation — B.A.", alt: "Bundelkhand University affiliation for B.A." } ],
      bcom: [ { type: "image", src: "", title: "University affiliation — B.Com", alt: "Bundelkhand University affiliation for B.Com" } ],
      bsc:  [ { type: "image", src: "", title: "University affiliation — B.Sc.", alt: "Bundelkhand University affiliation for B.Sc." } ],
      bca:  [ { type: "image", src: "", title: "University affiliation — B.C.A.", alt: "Bundelkhand University affiliation for B.C.A." } ],
      ma:   [ { type: "image", src: "", title: "University affiliation — M.A.", alt: "Bundelkhand University affiliation for M.A." } ]
    },

    /* ---- GALLERY FILTER CHIPS ------------------------------------- */
    categories: [
      { id: "all", label: "All" },
      { id: "campus", label: "Campus" },
      { id: "classroom", label: "Classrooms" },
      { id: "library", label: "Library" },
      { id: "lab", label: "Laboratories" },
      { id: "events", label: "Events" },
      { id: "sports", label: "Sports" }
    ]
  };

  window.MEDIA = MEDIA;
})();
