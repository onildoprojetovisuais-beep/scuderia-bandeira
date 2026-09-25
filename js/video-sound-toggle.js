/*
  Vídeo institucional (05 · BANDEIRAS EMPRESARIAL) e vídeo do Ingo (LEGADO,
  logo após 03 · PILOTOS & TIME) — pedido do usuário: já rodar sozinho na
  tela, sem precisar dar play. Nenhum navegador libera autoplay com áudio,
  então o <video> entra mudo/loop e este módulo cuida de duas coisas:
  play/pause por IntersectionObserver (mesmo padrão de js/caterham.js — não
  gasta ciclo de vídeo fora de tela, respeita prefers-reduced-motion) e o
  botão de som sobreposto, pro visitante ativar a narração quando quiser.
*/
export function initVideoSoundToggle() {
  const frames = document.querySelectorAll(".bandeiras__video-frame, .legado__frame");
  if (!frames.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  frames.forEach((frame) => {
    const video = frame.querySelector("video");
    const toggle = frame.querySelector(".video-sound-toggle");
    if (!video) return;

    if (toggle) {
      toggle.addEventListener("click", () => {
        video.muted = !video.muted;
        toggle.setAttribute("aria-pressed", String(!video.muted));
        toggle.setAttribute("aria-label", video.muted ? "Ativar som do vídeo" : "Silenciar vídeo");
        if (!video.muted) video.play().catch(() => {});
      });
    }

    if (prefersReduced) {
      video.pause();
      video.removeAttribute("autoplay");
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
      { threshold: 0.4 }
    );
    io.observe(video);
  });
}
