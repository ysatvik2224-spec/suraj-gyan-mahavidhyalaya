/* =====================================================================
   AFFILIATION DOCUMENTS — THE ONLY FILE YOU EDIT TO PUBLISH A PDF
   ---------------------------------------------------------------------
   HOW TO UPLOAD / REPLACE A DOCUMENT
     1. Save your PDF inside the folder:  assets/docs/affiliation/
     2. Check that the file name matches the "file" path below exactly
        (all lower-case, hyphens, .pdf extension).
     3. Upload / replace the file on the server.
        The card on pages/affiliation.html then shows "View PDF" and
        "Download" automatically — no code change needed.

   Until the PDF exists at that path, the card shows
   "Document Coming Soon" and has no link (so there is never a 404).

   Rules
     • Keep "id" values exactly as they are (they are used by the page).
     • Do not point two documents at the same file.
     • Paths are relative to the website root.
===================================================================== */
window.AFFILIATION_DOCS = [
  {
    id: "bed-ncte",
    title: "B.Ed. NCTE Affiliation",
    note: "NCTE recognition / affiliation for the B.Ed. programme.",
    file: "assets/docs/affiliation/bed-ncte.pdf"
  },
  {
    id: "bed-bu-permanent",
    title: "B.Ed. Bundelkhand University Permanent Affiliation",
    note: "Permanent affiliation of the B.Ed. programme by Bundelkhand University, Jhansi.",
    file: "assets/docs/affiliation/bed-bundelkhand-university-permanent-affiliation.pdf"
  },
  {
    id: "land-document",
    title: "Land Document",
    note: "Land ownership document for the college campus.",
    file: "assets/docs/affiliation/land-document.pdf"
  },
  {
    id: "fire-noc",
    title: "Fire NOC",
    note: "Fire safety No Objection Certificate for the campus.",
    file: "assets/docs/affiliation/fire-noc.pdf"
  },
  {
    id: "bled-ncte",
    title: "B.El.Ed. NCTE Affiliation",
    note: "NCTE recognition / affiliation for the B.El.Ed. programme.",
    file: "assets/docs/affiliation/bled-ncte.pdf"
  },
  {
    id: "bled-bu",
    title: "B.El.Ed. Bundelkhand University Affiliation",
    note: "Affiliation of the B.El.Ed. programme by Bundelkhand University, Jhansi.",
    file: "assets/docs/affiliation/bled-bundelkhand-university-affiliation.pdf"
  },
  {
    id: "bed-teacher-list",
    title: "B.Ed. Teacher Approval List",
    note: "Approved teaching staff list for the B.Ed. programme.",
    file: "assets/docs/affiliation/bed-teacher-approval-list.pdf"
  },
  {
    id: "bled-teacher-list",
    title: "B.El.Ed. Teacher Approval List",
    note: "Approved teaching staff list for the B.El.Ed. programme.",
    file: "assets/docs/affiliation/bled-teacher-approval-list.pdf"
  },
  {
    id: "society-bye-laws",
    title: "Society Bye-laws",
    note: "Registered bye-laws / rules (नियमावली) of the parent society.",
    file: "assets/docs/affiliation/society-bye-laws.pdf"
  },
  {
    id: "society-affiliation",
    title: "Society Affiliation",
    note: "Society registration / affiliation documents of the parent society.",
    file: "assets/docs/affiliation/society-affiliation.pdf"
  }
];
