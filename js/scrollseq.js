/*
  Numerais de fundo em "roleta" (rolos de caça-níquel / odômetro) nos 5
  quadros do Team Building. Os quadros, bordas e títulos nunca se movem —
  só os dígitos giram DENTRO do próprio numeral.

  Estrutura (montada aqui; sem JS o <span> continua com o texto "01"):
    .scrollseq__num            posição/tamanho/opacidade originais (CSS)
      .scrollseq__reel         janela de 1 dígito (overflow: clip)
        .scrollseq__strip      0 1 2 3 4 5 6 7 8 9 0 (o 0 final fecha o ciclo)

  Posição de cada rolo (em "dígitos", float):
      pos = alvo + direção × (giroScroll + giroHover)
  e o strip recebe translate3d(0, -(pos mod 10)em, 0). Como giroScroll e
  giroHover terminam sempre em 0 (ou múltiplo de 10), o rolo PARA
  exatamente no número certo.

  - Scroll (scrub, reversível): progresso real da seção desde que o topo
    entra pela base da tela até o centro da seção chegar ao centro da tela.
    giroScroll = (1 - easeOut(progresso)) × voltas × 10. Descendo, os rolos
    desaceleram até o número; subindo, giram de volta. Cada quadro assenta
    um pouco depois do anterior (efeito de sequência).
  - Hover (pointerenter no quadro): uma "tirada" de roleta — 2–3 voltas com
    desaceleração ease-out (sem bounce/overshoot), dígito das unidades
    parando depois do das dezenas.
  - Direção alterna por quadro (01 desce, 02 sobe, 03 desce…).

  Fallback: prefers-reduced-motion ou sem IntersectionObserver → nada é
  montado; o numeral fica estático exatamente como no layout aprovado.
*/

const TURNS_SCROLL = [1, 2];          // voltas no scroll: [dezena, unidade]
const TURNS_HOVER = [2, 3];           // voltas no hover
const HOVER_MS = [1100, 1500];        // duração do hover por dígito
const SETTLE_BASE = 0.78;             // fração do progresso em que o 1º quadro assenta
const SETTLE_STEP = 0.055;            // atraso de assentamento por quadro

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const mod10 = (v) => ((v % 10) + 10) % 10;

function buildReels(num) {
  const text = num.textContent.trim();
  num.textContent = "";
  return [...text].map((ch) => {
    const reel = document.createElement("span");
    reel.className = "scrollseq__reel";
    const strip = document.createElement("span");
    strip.className = "scrollseq__strip";
    for (let d = 0; d <= 10; d++) {
      const cell = document.createElement("span");
      cell.textContent = String(d % 10);
      strip.appendChild(cell);
    }
    reel.appendChild(strip);
    num.appendChild(reel);
    return { strip, target: Number(ch), last: null };
  });
}

function setupSequence(section) {
  const frames = [...section.querySelectorAll(".scrollseq__frame")];
  const cards = frames
    .map((frame, i) => {
      const num = frame.querySelector(".scrollseq__num");
      if (!num || !/^\d+$/.test(num.textContent.trim())) return null;
      return {
        frame,
        dir: i % 2 === 0 ? 1 : -1,
        settle: Math.min(1, SETTLE_BASE + i * SETTLE_STEP),
        reels: buildReels(num),
        hoverStart: null,
      };
    })
    .filter(Boolean);
  if (!cards.length) return;
  section.classList.add("is-reels");

  let scrollP = 1;       // progresso bruto da seção (0..1, 1 = assentado)
  let rafId = null;
  let listening = false;

  function readScroll() {
    const vh = window.innerHeight;
    const rect = section.getBoundingClientRect();
    const span = vh * 0.5 + rect.height * 0.5; // entrada → centro alinhado
    scrollP = span > 0 ? clamp01((vh - rect.top) / span) : 1;
  }

  function render(now) {
    rafId = null;
    let animating = false;
    cards.forEach((card) => {
      const p = easeOutCubic(clamp01(scrollP / card.settle));
      let hoverT = null;
      if (card.hoverStart !== null) {
        hoverT = now - card.hoverStart;
        if (hoverT >= HOVER_MS[HOVER_MS.length - 1]) card.hoverStart = null;
        else animating = true;
      }
      card.reels.forEach((reel, d) => {
        const k = Math.min(d, TURNS_SCROLL.length - 1);
        const scrollSpin = (1 - p) * TURNS_SCROLL[k] * 10;
        let hoverSpin = 0;
        if (hoverT !== null) {
          const t = clamp01(hoverT / HOVER_MS[k]);
          hoverSpin = (1 - easeOutExpo(t)) * TURNS_HOVER[k] * 10;
        }
        const pos = mod10(reel.target + card.dir * (scrollSpin + hoverSpin));
        const val = Math.round(pos * 1000) / 1000;
        if (val !== reel.last) {
          reel.last = val;
          reel.strip.style.transform = `translate3d(0, ${-val}em, 0)`;
        }
      });
    });
    if (animating) request();
  }

  function request() {
    if (rafId === null) rafId = window.requestAnimationFrame(render);
  }

  function onScroll() {
    readScroll();
    request();
  }

  cards.forEach((card) => {
    card.frame.addEventListener("pointerenter", () => {
      if (card.hoverStart !== null) return; // deixa a tirada atual terminar
      card.hoverStart = performance.now();
      request();
    });
  });

  // Só escuta scroll/resize com a seção perto da viewport.
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !listening) {
        listening = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();
      } else if (!entry.isIntersecting && listening) {
        listening = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        onScroll();
      }
    },
    { rootMargin: "25% 0px 25% 0px" }
  );
  io.observe(section);
  onScroll();
}

export function initScrollSequences() {
  const sequences = document.querySelectorAll("[data-scrollseq]");
  if (!sequences.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) return;

  sequences.forEach(setupSequence);
}
