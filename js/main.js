(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  var clock = document.querySelector("#clock");
  var year = document.querySelector("#year");
  var form = document.querySelector("#note");

  if (year) year.textContent = String(new Date().getFullYear());

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  function tick() {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date());
  }

  tick();
  window.setInterval(tick, 30000);

  var intent = new URLSearchParams(window.location.search).get("intent");
  var intentField = document.querySelector("#intent");
  if (intent && intentField) {
    Array.prototype.forEach.call(intentField.options, function (option) {
      if (option.value === intent) intentField.value = intent;
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var organization = String(data.get("organization") || "").trim();
      var need = String(data.get("intent") || "").trim();
      var message = String(data.get("message") || "").trim();
      var subject = "Project note from " + name;
      var body = [
        "Name: " + name,
        "Email: " + email,
        organization ? "Organization: " + organization : "",
        "Need: " + need,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      var status = document.querySelector("#form-status");
      if (status) {
        status.textContent =
          "Your email app should open with the note. If it does not, write to oceantaylor503@gmail.com.";
      }

      window.location.href =
        "mailto:oceantaylor503@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
