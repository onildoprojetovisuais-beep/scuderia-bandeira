/*
  04 · Experiências — painel dos 5 princípios do Team Building.
  Progressive enhancement: o HTML já traz os 5 itens (<h3> + foto) legíveis sem
  JS. Aqui cada <h3> vira um <button aria-expanded aria-controls> e só um item
  fica aberto por vez (sempre um — o aberto não fecha, então a altura da seção
  nunca encolhe). CSS decide a apresentação: accordion no mobile/tablet, lista
  de navegação sobre a foto-palco no desktop (≥1024px).
  Teclado: Enter/Espaço (nativo do button), setas ↑/↓ e ←/→ movem o foco entre
  os itens (ativando-os), Home/End vão ao primeiro/último.
  Mouse (hover fino): passar o cursor também troca a foto; clique/foco/toque
  funcionam em qualquer dispositivo.
*/
export function initExperiencias() {
  const root = document.querySelector("[data-exp-painel]");
  if (!root) return;
  const items = [...root.querySelectorAll(".exp-item")];
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const desktop = window.matchMedia("(min-width: 1024px)");

  const buttons = items.map((item, i) => {
    const cab = item.querySelector(".exp-item__cab");
    const painel = item.querySelector(".exp-item__painel");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "exp-item__btn";
    btn.id = `exp-btn-${i + 1}`;
    painel.id = `exp-painel-${i + 1}`;
    painel.setAttribute("role", "region");
    painel.setAttribute("aria-labelledby", btn.id);
    btn.setAttribute("aria-controls", painel.id);
    while (cab.firstChild) btn.appendChild(cab.firstChild);
    const ind = document.createElement("span");
    ind.className = "exp-item__ind";
    ind.setAttribute("aria-hidden", "true");
    btn.appendChild(ind);
    cab.appendChild(btn);
    return btn;
  });

  let active = -1;
  function setActive(index, { scroll = false } = {}) {
    if (index === active) return;
    active = index;
    items.forEach((item, i) => {
      const on = i === index;
      item.classList.toggle("is-active", on);
      buttons[i].setAttribute("aria-expanded", on ? "true" : "false");
    });
    // Accordion: ao abrir um item abaixo de outro aberto, o fechamento de cima
    // empurra o conteúdo — traz o cabeçalho de volta à vista se saiu da tela.
    if (scroll && !desktop.matches) {
      const btn = buttons[index];
      const settle = reduced.matches ? 0 : 420;
      setTimeout(() => {
        const r = btn.getBoundingClientRect();
        if (r.top < 8) {
          window.scrollTo({ top: window.scrollY + r.top - 72, behavior: reduced.matches ? "auto" : "smooth" });
        }
      }, settle);
    }
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => setActive(i, { scroll: true }));
    btn.addEventListener("focus", () => { if (desktop.matches) setActive(i); });
    btn.addEventListener("mouseenter", () => { if (desktop.matches && fineHover.matches) setActive(i); });
    btn.addEventListener("keydown", (e) => {
      const last = buttons.length - 1;
      let next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      if (next === null) return;
      e.preventDefault();
      buttons[next].focus();
      setActive(next, { scroll: true });
    });
  });

  root.closest(".experiencias__cena")?.classList.add("is-enhanced");
  root.classList.add("is-enhanced");
  setActive(0);
}
