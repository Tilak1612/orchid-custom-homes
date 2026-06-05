/* ============================================================
   ORCHID CUSTOM HOMES LTD — shared behavior
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  var root = document.documentElement;
  var saved = localStorage.getItem("orchid-theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("orchid-theme", next);
    });
  }

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var menu = document.getElementById("mobile-menu");
  var openBtn = document.getElementById("menu-open");
  var closeBtn = document.getElementById("menu-close");
  if (menu && openBtn) {
    var openMenu = function () { menu.classList.add("open"); document.body.style.overflow = "hidden"; };
    var closeMenu = function () { menu.classList.remove("open"); document.body.style.overflow = ""; };
    openBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------- Scroll reveal ---------- */
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (e) { e.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
    // Fire any hero reveals immediately (above the fold)
    document.querySelectorAll(".hero .reveal, .page-hero .reveal").forEach(function (e) { e.classList.add("in"); });
  }

  /* ---------- Gallery filters (gallery page) ---------- */
  var filters = document.querySelectorAll(".gal-filter");
  if (filters.length) {
    var items = document.querySelectorAll(".gal-grid .gal-item");
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-cat") === cat;
          it.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---------- Contact / quote form (demo handler) ---------- */
  var forms = document.querySelectorAll("form[data-orchid-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector(".form-success");
      if (success) {
        form.style.display = "none";
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  /* ---------- Footer year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    // static build date – avoids relying on client clock for content
    yearEls.forEach(function (el) { el.textContent = "2026"; });
  }
})();
