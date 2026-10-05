/*
  Carrossel genérico com affordance explícita: setas prev/next + contador em
  bolinha (data-carrossel / data-carrossel-track / data-carrossel-prev/next /
  data-carrossel-dot). O scroll-snap do CSS resolve o gesto (arrastar/rolar);
  este módulo só sincroniza setas e bolinhas com a posição real do scroll —
  a bolinha ativa é o item cuja borda esquerda está mais perto da borda
  esquerda do track (o "item líder" visível), não um contador de páginas.
  Infinito nas setas (2026-09-26): next no último item volta pro primeiro,
  prev no primeiro vai pro último — goTo() dá a volta (wrap), nunca trava.
*/
export function initCarrossel() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-carrossel]").forEach((root) => {
    const track = root.querySelector("[data-carrossel-track]");
    if (!track) return;
    const items = [...track.children];
    if (!items.length) return;

    const prevBtn = root.querySelector("[data-carrossel-prev]");
    const nextBtn = root.querySelector("[data-carrossel-next]");
    const dotsRoot = root.parentElement?.querySelector("[data-carrossel-dots]");
    const dots = dotsRoot ? [...dotsRoot.querySelectorAll("[data-carrossel-dot]")] : [];

    const status = dotsRoot?.parentElement?.querySelector("[data-carrossel-status]");

    let active = 0;
    // QA-029: no desktop o track trava antes dos últimos itens (scrollWidth −
    // clientWidth < posição deles), então o scroll nunca "chega" neles. O clique
    // fixa o índice escolhido (lock) até o scroll assentar; ao fim do track o
    // item ativo é o último.
    let lock = null;
    let lockTimer = null;
    const atEnd = () => track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;

    function setActive(index) {
      active = index;
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false"); // QA-007
      });
    }

    function goTo(index) {
      const wrapped = ((index % items.length) + items.length) % items.length;
      setActive(wrapped);
      lock = wrapped;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => (lock = null), 900);
      // anúncio só para ação por botão (nunca no swipe/scroll) — sem ruído
      if (status) {
        const title = items[wrapped].querySelector("h3")?.textContent?.trim();
        status.textContent = `Espaço ${wrapped + 1} de ${items.length}${title ? `: ${title}` : ""}`;
      }
      items[wrapped].scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", inline: "start", block: "nearest" });
    }

    function closestIndex() {
      const trackLeft = track.getBoundingClientRect().left;
      let closest = 0;
      let closestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - trackLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    prevBtn?.addEventListener("click", () => goTo(active - 1));
    nextBtn?.addEventListener("click", () => goTo(active + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

    let raf = null;
    track.addEventListener(
      "scroll",
      () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (lock !== null) return;
          setActive(atEnd() ? items.length - 1 : closestIndex());
        });
      },
      { passive: true }
    );

    setActive(0);
  });
}
