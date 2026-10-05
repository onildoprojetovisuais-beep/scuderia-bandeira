/*
  CTAs de conversão — Fonte: doc/VISUAL-DIRECTION.md §13.3, §13.5

  Decisão §13.5 (inegociável): nenhum CTA "Crie um projeto" abre um
  formulário morto. Enquanto FORM_ENDPOINT for null (não existe endpoint
  aprovado — pendência §16 item 11), todo CTA de conversão abre WhatsApp
  direto com texto contextual conforme a origem do clique.

  Número de WhatsApp: o da copy aprovada (doc/copy-final-aprovada.md,
  footer) — +55 15 99857-0854. Isto é DIFERENTE do número usado hoje em
  maintenance-overlay.js (5515981282808); a divergência está registrada
  como pendência §16 item 13 e não foi resolvida por este código.

  O texto pré-preenchido de cada mensagem é MICROCOPY PROPOSTA, não faz
  parte da copy aprovada — aguarda aprovação (§16 item 16).
*/

const WHATSAPP_NUMBER = "5515998570854";

// Aguardando endpoint real aprovado (§16 item 11). Enquanto for null, o
// formulário/modal não abre — todo CTA de conversão vira WhatsApp.
const FORM_ENDPOINT = null;

const ORIGIN_LABELS = {
  hero: "Ainda não sei",
  "team-building": "Team Building",
  caterham: "Caterham",
  "bandeiras-empresarial": "Bandeiras Empresarial",
  conteudo: "Conteúdo / branded content",
  palestra: "Palestra com piloto",
  pilotos: "Evento ou ativação de marca",
  marcas: "Projeto personalizado",
  "cta-final": "Ainda não sei",
};

function buildWhatsAppMessage(origin) {
  const label = ORIGIN_LABELS[origin] || "Ainda não sei";
  return `Olá! Vim pelo site da Scuderia Bandeiras e tenho interesse em: ${label}.`;
}

function whatsappUrl(origin) {
  const text = encodeURIComponent(buildWhatsAppMessage(origin));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function initCTAs() {
  // QA-021: o href real (wa.me + mensagem) já vem no HTML, então o link
  // funciona sem JS (copiar link, abrir em nova aba, ctrl/cmd/middle-click).
  // Rede de segurança: se algum CTA chegar com href vazio/"#", preenche aqui.
  document.querySelectorAll("[data-cta]").forEach((el) => {
    const href = el.getAttribute("href");
    if (href && href !== "#") return;
    const origin = el.dataset.origin || (el.dataset.cta === "project" ? "hero" : "direto");
    el.setAttribute("href", whatsappUrl(origin));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // O JS só mede: nunca cancela a navegação nativa do link.
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-cta]");
    if (!trigger) return;

    const kind = trigger.dataset.cta;

    if (kind === "project") {
      if (FORM_ENDPOINT) {
        // Reservado para quando o endpoint existir: abrir o modal em vez
        // de sair para o WhatsApp (componente ainda não implementado).
        event.preventDefault();
        return;
      }
      const origin = trigger.dataset.origin || "hero";
      trackEvent("cta_click", { origin, destination: "whatsapp" });
    }

    if (kind === "whatsapp") {
      const origin = trigger.dataset.origin || "direto";
      trackEvent("whatsapp_click", { origin });
    }
  });
}

/*
  Tracking (§13, "Métricas/eventos que deveriam existir"): eventos nomeados,
  sem dados pessoais. Nenhuma ferramenta de analytics está conectada ainda
  (pendência §16 item 12) — por enquanto isto só grava no console em modo
  debug (?debug=1), para não perder o instrumento quando o analytics vier.
*/
function trackEvent(name, payload) {
  if (window.location.search.includes("debug=1")) {
    console.info("[track]", name, payload);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
}
