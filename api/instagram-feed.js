// Vercel Function (Node.js, zero-config — este arquivo em /api já basta,
// não precisa de vercel.json/framework). Busca os posts recentes do
// Instagram da Scuderia Bandeiras via Instagram Graph API oficial (conta
// Business/Creator) e devolve só o que o feed precisa — nunca o access
// token, nunca a resposta bruta da Meta.
//
// Credenciais (ver doc/instagram-integration.md para o passo a passo
// completo de como obtê-las): definidas como env vars no projeto Vercel,
// nunca no frontend.
//   IG_USER_ID      — ID numérico da conta Instagram Business/Creator
//   IG_ACCESS_TOKEN — token de acesso de longa duração (Graph API)
//
// Sem as duas configuradas, ou se a chamada à Meta falhar por qualquer
// motivo, a resposta é sempre { posts: [] } com HTTP 200 — o frontend
// (js/instagram-feed.js) trata isso como "sem dado novo" e mantém o
// fallback estático já no HTML. Nunca faz scraping do Instagram.

const GRAPH_VERSION = "v21.0";
const POST_LIMIT = 8;
const CACHE_HEADER = "public, s-maxage=3600, stale-while-revalidate=86400";

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ posts: [] });
    return;
  }

  res.setHeader("Cache-Control", CACHE_HEADER);

  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  if (!userId || !token) {
    res.status(200).json({ configured: false, posts: [] });
    return;
  }

  const fields = "caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media?fields=${fields}&limit=${POST_LIMIT}&access_token=${token}`;

  try {
    const graphRes = await fetch(url);
    if (!graphRes.ok) {
      console.error("instagram-feed: Graph API respondeu", graphRes.status);
      res.status(200).json({ configured: true, posts: [] });
      return;
    }

    const data = await graphRes.json();
    const posts = (data.data || []).slice(0, POST_LIMIT).map((item) => ({
      id: item.id,
      caption: item.caption || "",
      mediaType: item.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url || null,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    res.status(200).json({ configured: true, posts });
  } catch (err) {
    console.error("instagram-feed: falha ao buscar Graph API", err);
    res.status(200).json({ configured: true, posts: [] });
  }
};
