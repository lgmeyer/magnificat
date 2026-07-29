const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuButton && menu) {
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  };

  menuButton.addEventListener("click", () => {
    const willOpen = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  reveals.forEach((element) => {
    const isInitiallyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.96;

    if (isInitiallyVisible) {
      element.classList.add("is-visible");
    } else {
      observer.observe(element);
    }
  });
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    const list = item.closest(".faq-list");
    list.querySelectorAll("details[open]").forEach((openItem) => {
      if (openItem !== item) openItem.removeAttribute("open");
    });
  });
});
