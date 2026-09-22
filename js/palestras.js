/*
  09 · Palestras — palco dinâmico + carrossel mobile

  Desktop (≥1024px): hover (mouse), foco (teclado) ou toque (tablet) numa
  linha da lista coloca o retrato daquele piloto no palco à esquerda. A
  seleção fica "travada" no último piloto enquanto a seção está em tela —
  sem piscar de volta para o auditório ao mover o mouse até o CTA — e volta
  ao auditório quando a seção sai da viewport, para a próxima visita começar
  pelo palco vazio.

  Mobile: a lista é um carrossel scroll-snap; aqui só atualizamos o contador
  "01 — 04" e a barra de progresso.

  Sem JS: o palco mostra o auditório e a lista é legível — nada depende disto.
*/

const AUDITORIO = "auditorio";

export function initPalestras() {
  const section = document.getElementById("palestras");
  if (!section) return;

  const palco = section.querySelector("[data-palco]");
  const lista = section.querySelector("[data-palestras-lista]");
  if (!palco || !lista) return;

  const camadas = [...palco.querySelectorAll("[data-palco-camada]")];
  const itens = [...lista.querySelectorAll("[data-piloto]")];
  const legenda = palco.querySelector(".palestras__palco-legenda");
  const legendaNum = palco.querySelector("[data-palco-num]");
  const legendaNome = palco.querySelector("[data-palco-nome]");
  const desktop = window.matchMedia("(min-width: 1024px)");

  let atual = AUDITORIO;

  function selecionar(id) {
    if (id === atual) return;
    atual = id;

    camadas.forEach((el) => el.classList.toggle("is-active", el.dataset.palcoCamada === id));
    itens.forEach((li) => li.classList.toggle("is-active", li.dataset.piloto === id));
    lista.classList.toggle("has-active", id !== AUDITORIO);
    palco.classList.toggle("is-piloto", id !== AUDITORIO);

    const li = itens.find((el) => el.dataset.piloto === id);
    if (li) {
      legendaNum.textContent = li.querySelector(".palestras__piloto-num").textContent;
      legendaNome.textContent = li.querySelector(".palestras__piloto-nome").textContent;
      // Reinicia a entrada da legenda a cada troca de piloto.
      legenda.style.animation = "none";
      void legenda.offsetWidth;
      legenda.style.animation = "";
    }
  }

  itens.forEach((li) => {
    li.addEventListener("pointerenter", (e) => {
      if (desktop.matches && e.pointerType === "mouse") selecionar(li.dataset.piloto);
    });
    li.addEventListener("focus", () => {
      if (desktop.matches) selecionar(li.dataset.piloto);
    });
    li.addEventListener("click", () => {
      if (desktop.matches) selecionar(li.dataset.piloto);
    });
  });

  desktop.addEventListener("change", () => selecionar(AUDITORIO));

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) selecionar(AUDITORIO);
    }).observe(section);
  }

  // ---- Carrossel mobile: contador + barra
  const progressoNum = section.querySelector("[data-progresso-num]");
  const progressoBarra = section.querySelector("[data-progresso-barra]");
  if (!progressoNum || !progressoBarra) return;

  const total = itens.length;
  let raf = 0;
  const atualizar = () => {
    raf = 0;
    const max = lista.scrollWidth - lista.clientWidth;
    const t = max > 0 ? lista.scrollLeft / max : 0;
    const indice = Math.round(t * (total - 1));
    progressoNum.textContent = String(indice + 1).padStart(2, "0");
    progressoBarra.style.setProperty("--progresso", (1 + t * (total - 1)) / total);
  };
  lista.addEventListener("scroll", () => {
    if (!raf) raf = requestAnimationFrame(atualizar);
  }, { passive: true });
  atualizar();
}
