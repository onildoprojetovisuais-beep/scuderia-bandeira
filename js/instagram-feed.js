/*
  Feed do Instagram — "Nos Bastidores" (seção 06)

  O HTML já carrega 8 fotos reais do acervo como fallback estático (nunca
  em branco, funciona sem JS). Este módulo só tenta uma coisa: buscar
  /api/instagram-feed (função serverless — ver api/instagram-feed.js) e,
  se vier gente de verdade da Graph API, troca src/href/legenda das MESMAS
  8 peças já no DOM — não recria nada, não reabre o IntersectionObserver
  de motion.js (que já rodou sobre os nós originais).

  Falha silenciosa por design: sem credenciais configuradas, endpoint
  fora do ar, rede offline ou resposta vazia — o fallback do HTML
  permanece exatamente como está. Ver doc/instagram-integration.md.
*/
const ENDPOINT = "/api/instagram-feed";

// 1234 → "1.2k", igual ao formato compacto que o próprio Instagram usa.
function formatarContagem(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k`;
  return String(n);
}

export async function initInstagramFeed() {
  const items = document.querySelectorAll("#instagramFeed [data-ig-link]");
  if (!items.length) return;

  let payload;
  try {
    const res = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
    if (!res.ok) return;
    payload = await res.json();
  } catch {
    return; // offline, função ausente em dev local, etc. — fica no fallback.
  }

  const posts = Array.isArray(payload?.posts) ? payload.posts : [];
  if (!posts.length) return;

  items.forEach((link, i) => {
    const post = posts[i];
    if (!post?.mediaUrl) return;

    const img = link.querySelector("[data-ig-media]");
    const cap = link.querySelector("[data-ig-cap]");
    const badge = link.querySelector("[data-ig-badge]");
    const likes = link.querySelector("[data-ig-likes]");
    const comments = link.querySelector("[data-ig-comments]");
    const picture = link.querySelector("picture");

    link.href = post.permalink || link.href;

    if (img) {
      // Mídia vem direto do CDN da Graph API — sem srcset local, então os
      // <source> do fallback (que apontam pra outra imagem) precisam sair.
      picture?.querySelectorAll("source").forEach((s) => s.remove());
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
      img.src = post.mediaType === "VIDEO" ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl;
      if (post.caption) img.alt = post.caption.slice(0, 180);
    }

    if (cap && post.caption) cap.textContent = post.caption.slice(0, 90);
    if (badge) badge.classList.toggle("conteudo__feed-badge--on", post.mediaType === "VIDEO");
    // Só troca o placeholder por dado real quando a Graph API devolve o
    // campo — sem like_count/comments_count (permissão ausente, etc.), o
    // número ilustrativo do HTML fica como está.
    if (likes && typeof post.likeCount === "number") likes.textContent = formatarContagem(post.likeCount);
    if (comments && typeof post.commentsCount === "number") comments.textContent = formatarContagem(post.commentsCount);
  });
}
