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

  // QA-026: uma única rotina de limpeza, ligada ao evento "close" do <dialog>.
  // Escape, botão fechar, clique no scrim, clique em link e resize para desktop
  // terminam todos em dialog.close(), então nenhum caminho deixa o body preso
  // em overflow:hidden. Só o retorno de foco muda: em navegação por link o foco
  // segue o destino da âncora, não volta ao botão.
  let returnFocus = true;

  function cleanup() {
    document.body.classList.remove("no-scroll");
    openBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) openBtn.focus({ preventScroll: true });
    returnFocus = true;
  }

  function open() {
    dialog.showModal();
    document.body.classList.add("no-scroll");
    openBtn.setAttribute("aria-expanded", "true");
  }

  function close({ restoreFocus = true } = {}) {
    returnFocus = restoreFocus;
    if (dialog.open) dialog.close();
    else cleanup();
  }

  openBtn.addEventListener("click", open);
  dialog.addEventListener("close", cleanup); // Escape (cancel → close) e todas as demais saídas
  closeBtn?.addEventListener("click", () => close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close(); // clique no scrim
  });
  dialog.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => close({ restoreFocus: false }));
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches && dialog.open) close({ restoreFocus: false });
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

  // QA-027: aria-current acompanha as seções visíveis e é limpo quando nenhuma
  // das seções do menu está na faixa de leitura (ex.: voltar ao topo/hero).
  const visible = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!map.has(entry.target)) return;
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      links.forEach((l) => l.removeAttribute("aria-current"));
      const last = [...visible].pop();
      if (last) map.get(last).setAttribute("aria-current", "true");
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  map.forEach((_, section) => io.observe(section));
}
