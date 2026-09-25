# Integração real do feed do Instagram — "Nos Bastidores"

A seção "Nos Bastidores" (index.html, seção 06) já está 100% pronta
visualmente com 8 fotos reais do acervo como fallback estático. O
frontend (`js/instagram-feed.js`) tenta buscar `/api/instagram-feed`
(`api/instagram-feed.js`) e, se vier dado real, troca só imagem/legenda/
link de cada peça — sem isso, o fallback permanece, sem erro visível.

Não usa scraping. Usa a **Instagram Graph API** oficial (a mesma API que
alimenta o Meta Business Suite), que exige uma conta Instagram
**Business ou Creator** conectada a uma **Página do Facebook**.

## O que falta para ativar o feed real

1. **Conta Instagram Business/Creator** — a conta @scuderiabandeiras
   precisa estar configurada como Business ou Creator (Instagram →
   Configurações → Conta → Mudar para conta profissional), e conectada a
   uma Página do Facebook (pode ser uma página nova, só para isso).

2. **App no Meta for Developers** — criar um app em
   https://developers.facebook.com/apps, tipo "Business", com o produto
   **Instagram Graph API** adicionado.

3. **Permissões (scopes)** — `instagram_basic` e `pages_show_list` no
   mínimo (para listar mídia). Se depois quiser também métricas
   (curtidas/comentários), adicionar `instagram_manage_insights`.

4. **Token de acesso de longa duração** — gerar um User Access Token
   com essas permissões (via Graph API Explorer ou fluxo OAuth do app) e
   trocá-lo por um **long-lived token** (válido por ~60 dias) usando o
   endpoint `GET /oauth/access_token?grant_type=fb_exchange_token`.
   Esse token expira e precisa ser renovado — não implementamos um cron
   de renovação nesta rodada (fora do escopo pedido); o jeito mais simples
   de não deixar o token vencer é usar um **token de usuário do sistema**
   (System User) do Business Manager, que não expira pelo fluxo normal,
   ou lembrar de renovar manualmente a cada ~50 dias.

5. **ID numérico da conta Instagram** — obtido via
   `GET /{page-id}?fields=instagram_business_account` (Graph API
   Explorer, usando o mesmo token acima).

## Configurar no Vercel

No projeto (`catalogo-bandeiras`), em **Settings → Environment Variables**,
adicionar:

| Nome              | Valor                                          |
|-------------------|-------------------------------------------------|
| `IG_USER_ID`      | ID numérico obtido no passo 5                   |
| `IG_ACCESS_TOKEN`  | long-lived token obtido no passo 4              |

Depois de salvar, redeploy. `api/instagram-feed.js` já lê essas duas
variáveis — nenhuma mudança de código é necessária para ativar.

## Testar

- Local: `vercel dev` (com as env vars em `.env.local` via
  `vercel env pull`) e abrir a página — o feed deve trocar as imagens
  mock pelas reais.
- Produção: abrir `/api/instagram-feed` direto no navegador — deve
  responder `{"configured":true,"posts":[...]}`. Se vier
  `{"configured":false,"posts":[]}`, as env vars não foram encontradas.

## Cache

A função responde com `Cache-Control: public, s-maxage=3600,
stale-while-revalidate=86400` — a CDN da Vercel guarda a resposta por até
1h antes de buscar de novo na Meta, evitando bater o rate limit da Graph
API a cada visita.
