document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const forms = document.querySelectorAll("form[data-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const data = new FormData(form);
      const subject = data.get("subject") || "New message from outfwd.com";

      const lines = [];
      for (const [key, value] of data.entries()) {
        if (key === "subject" || !value) continue;
        lines.push(`${key}: ${value}`);
      }

      const mailto = `mailto:outforward@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

      if (status) {
        status.textContent = "Opening your email app to send this to us…";
        status.classList.add("show");
      }

      window.location.href = mailto;
    });
  });
});
