// Анимации появления блоков, меню на телефоне и копирование телефона. Без скрипта весь текст виден.
(function () {
  var d = document;
  d.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    d.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("rv"); io.observe(el); });
  }

  var menu = d.getElementById("menu"), openBtn = d.getElementById("menuOpen");
  function setMenu(on) {
    menu.classList.toggle("open", on);
    openBtn.setAttribute("aria-expanded", String(on));
    d.body.classList.toggle("lock", on);
    (on ? d.getElementById("menuClose") : openBtn).focus();
  }
  openBtn.addEventListener("click", function () { setMenu(true); });
  d.getElementById("menuClose").addEventListener("click", function () { setMenu(false); });
  menu.addEventListener("click", function (e) { if (e.target === menu || e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false); });

  d.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy"), note = btn.nextElementSibling;
      function done(msg) { note.textContent = msg; }
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { done("Скопировано"); }, function () { done(text); });
      else done(text);
    });
  });
})();
