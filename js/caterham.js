/*
  Dobra 05 — Caterham (versão tipográfica / fallback)
  Fonte: doc/VISUAL-DIRECTION.md §15.05

  O redesenho completo (runway sticky com POV real de passageiro, vídeo
  1080p e 4K por modelo) depende do material da pasta externa
  `Projeto-caterham\Caterham - Festival - Interlagos\`, cujo uso está
  condicionado a aprovação de direitos de imagem — pendência §16 item 6,
  ainda não respondida. Esta versão usa o tratamento tipográfico (ficha de
  números + fecho vermelho) que já funciona sozinho, com menos impacto,
  documentado como fallback pelo próprio VISUAL-DIRECTION.

  Contador: permitido SOMENTE aqui, nos 4 números de engenharia (84/490,
  210/535) — nunca em credenciais/métricas do complexo (§12.4). O valor
  final está sempre presente no HTML (data-target); reduced-motion e
  falha de JS deixam o número final estático, nunca vazio.
*/

function animateCount(el, target, duration = 1100) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cúbico
    el.textContent = Math.round(target * eased).toString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toString(); // garante o valor exato ao final
  }
  requestAnimationFrame(tick);
}

/*
  Marcação esperada: <span data-count-target="84">84</span>
  O texto "84" já é o valor final visível sem JS/reduced-motion; o atributo
  é só o que a animação lê para saber até onde contar.
*/
export function initCaterhamCounters() {
  const nums = document.querySelectorAll("[data-count-target]");
  if (!nums.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    return; // estado final já está no HTML como texto
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.dataset.countTarget);
          if (Number.isFinite(target)) animateCount(el, target);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
}
