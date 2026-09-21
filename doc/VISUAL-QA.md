# VISUAL-QA.md — Primeira rodada de implementação

**Status:** build inicial funcional, rodando localmente. Não é a versão final —
faltam as 4 decisões pendentes do usuário (`VISUAL-DIRECTION.md` §16), a
Caterham em versão completa (depende de aprovação de direitos), o motion
system completo e o QA mobile/cross-browser.

**Como rodar localmente:** `python -m http.server 8420` na raiz do projeto,
depois abrir `http://localhost:8420/index.html`. O overlay de manutenção é
inerte em localhost/LAN (ver `maintenance-overlay.js`).

---

## Bugs encontrados e corrigidos nesta rodada

### P0 — `aspect-ratio` em `<img>` com atributos width/height ignorado
**Sintoma:** várias dobras (Sobre, Ecossistema, Bandeiras Empresarial,
Conteúdo, Pilotos & Time, Marcas) renderizavam com altura de imagem igual à
altura NATURAL do arquivo original, não ao recorte pretendido — inflando a
altura total da página de ~9.000px esperados para 25.785px.

**Causa:** todo `<img>` gerado pelo pipeline carrega atributos HTML
`width`/`height` (necessários para reservar espaço e evitar CLS antes do CSS
carregar). Esses atributos mapeiam para um `height` CSS de baixa prioridade
("presentational hint"). Como os componentes só declaravam
`aspect-ratio` + `width:100%` sem `height` explícito, esse hint de baixa
prioridade vencia e a proporção pretendida era ignorada.

**Correção:** `img { height: auto; }` adicionado a `css/base.css` (regra
global no `@layer base`, abaixo de `@layer components` na ordem de
declaração — vence por especificidade de camada onde os componentes não
competem explicitamente por `height`). Página caiu para ~15.000-17.000px de
altura total nas primeiras dobras testadas.

**Verificado:** sim, via inspeção de `getComputedStyle` antes/depois.

### P0 — Contraste do H1 do Hero contra a foto
**Sintoma:** "Muito além das pistas." cruzava a lataria clara do F3 na foto
do hero (`Imagens/final/imagem final@2x.png`) e ficava quase ilegível nessa
faixa.

**Correção:** gradiente do `.hero__scrim` escurecido (de 35–92% de opacidade
para 50–96%, invertido de cima pra baixo) + `text-shadow` no H1/eyebrow/lead
como segunda camada de garantia, independente do que está atrás.

**Verificado:** visualmente (screenshot) — texto legível após a correção.
Não medido contraste numérico exato contra a foto (é uma imagem, não uma cor
sólida — não dá pra calcular uma razão WCAG única).

### P1 — Falha em confirmar carregamento de imagens `loading="lazy"` na sessão de teste automatizado
**Sintoma:** em uma sessão de navegador controlada por automação (Claude in
Chrome via CDP), múltiplas imagens com `loading="lazy"` — incluindo o logo do
nav, que nunca sai da viewport — permaneceram `img.complete === false` /
`naturalWidth === 0` mesmo após rolagem completa da página e mais de 2s de
espera.

**Diagnóstico:** os arquivos em si estão corretos (testado com `new
Image()` isolado — carregam instantaneamente). Forçar `img.loading =
'eager'` num elemento já "travado" resolve o carregamento na hora. Isso
aponta para uma interação entre o agendamento de `loading="lazy"` do Chrome
e o ambiente de automação (CDP), não necessariamente um defeito que afeta um
visitante real com um Chrome/Firefox/Safari comum — mas **não pude confirmar
isso com um navegador não-automatizado dentro desta sessão**.

**Correção aplicada:** o logo do nav (sempre visível, nunca deveria ter sido
lazy) passou para `loading="eager"` — correção correta independentemente da
causa do bug.

**Não corrigido / pendente:** as demais ~20 imagens abaixo da dobra
permanecem `loading="lazy"` (prática correta para performance). **Recomendo
verificar esta rodada específica — carregamento de imagens lazy — abrindo o
site num Chrome normal, não controlado por automação, antes de considerar o
pipeline de imagens 100% validado.** Se o mesmo comportamento aparecer lá,
vira P0 real.

---

## O que foi verificado nesta rodada (via JS/DOM, não apenas visual)

- Zero erros no console em carregamento limpo e após navegação.
- Os 25 slots `<x-img>` do template expandiram sem erro (script de build).
- Pipeline de mídia: reduções batem com o medido por G no VISUAL-DIRECTION
  (ex.: `local/auditorio.jpg` 13,3MB → 145KB em AVIF 1920w).
- `prefers-reduced-motion`: implementado via CSS (`@layer motion-base`) +
  checagem em `js/motion.js`; não testado em navegador com a flag ativada
  nesta rodada (pendente).
- Menu mobile (`<dialog>`), scroll-spy, CTAs→WhatsApp: implementados, não
  testados interativamente nesta rodada (pendente — próxima rodada de QA).
- Contraste de cor calculado (não renderizado/medido com ferramenta) na
  seção 9 do VISUAL-DIRECTION — `#FF4747` sobre `#0F0F0F` e variantes.

## Não verificado / pendente para a próxima rodada

- Viewports 320/375/390/430/768/1024/1280/1366/1536/1920 (só 1440 foi
  inspecionado nesta rodada).
- Firefox, Safari/WebKit.
- Lighthouse (LCP/CLS/INP reais) e axe-core (não instalados ainda — pedir
  OK antes de instalar, per o combinado).
- Teclado/foco/`aria` do menu mobile e da navegação.
- Caterham na versão completa com mídia real (depende da aprovação de
  direitos — item 6 do VISUAL-DIRECTION §16).
- Ativação do formulário (depende de endpoint — item 11).
