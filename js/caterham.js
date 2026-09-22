/*
  Dobra 05 — Caterham (layout tipográfico da home + identidade da marca)
  Fonte: doc/VISUAL-DIRECTION.md §15.05

  O layout (ficha de números + fecho) continua o mesmo fallback tipográfico
  documentado no VISUAL-DIRECTION — não é o runway sticky com POV real de
  passageiro por modelo, que segue fora de escopo. A pele (cor e tipografia)
  vem de `Projeto-caterham\Caterham - V3`, o site aprovado em produção da
  parceria — distinto do material "Festival - Interlagos" que segue pendente
  de aprovação de direitos (§16 item 6). Os vídeos por modelo (ficha) e a
  foto do fecho são material do cliente, em Imagens/caterham/. Ver o escopo
  `.caterham` em css/components.css.

  Contador: nos 4 números de engenharia (84/490, 210/535). O núcleo
  (animateCount) vive em motion.js e é compartilhado com o trio de números
  do Bandeiras Empresarial. O valor final está sempre presente no HTML;
  reduced-motion e falha de JS deixam o número final estático, nunca vazio.
*/

import { animateCount } from "./motion.js";

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
          if (Number.isFinite(target)) animateCount(el, target, { duration: 1100, ease: (p) => 1 - Math.pow(1 - p, 3) });
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
}

/*
  Vídeos de detalhe dos modelos (ficha SS600 / 420R) — walkaround de cada
  carro, material do cliente. Autoplay/loop/mute já garantem que funcionam
  sem JS (poster = primeiro frame, sempre visível); este init só evita
  gastar ciclo de vídeo fora de tela e respeita prefers-reduced-motion (quem
  prefere fica só com o poster — mesma regra de "CSS/HTML entrega o estado
  final primeiro" usada no restante do site).
*/
export function initCaterhamVideo() {
  const videos = document.querySelectorAll(".caterham__num-media");
  if (!videos.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    videos.forEach((v) => {
      v.pause();
      v.removeAttribute("autoplay");
    });
    return;
  }

  if (!("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    },
    { threshold: 0.2 }
  );
  videos.forEach((v) => io.observe(v));
}
