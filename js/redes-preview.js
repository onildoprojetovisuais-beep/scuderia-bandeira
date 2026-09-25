/*
  Painel único de preview da coluna "Acompanhe a Scuderia" (06 · Conteúdo &
  Bastidores) — redesenho 2026-09-25 (pedido direto do usuário): em vez de
  4 sub-painéis abrindo em acordeão, é 1 painel só que troca de conteúdo
  (crossfade em CSS, .is-active) conforme o mouse passa por cada rede no
  desktop, ou o 1º toque no mobile (2º toque no mesmo item, já ativo, segue
  o link normalmente — mesmo padrão de .piloto-card/js/pilotos.js). Sem
  mouse sobre a lista, volta pro Instagram (estado padrão).

  Instagram nunca é inventado: sincronizarInstagram() lê ao vivo a peça em
  destaque do feed logo acima (#instagramFeed .conteudo__feed-item--featured)
  — os mesmos nós que js/instagram-feed.js mantém sincronizados com a Graph
  API quando configurada. Sem JS nenhum, o HTML já nasce com essa mesma
  imagem/legenda hardcoded no painel — nunca fica em branco.

  YouTube/TikTok ficam PRONTOS para o embed oficial, mas não fabricam nada:
  preencha YOUTUBE_VIDEO_ID (ou _PLAYLIST_ID) / TIKTOK_VIDEO_URL abaixo com
  um vídeo real assim que existir — enquanto estiverem vazios, o placeholder
  "pendente de configuração" do HTML permanece.
*/

// Preencher quando houver conteúdo real definido:
const YOUTUBE_VIDEO_ID = null; // ex.: "dQw4w9WgXcQ"
const YOUTUBE_PLAYLIST_ID = null; // usado só se YOUTUBE_VIDEO_ID ficar vazio
const TIKTOK_VIDEO_URL = null; // ex.: "https://www.tiktok.com/@scuderiabandeiras/video/123..."

export function initRedesPreview() {
  const corpo = document.querySelector(".conteudo__redes-corpo");
  const lista = document.querySelector(".conteudo__redes-lista");
  const painel = document.querySelector(".conteudo__redes-painel");
  if (!corpo || !lista || !painel) return;

  const links = [...lista.querySelectorAll("[data-rede]")];
  const previews = [...painel.querySelectorAll("[data-preview]")];
  if (!links.length || !previews.length) return;

  let embedsPreparados = false;

  function mostrar(rede) {
    links.forEach((l) => l.classList.toggle("is-ativo", l.dataset.rede === rede));
    previews.forEach((p) => p.classList.toggle("is-active", p.dataset.preview === rede));
    if (rede === "instagram") sincronizarInstagram();
    if (!embedsPreparados) prepararEmbeds();
  }

  // Instagram: nunca duplica dado, só espelha o que já está no feed acima —
  // funciona tanto pro fallback estático quanto pro post real da Graph API.
  function sincronizarInstagram() {
    const destaque = document.querySelector(
      "#instagramFeed .conteudo__feed-item--featured [data-ig-media]"
    );
    const legendaFonte = document.querySelector(
      "#instagramFeed .conteudo__feed-item--featured [data-ig-cap]"
    );
    if (!destaque) return;

    const alvoImg = painel.querySelector('[data-preview="instagram"] [data-preview-media]');
    const alvoLegenda = painel.querySelector('[data-preview="instagram"] [data-preview-legenda]');
    if (alvoImg && destaque.currentSrc) {
      alvoImg.src = destaque.currentSrc;
      alvoImg.alt = destaque.alt;
    }
    if (alvoLegenda && legendaFonte?.textContent) {
      alvoLegenda.textContent = legendaFonte.textContent;
    }
  }

  // Embeds oficiais (YouTube iframe / TikTok oEmbed): só entram em cena se
  // houver um vídeo real configurado no topo do arquivo. Carrega uma única
  // vez, na primeira vez que qualquer rede é mostrada.
  function prepararEmbeds() {
    embedsPreparados = true;
    ativarYoutube();
    ativarTiktok();
  }

  function ativarYoutube() {
    const slot = painel.querySelector('[data-preview="youtube"] [data-embed-slot]');
    if (!slot) return;
    const src = YOUTUBE_VIDEO_ID
      ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`
      : YOUTUBE_PLAYLIST_ID
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`
      : null;
    if (!src) return; // sem vídeo/playlist definido — mantém o placeholder

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Vídeo da Scuderia Bandeiras no YouTube";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    slot.replaceChildren(iframe);
    slot.classList.add("is-embed");
  }

  async function ativarTiktok() {
    const slot = painel.querySelector('[data-preview="tiktok"] [data-embed-slot]');
    if (!slot || !TIKTOK_VIDEO_URL) return; // sem URL real — mantém o placeholder

    try {
      const res = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(TIKTOK_VIDEO_URL)}`
      );
      if (!res.ok) return;
      const dados = await res.json();
      if (!dados?.html) return;

      slot.innerHTML = dados.html;
      slot.classList.add("is-embed");
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      slot.appendChild(script);
    } catch {
      // offline, endpoint fora do ar etc. — fica no placeholder pendente.
    }
  }

  const temHoverFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (temHoverFino) {
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => mostrar(link.dataset.rede));
      link.addEventListener("focus", () => mostrar(link.dataset.rede));
    });
    lista.addEventListener("mouseleave", () => mostrar("instagram"));
  } else {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const jaAtivo = link.classList.contains("is-ativo");
        if (jaAtivo) return; // 2º toque no mesmo item: segue o link normalmente
        e.preventDefault();
        mostrar(link.dataset.rede);
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".conteudo__redes-corpo")) mostrar("instagram");
    });
  }

  mostrar("instagram");
}
