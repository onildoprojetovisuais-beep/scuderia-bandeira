/*
  Sistema de motion — reveal por IntersectionObserver
  Fonte: doc/VISUAL-DIRECTION.md §12

  Regra central: o CSS já renderiza tudo visível (css/base.css @layer motion-base).
  Esta camada SÓ adiciona a classe .js-motion ao <html> quando JS roda, IO existe
  e o usuário não pediu reduced-motion — e só então o CSS de reveal (opacity:0 -
  translateY) passa a valer. Falha de qualquer uma dessas condições = página
  100% visível sem motion, sem esperar nada.

  Failsafe (§12.5): se por qualquer razão um elemento nunca receber .is-in
  (ex.: erro de JS no meio da execução), um temporizador de 4s força todos os
  [data-reveal] a aparecer. Nenhum conteúdo fica invisível para sempre.
*/

export function initMotion() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  if (prefersReduced || !hasIO) {
    // Estado final já é o visível (definido em base.css) — nada a fazer.
    return;
  }

  document.documentElement.classList.add("js-motion");

  const targets = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  // Failsafe: nada fica invisível para sempre.
  window.setTimeout(() => {
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
      el.classList.add("is-in");
    });
  }, 4000);

  // Stagger controlado por CSS var, setado via atributo data-stagger-index
  document.querySelectorAll("[data-stagger] > *").forEach((child, i) => {
    child.style.setProperty("--stagger-delay", `${Math.min(i, 4) * 60}ms`);
  });
}

/*
  Navbar: fundo sólido após rolar, header some ao rolar para baixo (volta ao
  rolar para cima), tudo por sentinela IO — nunca scroll listener contínuo.
*/
export function initNavbarScroll() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;

  const sentinel = document.querySelector("[data-nav-sentinel]");
  if (sentinel && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle("is-solid", !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
  }

  let lastY = window.scrollY;
  let ticking = false;
  const hideThreshold = 80;

  function onScroll() {
    const y = window.scrollY;
    if (!nav.matches(":focus-within")) {
      if (y > lastY && y > hideThreshold) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
}
