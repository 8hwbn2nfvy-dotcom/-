// Меню на телефоне, появление блоков и проверка формы. Без скрипта весь текст виден, форма проверяется браузером.
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

  var form = d.getElementById("zapis-form");
  if (form) {
    var date = d.getElementById("f-date"), tel = d.getElementById("f-tel");
    var t = new Date(), pad = function (n) { return (n < 10 ? "0" : "") + n; };
    date.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
    tel.addEventListener("input", function () {
      var digits = tel.value.replace(/\D/g, "").length;
      tel.setCustomValidity(tel.value && digits < 10 ? "Нужно не меньше 10 цифр" : "");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      window.location.href = "prinyato.html";
    });
  }
})();
