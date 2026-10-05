/*
  Cards de 03 · Pilotos & Time: por padrão só mostram cargo + nome sobre a
  foto; hover/foco (CSS puro) revelam as credenciais em telas com mouse.
  Em touch não existe :hover confiável, então o toque alterna uma classe
  (.is-active) que dispara o mesmo estado visual. Um toque fora fecha o
  card aberto; abrir outro fecha o anterior (só um por vez).
*/
export function initPilotoCards() {
  const cards = document.querySelectorAll(".piloto-card");
  if (!cards.length) return;

  // QA-027: na faixa horizontal (<1024) o foco por teclado precisa trazer o card
  // para a área visível — o navegador não rola quando ele está parcialmente visível.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  cards.forEach((card) => {
    card.addEventListener("focus", () => {
      const strip = card.parentElement;
      if (strip && strip.scrollWidth > strip.clientWidth + 1) {
        card.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced.matches ? "auto" : "smooth" });
      }
    });
  });

  const hasFineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (hasFineHover) return; // mouse já resolve via :hover/:focus-visible no CSS

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-active");
      cards.forEach((c) => c.classList.remove("is-active"));
      if (!isOpen) card.classList.add("is-active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".piloto-card")) {
      cards.forEach((c) => c.classList.remove("is-active"));
    }
  });
}
