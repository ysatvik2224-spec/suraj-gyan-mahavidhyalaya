/* =====================================================================
   SURAJ GYAN MAHAVIDYALAYA — main.js
   Header & footer injection, content data, hero slider, toggles, forms.
   EDIT the marked sections only; everything else is generic plumbing.
===================================================================== */
(function () {
  "use strict";

  var ROOT = document.body.getAttribute("data-root") || "";
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================= EDIT: COLLEGE DETAILS ===================== */
  var COLLEGE = {
    name: "Suraj Gyan Mahavidyalaya",
    tagline: "Learn · Teach · Grow",
    address: "Panchanan Chauraha, Jalaun Road, Konch, Jalaun, Uttar Pradesh 285205",
    phones: ["+91 94155 88183", "+91 73882 60488"],
    whatsapp: "919415588183",
    email: "info@surajgyanmahavidyalaya.edu.in",
    established: 2010,
    affiliation: "Bundelkhand University, Jhansi",
    approval: "NCTE Approved",
    facebook: "https://www.facebook.com/sgmkonch/",
    instagram: ""
  };

  /* ======================= EDIT: LOGO ================================= */
  var LOGO = "assets/logo.webp";
  var LOGO_ALT = "assets/logo.svg";
  var LOGO_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
    '<rect width="120" height="120" rx="24" fill="#0b2f6b"/>' +
    '<circle cx="60" cy="60" r="45" fill="none" stroke="#f0b429" stroke-width="5"/>' +
    '<path d="M34 75 L60 34 L86 75" fill="none" stroke="#f0b429" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect x="40" y="82" width="40" height="7" rx="3.5" fill="#ffffff"/></svg>');

  /* ======================= EDIT: MENU ================================= */
  var NAV = [
    { label: "Home", hi: "\u0939\u094B\u092E", href: "index.html" },
    { label: "About", hi: "\u092A\u0930\u093F\u091A\u092F", href: "pages/about.html" },
    { label: "Students", hi: "\u091B\u093E\u0924\u094D\u0930", href: "pages/students.html", children: [
      { label: "Students", hi: "\u091B\u093E\u0924\u094D\u0930", href: "pages/students.html" },
      { label: "Academics", hi: "\u0936\u0948\u0915\u094D\u0937\u0923\u093F\u0915", href: "pages/academics.html" },
      { label: "Courses", hi: "\u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E", href: "pages/courses.html" }
    ] },
    { label: "Admissions", hi: "\u092A\u094D\u0930\u0935\u0947\u0936", href: "pages/admissions.html" },
    { label: "Gallery", hi: "\u0917\u0948\u0932\u0930\u0940", href: "pages/gallery.html" },
    { label: "Facilities", hi: "\u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0901", href: "pages/facilities.html" },
    { label: "Affiliation", hi: "\u0938\u0902\u092C\u0926\u094D\u0927\u0924\u093E", href: "pages/affiliation.html" },
    { label: "Contact", hi: "\u0938\u0902\u092A\u0930\u094D\u0915", href: "pages/contact.html" }
  ];

  /* ======================= EDIT: COURSES ============================== */
  var COURSES = [
    { id: "bed", icon: "\uD83C\uDF93", name: "B.Ed. — Bachelor of Education", group: "Teacher Education", seats: 100,
      blurb: "Our flagship teacher-education programme preparing graduates for classrooms in schools across Uttar Pradesh and beyond." },
    { id: "bled", icon: "\uD83C\uDF3E", name: "B.El.Ed. — Bachelor of Elementary Education", group: "Teacher Education", seats: 50,
      blurb: "Elementary-level teacher training focused on child development, pedagogy and activity-based learning." },
    { id: "ba", icon: "\uD83C\uDFAD", name: "B.A. — Bachelor of Arts", group: "Arts & Commerce", seats: 420,
      blurb: "Undergraduate arts degree with subjects offered by the university, as per availability at the college.\nSubjects offered: Hindi, English, History, Geography, Home Science, Political Science, Education." },
    { id: "bcom", icon: "\uD83D\uDCB0", name: "B.Com — Bachelor of Commerce", group: "Arts & Commerce", seats: 60,
      blurb: "Commerce graduation covering accountancy, business studies and economics fundamentals." },
    { id: "bsc", icon: "\uD83E\uDDEA", name: "B.Sc. — Bachelor of Science", group: "Science & Computing", seats: 240,
      blurb: "Science graduation with subject combinations offered by the university, as per availability.\nSubjects offered: Physics, Chemistry, Mathematics, Zoology, Botany." },
    { id: "bca", icon: "\uD83D\uDCBB", name: "B.C.A. — Bachelor of Computer Applications", group: "Science & Computing", seats: 60,
      blurb: "Computer applications degree building programming, database and software development skills." },
    { id: "ma", icon: "\u2705", name: "M.A. — Master of Arts", group: "Master's", seats: null,
      blurb: "Postgraduate degree in the arts, building on a graduation background with advanced specialisation and research orientation.\nSubjects offered: Hindi, English, Geography, Political Science." }
  ];
  var COURSE_GROUPS = ["Teacher Education", "Arts & Commerce", "Science & Computing", "Library Science", "Master's"];

  /* ======================= EDIT: FACILITIES (9) ======================= */
  var FACILITIES = [
    { id: "smart-classroom", icon: "\uD83C\uDFEB", title: "Smart Classrooms", text: "Spacious, well-lit classrooms with blackboard/whiteboard teaching aids and seating for full batches." },
    { id: "library", icon: "\uD83D\uDCDA", title: "Library & Reading Room", text: "Textbooks, reference books, journals and competitive-exam material with a quiet reading area." },
    { id: "science-lab", icon: "\uD83E\uDDEA", title: "Science Laboratories", text: "Practical-work arrangements for science subject demonstrations and experiments." },
    { id: "computer-lab", icon: "\uD83D\uDCBB", title: "Computer Lab", text: "Systems for practical computer classes, projects, internet research and digital literacy." },
    { id: "seminar-hall", icon: "\uD83D\uDCE2", title: "Seminar Hall", text: "A hall for seminars, guest lectures, orientation programmes and departmental events." },
    { id: "sports", icon: "\u26BD", title: "Sports & Games", text: "Ground for cricket, kabaddi and athletics plus indoor games for students' all-round development." },
    { id: "common-room", icon: "\uD83D\uDC6E", title: "Common Rooms", text: "Separate common rooms for boys and girls with safety and anti-ragging measures in place." },
    { id: "canteen", icon: "\u2615", title: "Canteen", text: "Hygienic refreshment counter serving tea, snacks and lunch at student-friendly prices." },
    { id: "campus", icon: "\uD83C\uDFE2", title: "Green Campus", text: "About 3 acres of peaceful, green campus on Panchanan Chauraha, Jalaun Road, Konch." }
  ];

  /* ======================= EDIT: FACULTY (sample — replace) =========== */
  var FACULTY = [
    { name: "Dr. ————————— (EDIT)", dept: "Education / B.Ed. Department", photo: "" },
    { name: "Mr. ————————— (EDIT)", dept: "Arts & Commerce Department", photo: "" },
    { name: "Ms. ————————— (EDIT)", dept: "Science & Computing Department", photo: "" },
    { name: "Mr. ————————— (EDIT)", dept: "Library & Physical Education", photo: "" }
  ];

  /* ======================= EDIT: TESTIMONIALS (samples) ============== */
  var TESTIMONIALS = [
    { quote: "EDIT - replace with a real student or alumnus review of the college.", who: "Student Name (EDIT)", role: "B.Ed. batch" },
    { quote: "EDIT - a short line about teaching quality, discipline or campus life here.", who: "Student Name (EDIT)", role: "B.El.Ed. batch" },
    { quote: "EDIT - an alumnus review, placement or higher-study experience here.", who: "Alumnus Name (EDIT)", role: "B.A. batch" }
  ];

  /* ======================= EDIT: NOTICES & EVENTS (samples) ========== */
  var NOTICES = [
    { date: "2026-04-10", cat: "Admissions", title: "Admission open — B.Ed. & B.El.Ed. session 2026-27", body: "Enquiry forms are being accepted at the college office. Contact the office for the current process and dates. (EDIT)" },
    { date: "2026-04-02", cat: "Exams", title: "Examination timetable — semester/yearly exams", body: "Detailed date sheet will be displayed on the notice board and published here. (EDIT)" },
    { date: "2026-03-25", cat: "Events", title: "Seminar on New Education Policy & modern teaching methods", body: "The Department of Education organised a seminar for B.Ed. trainees. (EDIT)" },
    { date: "2026-03-15", cat: "Admissions", title: "Counselling & document verification schedule", body: "Bring original documents along with two photocopies. (EDIT)" },
    { date: "2026-03-01", cat: "Exams", title: "Result declaration — internal assessment", body: "Results are displayed on the notice board and shared with class representatives. (EDIT)" },
    { date: "2026-02-20", cat: "Events", title: "Annual function & prize distribution", body: "Cultural programme, felicitation and sports prizes. (EDIT)" }
  ];
  var EVENTS = [
    { date: "2026-05-05", title: "Orientation & registration week", body: "New-batch orientation, syllabus walkthrough and ID card distribution. (EDIT)" },
    { date: "2026-05-20", title: "Inter-college sports meet", body: "Cricket, kabaddi, athletics and indoor games. (EDIT)" },
    { date: "2026-06-10", title: "Career & higher-study guidance camp", body: "Guest lectures on B.Ed. entrance, TET and further studies. (EDIT)" }
  ];

  /* ============================== helpers ============================= */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function phSrc(label, w, h) { return window.ph ? window.ph(label, w, h) : ""; }
  function imgTag(src, label, w, h, alt, cls) {
    var s = src || phSrc(label, w, h);
    return '<img src="' + esc(s) + '" alt="' + esc(alt || label) + '" loading="lazy" decoding="async"' +
      (cls ? ' class="' + cls + '"' : "") + ">";
  }
  function telHref(p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); }
  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
  function dateBadge(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return '<span class="date">' + esc(iso) + "</span>";
    return '<span class="date"><strong>' + d.getDate() + "</strong>" +
      d.toLocaleDateString("en-IN", { month: "short", year: "numeric" }) + "</span>";
  }
  var courseById = {};
  COURSES.forEach(function (c) { courseById[c.id] = c; });

  /* ============================== HEADER ============================== */
  function renderHeader() {
    var host = $("#site-header");
    if (!host) return;
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    function fileOf(href) { return href.split("/").pop().toLowerCase(); }
    var links = NAV.map(function (item) {
      var kids = item.children || [];
      var active = fileOf(item.href) === here || kids.some(function (k) { return fileOf(k.href) === here; });
      if (!kids.length) {
        return '<li><a href="' + ROOT + item.href + '"' +
          (active ? ' class="active" aria-current="page"' : "") +
          ' data-hi="' + esc(item.hi) + '">' + esc(item.label) + "</a></li>";
      }
      /* item with a submenu (e.g. Students → Students / Academics) */
      return '<li class="has-sub">' +
        '<a class="sub-toggle' + (active ? " active" : "") + '" href="' + ROOT + item.href + '" aria-haspopup="true">' +
          '<span class="lbl" data-hi="' + esc(item.hi) + '">' + esc(item.label) + "</span>" +
          '<span class="caret" aria-hidden="true">\u25BE</span>' +
        "</a>" +
        '<ul class="sub-menu">' + kids.map(function (k) {
          var kOn = fileOf(k.href) === here;
          return '<li><a href="' + ROOT + k.href + '"' +
            (kOn ? ' class="active" aria-current="page"' : "") +
            ' data-hi="' + esc(k.hi || k.label) + '">' + esc(k.label) + "</a></li>";
        }).join("") + "</ul></li>";
    }).join("");

    host.innerHTML =
      '<header class="site-header" id="siteHeader">' +
        '<div class="container header-inner">' +
          '<a class="brand" href="' + ROOT + 'index.html">' +
            '<img src="' + esc(LOGO ? ROOT + LOGO : LOGO_FALLBACK) + '" alt="' + esc(COLLEGE.name) + ' logo" width="56" height="56">' +
            '<span class="brand-text"><strong>' + esc(COLLEGE.name) + "</strong><small>" + esc(COLLEGE.tagline) + "</small></span>" +
          "</a>" +
          '<div class="header-actions">' +
            '<button class="icon-btn" id="langToggle" type="button" aria-label="Switch language between English and Hindi">हिं</button>' +
            '<button class="icon-btn" id="themeToggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">\uD83C\uDF19</button>' +
            '<a class="btn btn-gold btn-sm header-cta" href="' + ROOT + 'pages/admissions.html">Admission</a>' +
            '<button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navMenu" aria-label="Open menu">' +
              "<span></span><span></span><span></span>" +
            "</button>" +
          "</div>" +
          '<ul class="nav-links" id="navMenu">' + links + "</ul>" +
        "</div>" +
      "</header>";

    initNav();
    initLang();
    initTheme();
    initHeaderScroll();
  }

  function initHeaderScroll() {
    var header = $("#siteHeader");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initNav() {
    var toggle = $("#navToggle"), menu = $("#navMenu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus();
      }
    });
  }

  /* ============================== THEME =============================== */
  function initTheme() {
    var btn = $("#themeToggle");
    if (!btn) return;
    var apply = function (t) {
      document.documentElement.setAttribute("data-theme", t);
      btn.textContent = t === "dark" ? "\u2600" : "\uD83C\uDF19";
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };
    var cur = "light";
    try { cur = localStorage.getItem("sgm-theme") || "light"; } catch (e) {}
    apply(cur);
    btn.addEventListener("click", function () {
      cur = cur === "dark" ? "light" : "dark";
      try { localStorage.setItem("sgm-theme", cur); } catch (e) {}
      apply(cur);
    });
  }

  /* ============================== LANGUAGE ============================ */
  function initLang() {
    var btn = $("#langToggle");
    if (!btn) return;
    var lang = "en";
    try { lang = localStorage.getItem("sgm-lang") || "en"; } catch (e) {}
    var apply = function () {
      document.documentElement.lang = lang;
      $$("[data-hi]").forEach(function (node) {
        if (!node.hasAttribute("data-en")) node.setAttribute("data-en", node.textContent.trim());
        node.textContent = lang === "hi" ? node.getAttribute("data-hi") : node.getAttribute("data-en");
      });
      btn.textContent = lang === "hi" ? "EN" : "\u0939\u093F\u0902";
      btn.setAttribute("aria-label", lang === "hi" ? "Switch to English" : "हिंदी में देखें");
    };
    btn.addEventListener("click", function () {
      lang = lang === "hi" ? "en" : "hi";
      try { localStorage.setItem("sgm-lang", lang); } catch (e) {}
      apply();
    });
    apply();
  }

  /* ============================== FOOTER ============================== */
  function renderFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var quickList = [];
    NAV.forEach(function (n) {
      if (n.label === "Home") return;
      quickList.push({ label: n.label, href: n.href });
      (n.children || []).forEach(function (k) {
        if (k.label !== n.label) quickList.push({ label: k.label, href: k.href });
      });
    });
    var quick = quickList.map(function (n) { return '<li><a href="' + ROOT + n.href + '">' + esc(n.label) + "</a></li>"; }).join("");
    var courseLinks = COURSES.map(function (c) {
      return '<li><a href="' + ROOT + 'pages/courses.html">' + esc(c.name) + "</a></li>";
    }).join("");
    var social = "";
    if (COLLEGE.facebook) social += '<a href="' + esc(COLLEGE.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">f</a>';
    if (COLLEGE.instagram) social += '<a href="' + esc(COLLEGE.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">ig</a>';
    social += '<a href="https://wa.me/' + esc(COLLEGE.whatsapp) + '" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>';

    host.innerHTML =
      '<footer class="site-footer">' +
        '<div class="container footer-grid">' +
          "<div>" +
            '<div class="footer-brand">' +
              '<img src="' + esc(LOGO ? ROOT + LOGO : LOGO_FALLBACK) + '" alt="">' +
              "<strong>" + esc(COLLEGE.name) + "</strong>" +
            "</div>" +
            "<p>" + esc(COLLEGE.address) + "</p>" +
            "<p>Established " + esc(COLLEGE.established) + " · Affiliated to " + esc(COLLEGE.affiliation) + " · " + esc(COLLEGE.approval) + "</p>" +
            '<div class="socials">' + social + "</div>" +
          "</div>" +
          "<div><h3>Quick Links</h3><ul>" + quick + "</ul></div>" +
          "<div><h3>Courses</h3><ul>" + courseLinks + "</ul></div>" +
          "<div><h3>Contact</h3><ul>" +
            '<li><a href="' + telHref(COLLEGE.phones[0]) + '">' + esc(COLLEGE.phones[0]) + "</a></li>" +
            '<li><a href="' + telHref(COLLEGE.phones[1]) + '">' + esc(COLLEGE.phones[1]) + "</a></li>" +
            '<li><a href="mailto:' + esc(COLLEGE.email) + '">' + esc(COLLEGE.email) + "</a></li>" +
            "<li>Office: 9 AM – 4 PM (Mon–Sat) (EDIT)</li>" +
          "</ul></div>" +
        "</div>" +
        '<p class="footer-legal container">&copy; <span id="year"></span> ' + esc(COLLEGE.name) + ". All rights reserved.</p>" +
        '<div class="footer-bottom container">Panchanan Chauraha, Jalaun Road, Konch, Jalaun (U.P.) 285205 · Made for ' + esc(COLLEGE.name) + "</div>" +
      "</footer>";

    var y = $("#year"); if (y) y.textContent = String(new Date().getFullYear());
    renderFloat();
  }

  function renderFloat() {
    if (!COLLEGE.whatsapp || $(".wa-float")) return;
    var a = document.createElement("a");
    a.className = "wa-float";
    a.href = "https://wa.me/" + COLLEGE.whatsapp;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Chat with the college on WhatsApp");
    a.title = "WhatsApp";
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5s-.5-1.3-.7-1.7-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4 5.3 5.3 0 0 0 2.4.5 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';
    document.body.appendChild(a);
  }

  /* ============================ RENDERERS ============================= */
  function renderHomeCourses() {
    var host = $("#homeCourses");
    if (!host) return;
    host.innerHTML = COURSES.map(function (c) {
      var seat = c.seats ? '<span class="badge">' + c.seats + " seats</span>" : '<span class="badge">Contact office</span>';
      return '<article class="card course-card reveal">' +
        '<span class="icon" aria-hidden="true">' + c.icon + "</span>" +
        '<span class="group">' + esc(c.group) + "</span>" +
        "<h3>" + esc(c.name) + "</h3>" +
        "<p>" + esc(c.blurb) + "</p>" +
        "<div>" + seat + '</div>' +
        '<a class="btn btn-outline btn-sm" href="' + ROOT + 'pages/courses.html#' + c.id + '" style="align-self:flex-start;margin-top:.6rem">View details</a>' +
        "</article>";
    }).join("");
  }

  function renderTicker() {
    var host = $("#tickerTrack");
    if (!host) return;
    var items = NOTICES.map(function (n) { return "<span>" + esc(n.title) + "</span>"; }).join("");
    host.innerHTML = items + items;
  }

  function renderPhotoStrip() {
    var host = $("#stripRow");
    if (!host) return;
    var photos = (window.MEDIA && MEDIA.photos) || [];
    host.innerHTML = photos.map(function (p) {
      return '<a class="strip-item" href="' + ROOT + 'pages/gallery.html">' +
        imgTag(p.src, p.title, 640, 420, p.alt || p.title) +
        "<figcaption>" + esc(p.title) + "</figcaption></a>";
    }).join("");
  }

  function renderTestimonials() {
    var host = $("#tRow");
    if (!host) return;
    host.innerHTML = TESTIMONIALS.map(function (t) {
      return '<article class="card t-card">' +
        '<div class="stars" aria-label="5 out of 5 stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        "<blockquote>" + esc(t.quote) + "</blockquote>" +
        '<div class="who">' + esc(t.who) + '</div><div class="role">' + esc(t.role) + "</div>" +
        "</article>";
    }).join("");
  }

  function renderFaculty() {
    var host = $("#facultyGrid");
    if (!host) return;
    host.innerHTML = FACULTY.map(function (f) {
      return '<article class="card faculty-card reveal">' +
        imgTag(f.photo, f.name, 220, 220, f.name) +
        "<h3>" + esc(f.name) + "</h3>" +
        '<div class="dept">' + esc(f.dept) + "</div>" +
        "</article>";
    }).join("");
  }

  function renderFacilities() {
    var host = $("#facilitiesGrid");
    if (!host) return;
    var imgs = (window.MEDIA && MEDIA.facilities) || {};
    host.innerHTML = FACILITIES.map(function (f) {
      return '<article class="card facility-card reveal" id="' + esc(f.id) + '">' +
        imgTag(imgs[f.id], f.title, 640, 420, f.title + " at Suraj Gyan Mahavidyalaya") +
        '<span class="icon" aria-hidden="true">' + f.icon + "</span>" +
        "<h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></article>";
    }).join("");
  }

  /* ---- Courses page: filters + grid + modal ---- */
  function renderCourseFilters() {
    var host = $("#courseFilters");
    if (!host) return;
    var cats = ["All"].concat(COURSE_GROUPS);
    host.innerHTML = cats.map(function (g, i) {
      return '<button class="chip" type="button" data-gcat="' + esc(g) + '" aria-pressed="' + (i === 0) + '">' + esc(g) + "</button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-gcat]");
      if (!btn) return;
      $$("[data-gcat]", host).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      renderCourseGrid(btn.getAttribute("data-gcat"));
    });
  }

  function renderCourseGrid(cat) {
    var host = $("#courseGrid");
    if (!host) return;
    var list = COURSES.filter(function (c) { return !cat || cat === "All" || c.group === cat; });
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">No courses in this group yet.</div>';
      return;
    }
    host.innerHTML = list.map(function (c) {
      var seat = c.seats ? '<span class="badge">' + c.seats + " seats</span>" : '<span class="badge">Contact office</span>';
      return '<button class="card course-card reveal" type="button" data-course="' + c.id + '" style="text-align:left;cursor:pointer;font:inherit;color:inherit">' +
        '<span class="icon" aria-hidden="true">' + c.icon + "</span>" +
        '<span class="group">' + esc(c.group) + "</span>" +
        "<h3>" + esc(c.name) + "</h3><p>" + esc(c.blurb) + "</p><div>" + seat + "</div>" +
        '<span class="btn btn-blue btn-sm" style="align-self:flex-start;margin-top:.6rem">Details</span>' +
        "</button>";
    }).join("");
    observeReveals();
  }

  function courseDetailHTML(c) {
    var src = document.getElementById("src-" + c.id);
    var body = src ? src.innerHTML :
      "<p>Duration, eligibility and fee: <strong>please contact the college office</strong>.</p>";
    return '<span class="group">' + esc(c.group) + "</span><h3>" + esc(c.name) + "</h3>" +
      "<p>" + esc(c.blurb) + "</p>" + body +
      '<button class="aff-link" type="button" data-aff="' + esc(c.id) + '">View affiliation' +
      ' <span aria-hidden="true">&#8250;</span></button>';
  }

  /* --------- Courses page: affiliation / NCTE proof viewer ---------- */
  function affDialog() {
    var dlg = document.getElementById("affiliationModal");
    if (dlg) return dlg;
    dlg = document.createElement("dialog");
    dlg.id = "affiliationModal";
    dlg.setAttribute("aria-labelledby", "affTitle");
    dlg.innerHTML =
      '<div class="modal-head">' +
        '<h2 id="affTitle">Affiliation</h2>' +
        '<button class="modal-close" type="button" data-close aria-label="Close affiliation">&#10005;</button>' +
      "</div>" +
      '<div class="modal-body" id="affBody"></div>';
    document.body.appendChild(dlg);
    return dlg;
  }

  function openAffiliation(id) {
    var c = courseById[id];
    if (!c) return;
    var dlg = affDialog();
    var titleEl = $("#affTitle", dlg), bodyEl = $("#affBody", dlg);
    if (titleEl) titleEl.textContent = "Affiliation — " + c.name;
    if (bodyEl) {
      /* The eight document slots are defined once in affiliation-docs.js,
         shared with the Affiliation page, so uploading a PDF fills both. */
      bodyEl.innerHTML =
        '<p class="muted" style="margin-top:0">NCTE recognition, university affiliation and approval documents of the college. ' +
        "Click a document to open the PDF in a new tab." + "</p>" +
        '<div class="aff-grid" id="affBodyGrid"></div>';
      if (window.SGM_AFFILIATION) {
        window.SGM_AFFILIATION.mount(document.getElementById("affBodyGrid"));
      } else {
        bodyEl.innerHTML += '<div class="empty-state">Affiliation documents are being updated. ' +
          "Please see the <a href=\"" + ROOT + "pages/affiliation.html\">Affiliation page</a>.</div>";
      }
    }
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
    else dlg.setAttribute("open", "");
  }

  function initCourseModal() {
    var dlg = $("#courseModal");
    var grid = $("#courseGrid");
    if (!dlg || !grid) return;
    var titleEl = $("#modalTitle", dlg), bodyEl = $("#modalBody", dlg);
    bodyEl.addEventListener("click", function (e) {
      var aff = e.target.closest("[data-aff]");
      if (!aff) return;
      openAffiliation(aff.getAttribute("data-aff"));
    });
    grid.addEventListener("click", function (e) {
      var card = e.target.closest("[data-course]");
      if (!card) return;
      var c = courseById[card.getAttribute("data-course")];
      if (!c) return;
      titleEl.textContent = c.name;
      bodyEl.innerHTML = courseDetailHTML(c);
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    });
    var hash = (location.hash || "").replace("#", "");
    if (hash && courseById[hash]) {
      var btn = grid.querySelector('[data-course="' + hash + '"]');
      if (btn) btn.click();
    }
  }

  /* ---- Notices page ---- */
  function noticeCard(n) {
    return '<article class="notice reveal" data-ncat="' + esc(n.cat) + '">' + dateBadge(n.date) +
      "<div><h3>" + esc(n.title) + '</h3> <span class="badge">' + esc(n.cat) + "</span>" +
      "<p>" + esc(n.body) + "</p></div></article>";
  }

  function renderNotices(cat) {
    var host = $("#noticeList");
    if (!host) return;
    var list = NOTICES.filter(function (n) { return !cat || cat === "All" || n.cat === cat; });
    host.innerHTML = list.length ? list.map(noticeCard).join("") :
      '<div class="empty-state">No notices in this category yet. Check back soon.</div>';
    observeReveals();
  }

  function initNoticeFilters() {
    var host = $("#noticeFilters");
    if (!host) return;
    var cats = ["All", "Admissions", "Exams", "Events"];
    host.innerHTML = cats.map(function (g, i) {
      return '<button class="chip" type="button" data-ncat="' + esc(g) + '" aria-pressed="' + (i === 0) + '">' + esc(g) + "</button>";
    }).join("");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ncat]");
      if (!btn) return;
      $$("[data-ncat]", host).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      renderNotices(btn.getAttribute("data-ncat"));
    });
    renderNotices("All");
  }

  function renderEvents() {
    var host = $("#eventList");
    if (!host) return;
    host.innerHTML = EVENTS.map(function (ev) {
      return '<article class="notice reveal">' + dateBadge(ev.date) +
        "<div><h3>" + esc(ev.title) + "</h3><p>" + esc(ev.body) + "</p></div></article>";
    }).join("");
    observeReveals();
  }

  /* ============================ HERO SLIDER =========================== */
  function initHero() {
    var host = $("#heroSlides");
    if (!host) return;
    var slides = (window.MEDIA && MEDIA.hero) || [];
    if (!slides.length) return;
    host.innerHTML = slides.map(function (s, i) {
      var src = s.src || phSrc(s.title || "College Campus", 1600, 900);
      return '<div class="slide' + (i === 0 ? " active" : "") + '" style="background-image:url(&quot;' + esc(src) + '&quot;)" role="img" aria-label="' + esc(s.alt || s.title) + '"></div>';
    }).join("");

    var els = $$(".slide", host);
    var dots = $("#heroDots");
    var idx = 0, timer = null;
    if (dots) {
      dots.innerHTML = slides.map(function (s, i) {
        return '<button type="button" aria-label="Show slide ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>";
      }).join("");
      $$("button", dots).forEach(function (b, i) {
        b.addEventListener("click", function () { go(i); restart(); });
      });
    }
    function go(i) {
      idx = (i + slides.length) % slides.length;
      els.forEach(function (el, j) { el.classList.toggle("active", j === idx); });
      if (dots) $$("button", dots).forEach(function (b, j) {
        if (j === idx) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      });
    }
    function restart() {
      if (REDUCE) return;
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 6000);
    }
    restart();
  }

  /* ===================== SCROLL ROWS (photo strip / quotes) ========== */
  function initScrollers() {
    $$("[data-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var row = document.getElementById(btn.getAttribute("data-scroll"));
        if (!row) return;
        var card = row.firstElementChild;
        var step = card ? card.getBoundingClientRect().width + 16 : 320;
        row.scrollBy({ left: btn.getAttribute("data-dir") === "prev" ? -step : step, behavior: REDUCE ? "auto" : "smooth" });
      });
    });
  }

  /* ===================== COUNTERS / REVEAL / IMAGES =================== */
  function runCounter(node) {
    var target = parseFloat(node.getAttribute("data-count")) || 0;
    var suffix = node.getAttribute("data-suffix") || "";
    if (node.hasAttribute("data-plain") || REDUCE) { node.textContent = target + suffix; return; }
    var t0 = null, dur = 1400;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var nums = $$(".stat-num[data-count]");
    if (!nums.length) return;
    if (!("IntersectionObserver" in window)) { nums.forEach(runCounter); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function observeReveals() {
    var items = $$(".reveal:not(.in)");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || REDUCE) { items.forEach(function (n) { n.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (n) { io.observe(n); });
  }

  function initPhImages() {
    $$("img[data-ph]").forEach(function (im) {
      if (im.getAttribute("src")) return;
      im.src = phSrc(im.getAttribute("data-ph"), +(im.getAttribute("data-w") || 800), +(im.getAttribute("data-h") || 600));
    });
  }

  /* ============================== FORMS =============================== */
  function initForms() {
    $$(".js-form").forEach(function (form) {
      var note = $(".form-note", form);
      form.setAttribute("novalidate", "");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true, firstBad = null;
        $$(".field", form).forEach(function (f) {
          var input = $("input, select, textarea", f);
          if (!input) return;
          var errEl = $(".field-error", f);
          var val = (input.value || "").trim();
          var msg = "";
          if (input.hasAttribute("required") && !val) msg = "This field is required.";
          else if (val && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) msg = "Please enter a valid email address.";
          else if (val && input.type === "tel" && !/^[+\d][\d\s-]{8,15}$/.test(val)) msg = "Enter a valid phone number (min 9 digits).";
          if (errEl) errEl.textContent = msg;
          input.setAttribute("aria-invalid", msg ? "true" : "false");
          if (msg) { ok = false; if (!firstBad) firstBad = input; }
        });
        if (!ok) {
          if (note) { note.hidden = false; note.className = "form-note error"; note.textContent = "Please fix the highlighted fields and try again."; }
          if (firstBad) firstBad.focus();
          return;
        }
        if (note) {
          note.hidden = false;
          note.className = "form-note";
          note.textContent = "Thank you! Your enquiry has been recorded (demo form). Connect a form service or the college email address to receive real submissions.";
        }
        form.reset();
      });
    });
  }

  /* =============================== INIT =============================== */
  function initLogoFallback() {
    if (!LOGO) return;
    document.addEventListener("error", function (e) {
      var t = e.target;
      if (!t || t.tagName !== "IMG") return;
      var src = t.getAttribute("src") || "";
      if (src === ROOT + LOGO) t.src = ROOT + LOGO_ALT;
      else if (src === ROOT + LOGO_ALT) t.src = LOGO_FALLBACK;
    }, true);
  }

  function init() {
    initLogoFallback();
    renderHeader();
    renderFooter();
    initPhImages();
    initHero();
    renderHomeCourses();
    renderTicker();
    renderPhotoStrip();
    renderTestimonials();
    renderFaculty();
    renderFacilities();
    renderCourseFilters();
    renderCourseGrid("All");
    initCourseModal();
    initNoticeFilters();
    renderEvents();
    initScrollers();
    initCounters();
    initForms();
    observeReveals();

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-close]");
      if (!btn) return;
      var dlg = btn.closest("dialog");
      if (dlg) dlg.close();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.SGM = { COLLEGE: COLLEGE, COURSES: COURSES, ROOT: ROOT };
})();
