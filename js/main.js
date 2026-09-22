import { initMotion, initGrifo, initNavbarScroll, initStatCounters } from "./motion.js";
import { initMobileMenu, initScrollSpy } from "./nav.js";
import { initCTAs } from "./cta.js";
import { initCaterhamCounters, initCaterhamVideo } from "./caterham.js";
import { initScrollSequences } from "./scrollseq.js?v=roleta1";
import { initPalestras } from "./palestras.js?v=palco1";

// Largura da barra de rolagem em --sbw: 100vw a inclui, o .container não —
// sem isso o --content-inset (tokens.css) fica meia barra à direita do eixo.
const syncScrollbar = () => document.documentElement.style.setProperty(
  "--sbw", `${window.innerWidth - document.documentElement.clientWidth}px`);
syncScrollbar();
window.addEventListener("resize", syncScrollbar);

initMotion();
initGrifo();
initStatCounters();
initNavbarScroll();
initMobileMenu();
initScrollSpy();
initCTAs();
initCaterhamCounters();
initCaterhamVideo();
initScrollSequences();
initPalestras();
