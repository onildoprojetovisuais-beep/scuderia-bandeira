/*
  Navbar — menu mobile (<dialog>) + scroll-spy
  Fonte: doc/VISUAL-DIRECTION.md §13.1, §15 (Navbar)
*/

export function initMobileMenu() {
  const openBtn = document.querySelector("[data-menu-open]");
  const dialog = document.querySelector("[data-menu-dialog]");
  const closeBtn = document.querySelector("[data-menu-close]");
  if (!openBtn || !dialog) return;

  if (typeof dialog.showModal !== "function") {
    // Sem suporte a <dialog> nativo: o menu vira uma navegação comum,
    // sempre visível no fluxo (nenhum conteúdo fica inacessível).
    dialog.removeAttribute("data-menu-dialog");
    return;
  }

  openBtn.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("no-scroll");
  });

  function close() {
    dialog.close();
    document.body.classList.remove("no-scroll");
    openBtn.focus();
  }

  closeBtn?.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close(); // clique no scrim
  });
  dialog.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

export function initScrollSpy() {
  const links = document.querySelectorAll("[data-nav-link]");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    const section = id && document.getElementById(id);
    if (section) map.set(section, link);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  map.forEach((_, section) => io.observe(section));
}
