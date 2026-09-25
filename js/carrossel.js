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
  document.querySelectorAll("[data-carrossel]").forEach((root) => {
    const track = root.querySelector("[data-carrossel-track]");
    if (!track) return;
    const items = [...track.children];
    if (!items.length) return;

    const prevBtn = root.querySelector("[data-carrossel-prev]");
    const nextBtn = root.querySelector("[data-carrossel-next]");
    const dotsRoot = root.parentElement?.querySelector("[data-carrossel-dots]");
    const dots = dotsRoot ? [...dotsRoot.querySelectorAll("[data-carrossel-dot]")] : [];

    let active = 0;

    function setActive(index) {
      active = index;
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    }

    function goTo(index) {
      const wrapped = ((index % items.length) + items.length) % items.length;
      items[wrapped].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
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
        raf = requestAnimationFrame(() => setActive(closestIndex()));
      },
      { passive: true }
    );

    setActive(0);
  });
}
