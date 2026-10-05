# Resumo da sessão — 30/09/2026 (continuar amanhã)

Branch: `feat/nova-home`. Nada publicado, nada commitado, nada em deploy.

## O que foi feito hoje
1. Subi o site local (`python -m http.server 8000`, http://localhost:8000/). A API `/api/instagram-feed` dá 404 no servidor local, o que é esperado. Ela só funciona na Vercel.
2. Rodei a **rodada final de consolidação**. Foram 5 agentes de auditoria em paralelo (só leitura): QA técnico, acessibilidade, performance, SEO/produção e visual/conteúdo.
3. **Resultado:** nenhuma regressão e nenhum defeito novo que exija código. O site não foi alterado.
4. Única edição: `qa/QA-EXECUTION-PLAN.md`. Adicionei um aviso no topo (as tabelas 1–7 são da Sprint 01) e a seção "Rodada Final de Consolidação" no fim.

## Pendente: decisão ou insumo seu
- **QA-055:** ferramenta de analytics, ID e consentimento LGPD.
- **D1:** aprovar a capa OG (recorte do complexo) ou enviar outra.
- **D1b:** logo em PNG/JPG para o JSON-LD.
- **D2:** confirmar `www.scuderiabandeiras.com.br` como domínio canônico.
- **D3:** confirmar o projeto e o domínio definitivos na Vercel.
- **D4:** número oficial do WhatsApp e titularidade (QA-023).
- **D5:** manter ou ignorar os órfãos no deploy (`assets/`, `carros/`, `Brand/` e 160 arquivos de `assets-build/`, ~30 MB).
- **D6:** comentários internos nos `js/*.js` públicos.
- **QA-043:** arquivos WebVTT reais. **QA-077:** retratos oficiais dos pilotos.
- **QA-053, QA-054, QA-079:** aprovação do Caio/time.
- **Copy da 404.**
- **Autorizações de imagem e marca:** logos de terceiros, mural e patrocinadores, pessoas dos mosaicos, Ingo, Caterham, PETRONAS.
- **Outras decisões em aberto:**
  - QA-020: rótulo do CTA principal.
  - QA-022: microcopy do WhatsApp.
  - QA-040: números e fatos do site.
  - QA-042: privacidade.
  - QA-065: ordem e rótulos do menu.
  - Título da seção 07 ("Marcas que já andam ao lado…"), que pode soar como parceria atual.
  - Cargos de Christian ("Chefe de equipe") e Ingo ("Embaixador").

## Risco principal
**27 arquivos essenciais estão fora do git** (`vercel.json`, `css/site.min.css`, `404.html`, `robots.txt`, `sitemap.xml`, `favicon.ico`, as fontes, a imagem OG, 3 MP4 novos, derivados `eco-espaco-*` e `time-mosaico-foto-2-*`, `scripts/build-css.py`, `scripts/build-og.py`). Deploy via Git sem `git add` quebra o site.

## Opcional, não aplicado (precisa de validação visual)
- Rodapé a 390 px: links de 17–21 px de altura (WCAG 2.5.8, espaçamento não medido).
- `aria-controls` no botão do menu.
- `Disallow: /api/` no `robots.txt`.

## Por onde continuar amanhã
1. Decidir D2 e D3 (desbloqueiam canonical, OG e sitemap).
2. Verificar o método de deploy e fazer `git add` dos arquivos novos.
3. Decidir D5.
4. Aprovar a capa OG, a copy da 404 e os enquadramentos pendentes.
5. Configurar `IG_USER_ID` e `IG_ACCESS_TOKEN` na Vercel.
6. Fazer um deploy de **preview** e rodar os testes de produção: `curl -I`, previews sociais, Lighthouse, Search Console e 404 real.
7. Testar em Safari iOS e Chrome Android reais e com VoiceOver/NVDA.
8. Configurar o redirect apex → www no painel.
9. Publicar e enviar o sitemap ao Search Console.

Detalhes completos: `qa/QA-EXECUTION-PLAN.md` (seção "Rodada Final de Consolidação").
