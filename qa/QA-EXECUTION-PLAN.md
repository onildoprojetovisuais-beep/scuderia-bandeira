# QA-EXECUTION-PLAN — Scuderia Bandeiras

Fonte de verdade: `qa/QA_Scuderia_Bandeiras_Para_Nill.xlsx` (abas Resumo executivo, Controle QA — 80 registros, Evidências visuais — 23 prints EV-01…EV-23).

Regras da rodada: só o coordenador edita arquivos; agentes paralelos apenas inspecionam/retestam. `index.html` é gerado por `scripts/build-html.py` a partir de `index.template.html` (edita-se o template e regenera). Não publicar.

> **Aviso:** as tabelas das seções 1–7 abaixo são o retrato da Sprint 01 e **não refletem o estado atual** (ex.: QA-027 consta FAIL, QA-053/054 consta BLOCKED, SEO consta LATER). O status vigente está nas seções de resultado de cada sprint e na **"RODADA FINAL DE CONSOLIDAÇÃO"** no fim deste arquivo.

Legenda de resultado Sprint 01: **FIXED** · **BLOCKED** · **RETEST PASS** · **RETEST FAIL**

## Contagem

| Bucket | Qtde |
|---|---|
| FIX NOW (Sprint 01) | 10 |
| BLOCKED — AGUARDANDO INSUMO | 3 |
| RETEST AFTER FIX | 3 |
| LATER / P2 | 29 |
| LATER / P1 fora do escopo (rodada própria) | 7 |
| REFINEMENT / P3 | 10 |
| ALREADY VALIDATED | 18 |
| **Total** | **80** |

## 1. FIX NOW — Sprint 01 (pacote de aceite)

| ID | Prio | Seção | Item | FIXED / Reteste |
|---|---|---|---|---|
| QA-001 | P1 | Conteúdo & bastidores | Reprodução do vídeo e imagem de capa | **FIXED** · **RETEST PASS** — poster e vídeo movidos p/ `assets-build/` (o `.vercelignore` `Imagens/` os excluía do deploy); 249 URLs locais = 200; play/pausa/fim OK (seek validado em servidor com Range). |
| QA-002 | P1 | Marcas & parceiros | Player provisório do case PETRONAS | **FIXED** · **RETEST PASS** — player falso removido; figura estática com foto real aprovada (`estrutura-espaco-motor`), sem play/VIDEO-02/00:00. |
| QA-003 | P1 | Legado / Experiências / Complexo | Pausa de vídeos automáticos | **FIXED** · **RETEST PASS** — botão de pausa/retomada nos 3 vídeos; teclado, rótulo anunciado, pausa manual persistente; reduced-motion não inicia sozinho. |
| QA-021 | P1 | Todos os CTAs comerciais | Destino real no atributo href | **FIXED** · **RETEST PASS** — 11 CTAs com `wa.me` + mensagem no href, `target=_blank rel=noopener`; funcionam sem JS; JS só mede. |
| QA-026 | P1 | Menu móvel | Abrir, fechar, Escape e retorno do foco | **FIXED** · **RETEST PASS** — cleanup único no evento `close` do dialog; Escape/fechar/scrim/link/resize destravam a rolagem. |
| QA-057 | P1 | Ecossistema | Conteúdo cortado em 1024 px | **FIXED** · **RETEST PASS** — sem overflow em 1024/1180/1280 (grid `minmax(0,1fr)` + `min-width:0`); ajuste extra: CTA do header cortado em 1280–1439 px. |
| QA-067 | P2 | Ecossistema / tags | Excluir as linhas de tags dos dois painéis | **FIXED** · **RETEST PASS** — as duas linhas de tags removidas (HTML + CSS morto). |
| QA-075 | P1 | Pilotos & time / mosaico | Atualizar participação dos pilotos em projetos | **FIXED** · **RETEST PASS** — copy exata aplicada; visível sem corte em 8 larguras. |
| QA-076 | P1 | Botões com fundo vermelho | Usar texto branco com contraste adequado | **FIXED** · **RETEST PASS** — token único `--vermelho-botao` #d92b2b (branco 4,85:1; hover 6,57:1; ativo 8,13:1). |
| QA-078 | P1 | Bandeiras Empresarial / CTA após vídeo | Corrigir texto ilegível no estado escuro do botão | **FIXED** · **RETEST PASS** — causa: `--luz` remapeado em `.section--paper` → hover escuro com texto escuro; normal/hover/focus/active/visited legíveis. |

## 2. BLOCKED — AGUARDANDO INSUMO (sem placeholder, sem imagem gerada)

| ID | Prio | Seção | Item | Insumo necessário |
|---|---|---|---|---|
| QA-053 | P1 | Ecossistema / card Scuderia Bandeiras | Substituir foto pelo espaço físico da Scuderia | **BLOCKED** — Aguardando foto aprovada do espaço físico da Scuderia (Will → Caio aprova). |
| QA-054 | P2 | Pilotos & time / mosaico | Corrigir o mosaico repetido e incluir Caio | **BLOCKED** — Aguardando as duas partes corretas do mosaico + retrato aprovado de Caio. |
| QA-077 | P1 | Pilotos & time / cards | Substituir retratos apontados pelo time | **BLOCKED** — Aguardando retratos oficiais aprovados dos pilotos (Will). |

## 3. RETEST AFTER FIX

| ID | Prio | Seção | Item | Depende de |
|---|---|---|---|---|
| QA-017 | P1 | Hero e CTAs contextuais | Fluxo Crie um projeto | **RETEST PASS (parcial)** — 11 CTAs abrem `wa.me` correto por origem, em nova aba (headless 1440/390). Falta dispositivo real (QA-039). — Seis CTAs `project` — reteste destravado por QA-021 (href real). |
| QA-046 | P1 | Botão principal / títulos | Contraste em cores sólidas | **RETEST PASS (parcial)** — botões vermelhos ≥4,5:1 em todos os estados. Fotos/demais combinações seguem para rodada própria. Nota: ponto ativo do carrossel 3,23:1 (não-texto, ≥3:1). — Contraste — recalcular com o novo token (QA-076) e estados (QA-078). |
| QA-027 | P1 | Página completa | Navegação somente por teclado e skip link | **RETEST FAIL (não fechado)** — novo controle de pausa e menu alcançáveis por Tab; porém o skip-link move o hash e não o foco para `<main>` (igual ao HEAD; `main` sem `tabindex="-1"`). Fica para a rodada de teclado. — Teclado/skip link — reteste parcial pós QA-003 (novo controle de pausa) e QA-026 (menu). |

## 4. LATER / P2 (e P1 que exigem rodada própria)

| ID | Prio | Seção | Item | Nota |
|---|---|---|---|---|
| QA-004 | P2 | Conteúdo / prévias sociais | Textos provisórios nas prévias | Sprint 02+ / conteúdo |
| QA-005 | P2 | Conteúdo / prévias sociais | Painéis inativos expostos à leitura assistiva | Sprint 02+ / conteúdo |
| QA-006 | P2 | Experiências / Estrutura | Hierarquia de títulos | Sprint 02+ / conteúdo |
| QA-007 | P2 | Bandeiras Empresarial | Semântica do indicador do carrossel | Sprint 02+ / conteúdo |
| QA-008 | P2 | Bandeiras Empresarial | Área dos indicadores do carrossel | Sprint 02+ / conteúdo |
| QA-009 | P2 | Head da página | Imagem e URL de compartilhamento | Sprint 02+ / conteúdo |
| QA-019 | P1 | WhatsApp | Entrega e atendimento de um lead de teste | lead real WhatsApp (comercial) |
| QA-020 | P2 | Comece um projeto | Expectativa criada pelos dois CTAs | Sprint 02+ / conteúdo |
| QA-023 | P2 | Contato | Identidade e titularidade do WhatsApp | titularidade do WhatsApp (comercial) |
| QA-029 | P2 | Bandeiras Empresarial | Carrossel: setas, indicadores e gesto horizontal | Sprint 02+ / conteúdo |
| QA-030 | P2 | Feed Instagram | Correspondência entre card e publicação | Sprint 02+ / conteúdo |
| QA-031 | P2 | Instagram / LinkedIn / TikTok / YouTube | Abertura dos perfis sociais | abertura de perfis sociais |
| QA-038 | P1 | Página completa | Zoom a 200% e reflow equivalente a 400% | zoom real 200%/400% |
| QA-039 | P1 | Navegadores e dispositivos | Chrome, Safari, Firefox e aparelhos físicos | dispositivos físicos/matriz de browsers |
| QA-040 | P2 | Pilotos / equipe / complexo / parceiros | Validação factual e aprovação de números | validação factual (conteúdo/direção) |
| QA-042 | P2 | Rodapé / contato | Acesso a informações de privacidade | Sprint 02+ / conteúdo |
| QA-043 | P2 | Vídeos | Legendas e alternativa textual | Sprint 02+ / conteúdo |
| QA-047 | P1 | Carregamento inicial | Hero disponível para leitura | medição de carregamento |
| QA-048 | P2 | Vídeos institucionais | Peso dos arquivos de vídeo | Sprint 02+ / conteúdo |
| QA-050 | P2 | Página completa | Lighthouse, Core Web Vitals e rede móvel | Lighthouse/CWV |
| QA-052 | P1 | Página completa | Leitura real com VoiceOver/NVDA | VoiceOver/NVDA |
| QA-055 | P1 | Site inteiro | Instrumentação de visitas e cliques | analytics |
| QA-056 | P1 | Hero | Atraso de entrada do título e CTAs | filmstrip do hero |
| QA-058 | P2 | Página inexistente | Página de erro 404 com retorno útil | Sprint 02+ / conteúdo |
| QA-059 | P2 | Redirecionamentos | Redirecionamento permanente do domínio | Sprint 02+ / conteúdo |
| QA-060 | P2 | Legado | Botão de som sobre a área do texto | Sprint 02+ / conteúdo |
| QA-061 | P2 | Legado | Área preta relatada no vídeo móvel | Safari iOS/Android físicos |
| QA-062 | P2 | Marcas / painel de logos | Indicação de rolagem horizontal dos logos | Sprint 02+ / conteúdo |
| QA-064 | P2 | Ecossistema / Bandeiras Empresarial | Índice vermelho sobre fotografia | Sprint 02+ / conteúdo |
| QA-070 | P2 | Headers da home | Cabeçalhos adicionais de proteção | Sprint 02+ / conteúdo |
| QA-071 | P2 | Hero / lateral | Retirar a indicação ROLE | Sprint 02+ / conteúdo |
| QA-072 | P2 | Pilotos & time / palestras | Centralizar a chamada de palestras | Sprint 02+ / conteúdo |
| QA-073 | P2 | Pilotos & time / palestras | Excluir o parágrafo lateral de palestras | Sprint 02+ / conteúdo |
| QA-074 | P2 | Pilotos & time / mosaico | Atualizar a descrição dos profissionais | Sprint 02+ / conteúdo |
| QA-079 | P2 | Experiências / Team Building | Simplificar a composição da seção | Sprint 02+ / conteúdo |
| QA-080 | P2 | Experiências / card Comunicação | Corrigir enquadramento do rosto no card | Sprint 02+ / conteúdo |

## 5. REFINEMENT / P3

| ID | Prio | Seção | Item | Nota |
|---|---|---|---|---|
| QA-010 | P3 | Head da página | URL canônica | refinamento |
| QA-011 | P3 | Raiz do domínio | Arquivo robots.txt | refinamento |
| QA-012 | P3 | Raiz do domínio | Sitemap XML | refinamento |
| QA-015 | P3 | Head da página | Dados estruturados da organização | refinamento |
| QA-022 | P3 | WhatsApp | Texto pré-preenchido do contato geral | refinamento |
| QA-063 | P3 | Código público | Comentários internos de desenvolvimento | refinamento |
| QA-065 | P3 | Menu / rodapé | Ordem, rótulos e indicação de destino externo | refinamento |
| QA-066 | P3 | Legado | Caixa alta no texto do título | refinamento |
| QA-068 | P3 | Rodapé | Link do próprio domínio com redirect | refinamento |
| QA-069 | P3 | Raiz do domínio | Favicon legado e manifesto | refinamento |

## 6. ALREADY VALIDATED (não tocar)

| ID | Seção | Item |
|---|---|---|
| QA-013 | Head / conteúdo | Título, descrição e idioma |
| QA-014 | Página principal | H1 único e títulos de seção |
| QA-016 | Cabeçalho | Abertura do WhatsApp comercial |
| QA-024 | Menus / rodapé | Existência das âncoras internas |
| QA-025 | Ecossistema / Estrutura / Conteúdo / Marcas | Acesso direto às seções por URL |
| QA-028 | Menu móvel | Indicador visual de foco do menu |
| QA-032 | Caterham | Disponibilidade da página de destino |
| QA-033 | Hero desktop | Layout inicial em 1440×900 |
| QA-034 | Hero celular | Layout inicial em 390×844 |
| QA-035 | Hero celular estreito | Layout inicial em 320×740 |
| QA-036 | Ecossistema em tablet | Layout em 768×1024 |
| QA-037 | Estrutura / Conteúdo / Case / CTA final | Trechos internos em celular |
| QA-041 | Página principal | Paleta, tipografia e linguagem dos componentes |
| QA-044 | Imagens | Presença de texto alternativo |
| QA-045 | Estrutura da página | Landmarks e nomes dos controles |
| QA-049 | Imagens responsivas | Formatos e carregamento de imagens |
| QA-051 | Domínio | HTTPS e normalização do domínio |
| QA-018 | Página principal | Campos, validação, envio e mensagens de erro/sucesso |

## 7. Resumo da Sprint 01

**FIXED + RETEST PASS (10):** QA-001, 002, 003, 021, 026, 057, 067, 075, 076, 078.
**BLOCKED (3):** QA-053 (foto do espaço físico), QA-054 (mosaico + Caio), QA-077 (retratos oficiais).
**RETEST PASS parcial:** QA-017, QA-046. **RETEST FAIL:** QA-027 (skip-link não move foco; pré-existente).
**Regressões:** nenhuma. Achado adjacente corrigido: CTA "Fale com o time" cortado no header entre 1280 e 1439 px (compactação só nessa faixa; ≥1440 intacto).

### Arquivos alterados
`index.template.html`, `index.html` (regenerado por `scripts/build-html.py`), `css/tokens.css`, `css/components.css`, `js/nav.js`, `js/cta.js`, `js/video-sound-toggle.js`, `doc/copy-final-aprovada.md` (copy QA-075), `assets/…/pessoas-poster.jpg` → `assets-build/img/pessoas-poster.jpg`, `assets/…/pessoas-web-1280w.mp4` → `assets-build/video/pessoas-bastidores-1280w.mp4`.
`.vercelignore` **não** foi alterado.

### Reteste (7+ larguras: 320×740, 375×812, 390×844, 768×1024, 1024×768, 1180, 1280, 1440×900)
Sem overflow horizontal documental em nenhuma; sem sobreposição controle×texto; único erro de console = `GET /api/instagram-feed` 404 (servidor estático local, já no baseline — depende da função `api/` na Vercel).

### Pendências de atenção (fora da Sprint 01)
- Vídeo Bastidores: 24 MB (QA-048). O 1920w (55 MB) segue em `assets/Imagens/` e fica fora do deploy.
- Foto do case PETRONAS reutiliza `estrutura-espaco-motor` (já aprovada e usada em Estrutura); `doc/VISUAL-DIRECTION.md` registra direitos de foto/logo PETRONAS não confirmados. Trocar por foto específica do case quando houver.
- Copy QA-075 usa "Nelson Piquet Jr."; o card do piloto diz "Nelsinho Piquet Jr." (decisão de nomenclatura do time).
- Regeneração do plano: o script de geração vive no scratchpad da sessão; edições futuras podem ser feitas direto neste arquivo.


---

## SPRINT 02 — VISUAL / CONTEÚDO

Sprint 01 aprovada e congelada. Referência = texto exato do registro na planilha + evidência (EV) correspondente; a solicitação mais recente do time prevalece. Sem novas seções, sem alongar a página. Agentes só analisam/retestam; edição só do coordenador. Status: **MAPA** (antes de editar).

### A. IDs que serão trabalhados

| ID | Pedido original (planilha) | Problema atual | Solução proposta | Critério de aceite |
|---|---|---|---|---|
| QA-071 | Retirar a indicação ROLE (EV-14) | `<p class="hero__scroll">Role</p>` vertical no hero (desktop) | Remover elemento + CSS `.hero__scroll` | Ausente em desktop/celular, sem espaço residual, nav e hero intactos |
| QA-072 | Centralizar a chamada de palestras (EV-16) | Título "O que eles aprenderam correndo…" em 2 colunas, 5 linhas, alinhado à esquerda | Bloco de 1 coluna centralizado, `text-wrap:balance` | Centralizado 1440→320, sem quebra ruim |
| QA-073 | Excluir o parágrafo lateral "Esses nomes também levam…" | Parágrafo ao lado do título | Remover parágrafo + CSS; fechar o vazio | Parágrafo ausente, sem espaço vazio, nota de agenda (QA-075) preservada |
| QA-074 | Trocar descrição da equipe pelo texto do time | Texto antigo ("marketing, eventos, design…") | Texto exato: “Mais de 50 profissionais! Engenheiros, mecânicos, audiovisual, atendimento, eventos e marketing trabalhando nos bastidores de cada projeto.” | Completo, legível, sem corte (320→1440). Validação factual segue em QA-040 |
| QA-075 (ajuste) | Nomenclatura pública "Nelsinho Piquet Jr." (ordem do coordenador do projeto, Sprint 02) | Frase da nota usa "Nelson Piquet Jr." | Trocar só o nome na frase; resto da copy idêntica | Única ocorrência editorial corrigida; card/alt já corretos |
| QA-004 | Remover a caixa de prévia social (EV-18), sem preencher textos provisórios | Painel com 4 prévias, textos "pendente" | Remover `#redesPainel`, `js/redes-preview.js` e CSS associado; manter os 4 links e a galeria | Nenhum texto provisório no DOM; links intactos |
| QA-005 | Painéis inativos fora da árvore acessível | 4 painéis lidos por leitor de tela (opacity:0) | Resolvido pela remoção do painel (QA-004); tirar `aria-controls` órfão; nomear a lista de links | Árvore: título, handle e lista de 4 links; sem `aria-live` |
| QA-030 | Card do feed ↔ publicação (ou renomear como galeria) | 8 cards linkam ao perfil, legendas hard-coded que parecem posts recentes | Renomear como galeria (aria-label do bloco/links); API mantida para permalinks reais quando configurada | Bloco não promete "publicações recentes" específicas |
| QA-020 | Explicitar o canal no CTA / ajustar promessa | Lead promete "o time comercial entra em contato" sem canal | Lead: “…o time comercial responde pelo WhatsApp.” (sem prazo). Rótulos dos CTAs **não** mudam (hierarquia de CTAs preservada) | Canal explícito; sem promessa de SLA. Rótulo do CTA principal = decisão humana |
| QA-062 | Indicar rolagem horizontal dos logos (mobile) | Imagem única 792px em contêiner de 375px, sem indício claro | Fade na borda direita + região focável por teclado com `aria-label`; sem texto novo | Continuidade visível em 320–767, foco por teclado, desktop intacto |
| QA-008 | Separar áreas de toque dos indicadores (44×44) | Alvos de 36px que se sobrepõem | Caixa de toque 44×44 sem sobreposição, disco de 8px mantido; compensar altura | Alvos ≥44 sem interseção; não aumenta a página |
| QA-064 | Medir/corrigir contraste do "02" vermelho sobre foto | Medido: 1,1–2,3:1 em 1024–1440 (falha) | Reforçar scrim inferior de `.frentes__media::after` (foto preservada) | ≥3:1 (texto grande) na média nos 3 desktops |
| QA-079 | Simplificar a seção Team Building (destacar a pilha de 5 cards); **submeter proposta ao time** | Dois títulos do mesmo tamanho, texto redundante sobre o vídeo, cards em tiras 4:1 | Proposta CSS-first, reversível: título do vídeo menor, eyebrow redundante oculto, mais respiro entre cards, cards de tablet menores; 5 cards + CTA preservados | Menos competição de tipografia, seção não mais alta. **Aguarda aprovação visual do time** |
| QA-080 | Rosto de Átila cortado no card Comunicação | `object-position` 50% 50% corta o rosto | `.experiencias__card:nth-child(3){--foco:100% 30%}` | Rosto inteiro em tiras desktop e cards mobile |
| QA-060 | Botão de som sobre o texto (Legado) | Corrigido na Sprint 01 (controles no canto superior) | Apenas confirmar (retest PASS do agente: 320/375/390) | Sem interseção |
| QA-066 | Preferir caixa normal no HTML do título Legado | "LEGADO NÃO FICA PARADO." em maiúsculas literais | Texto em caixa normal; `text-transform:uppercase` já vem do CSS global — visual idêntico | Aparência inalterada |

### B. Continuam BLOCKED (sem improviso)
QA-053 (foto do espaço físico), QA-054 (mosaico + Caio), QA-077 (retratos oficiais).

### C. DEFERRED nesta rodada (motivo)
- Fora de escopo por instrução: QA-027 (acessibilidade), QA-006/007/029 (a11y semântica), QA-043/052 (legendas/leitor de tela), SEO (009–012, 015, 058, 059, 063, 068–070), QA-047/048/050/055/056 (performance/analytics — **vídeo Bastidores ~24 MB → Sprint de Performance**), QA-019/031/038/039/061 (dispositivo/lead real).
- Decisão humana: QA-022 (microcopy WhatsApp, comercial), QA-023 (titularidade WhatsApp), QA-040 (números/fatos), QA-042 (privacidade), QA-065 (ordem/rótulos do menu — menu preservado).
- **PETRONAS:** imagem reaproveitada (`estrutura-espaco-motor`) permanece como solução **TEMPORÁRIA**; ideal = asset específico do case quando a equipe fornecer. Segue como CASE HISTÓRICO, nunca parceria atual.

### D. RESULTADOS — Sprint 02 (execução + reteste em paralelo)

Reteste: 320×740, 375×812, 390×844, 768×1024, 1024×768, 1180, 1280, 1440×900. Sem overflow horizontal em nenhuma; sem colisão de texto; sem texto <11 px novo; nenhuma seção mais alta que antes (só o mosaico cresce 26–60 px pelo texto novo); console: apenas o `GET /api/instagram-feed` 404 do servidor estático local (baseline). Sprint 01: sem regressões (CTAs, menu, vídeos/controles, tokens de contraste, Caterham, alts, srcset/AVIF, landmarks, âncoras, 249 URLs locais = 200).

| ID | Status | O que mudou |
|---|---|---|
| QA-071 | **FIXED · RETEST PASS** | `Role` vertical do hero removido (HTML + CSS `.hero__scroll`). |
| QA-072 | **FIXED · RETEST PASS** | Chamada de palestras centralizada (1 coluna, `text-wrap:balance`, 3 linhas). Retest achou deslocamento de +46/53 px a partir de 768 px (recuo assimétrico do eixo); corrigido e remedido: centro = centro do viewport em 320→1440. |
| QA-073 | **FIXED · RETEST PASS** | Parágrafo lateral removido; sem vazio. Nota de agenda (QA-075) preservada. |
| QA-074 | **FIXED · RETEST PASS** | Texto exato do time aplicado; sem corte (320→1440). Veracidade do número segue em QA-040. |
| QA-075 (ajuste) | **FIXED · RETEST PASS** | "Nelson" → "Nelsinho Piquet Jr." (única ocorrência editorial; card/alt/slug já usavam). Copy restante idêntica. |
| QA-004 | **FIXED · RETEST PASS** | Caixa de prévia removida (`#redesPainel`, `js/redes-preview.js` apagado, imports e CSS). Sem textos "pendente". Bônus: links sociais abriam só no 2º toque no celular (o JS dava `preventDefault`); agora 1 toque. |
| QA-005 | **FIXED · RETEST PASS** | Painéis fora do DOM/árvore de acessibilidade; sem `aria-live`; `aria-controls` órfão removido; lista de redes nomeada. Árvore: título, handle, lista de 4 links. |
| QA-030 | **FIXED · RETEST PASS** | Bloco renomeado como galeria (aria-label não diz mais "Publicações recentes"). API mantida: permalinks reais entram quando `IG_*` estiver configurado na Vercel. |
| QA-020 | **FIXED · RETEST PASS (parcial)** | Lead do CTA final agora diz o canal: "…o time comercial responde pelo WhatsApp." (sem prazo). Rótulos dos CTAs não mudaram → **decisão humana** sobre trocar o rótulo do CTA principal. |
| QA-062 | **FIXED · RETEST PASS** | Faixa de logos (mobile): borda direita esmaecida + região focável por teclado com `aria-label`; foco visível; ≥1024 sem máscara. |
| QA-008 | **FIXED · RETEST PASS** | Indicadores: caixas de toque 44×44 sem sobreposição (disco de 8 px mantido); compensação de margem. Teste em celular real pendente (QA-039). |
| QA-064 | **FIXED · RETEST PASS (visual)** | Scrim inferior do Ecossistema reforçado (≥1024). Medição do agente com o mesmo gradiente: contraste médio do "02" 4,1–4,7:1 (era 1,1–2,3); 1280 marginal na cauda clara (p90 2,9:1). Foto ainda vívida no topo; levemente mais escura embaixo. |
| QA-080 | **FIXED · RETEST PASS** | Card Comunicação: `--foco:100% 30%` — rosto de Átila inteiro nas tiras desktop e nos cards mobile (320/390/768/1024). Nota: no desktop o rótulo "COMUNICAÇÃO" fica sobre o banner do telão (já era assim). |
| QA-079 | **FIXED (proposta) · RETEST PASS visual · AGUARDA APROVAÇÃO DO TIME** | CSS-first e reversível (apagar o bloco `QA-079` em `components.css` restaura): eyebrow repetido sobre o vídeo oculto, título do vídeo menor (`--t-l`), gap 4 px entre os 5 cards, numeração em cinza, cards de tablet 46vw (−307 px a 768). 5 cards, lead e CTA preservados. A planilha exige submeter a proposta ao time antes do aceite final. |
| QA-060 | **RETEST PASS (fechado)** | Resolvido na Sprint 01 (controles no canto superior + reserva de coluna); sem interseção em 320/375/390. |
| QA-066 | **FIXED · RETEST PASS** | HTML em caixa normal ("Legado não fica parado."); visual idêntico (uppercase global do CSS). |

**BLOCKED (inalterados, sem improviso):** QA-053, QA-054, QA-077.

**DEFERRED:** QA-027 (skip-link → foco em `main`), QA-006/007/029, QA-043/052, SEO/analytics/Lighthouse/headers (009–012, 015, 047, 050, 055, 056, 058, 059, 063, 068–070), dispositivo físico (019, 031, 038, 039, 061), decisão humana (022, 023, 040, 042, 065). **Vídeo de Bastidores ~24 MB → Sprint de Performance (QA-048).** PETRONAS: imagem reaproveitada segue TEMPORÁRIA; trocar por asset específico do case quando a equipe enviar; continua CASE HISTÓRICO.

**Observação (não regressão, não corrigida):** após navegar pelo menu móvel a `#pilotos`, um `wheel` em (195,300) rolou 0 px enquanto em (195,700) rolou 300 px — algum elemento da seção Pilotos pode capturar o gesto. Também ocorre sem o menu (`location.hash`). Registrar para a Sprint de acessibilidade/teclado.

**Alt removido:** "Pit lane da Scuderia Bandeiras e Caterham Motorsport Brasil em dia de evento" (imagem do painel de prévia excluído). Nenhum outro alt alterado.

### E. Arquivos alterados na Sprint 02
`index.template.html`, `index.html` (regenerado), `css/components.css`, `js/main.js`, `js/redes-preview.js` (**removido**). Screenshots antes/depois em `qa/sprint02-screens/` ("antes" = HEAD original, anterior também à Sprint 01).

### F. Desbloqueio pós-Sprint 02 — insumos recebidos em 30/09/2026 (reteste focalizado)

Reteste em 390×844, 768×1024, 1024×768, 1440×900 (+1280/1536/1920 informativo): crop, proporção, qualidade, srcset/AVIF, distorção, overflow e leitura da composição.

| ID | Status | Resultado |
|---|---|---|
| QA-053 | ~~BLOCKED~~ → **RETEST PASS — PENDENTE APROVAÇÃO HUMANA DO ENQUADRAMENTO/PESSOAS** | Painel 01 do Ecossistema usa `imagem-scuderia-complexo.png` (fachada com logo, pátio, mural), slug `eco-espaco-scuderia` (480/800/1280/1920, AVIF + JPEG, todos 200), `object-fit: cover`, sem distorção, sem overflow, alt novo. Logo e fachada íntegros em todas as larguras; mural inteiro em 390/768, cortado à direita em 1024–1440 (aceitável). Correspondência com o pedido: foto real do espaço físico. |
| QA-054 | ~~BLOCKED~~ → **RETEST PASS — PENDENTE APROVAÇÃO HUMANA DAS PESSOAS PRESENTES NOS MOSAICOS** | Esquerda = `Mosaico 1.png`, direita = `Mosaico 2.png` (novo slug `time-mosaico-foto-2`, 480/800/1280 AVIF + WebP, todos 200; hashes dos arquivos batem com o manifest). Metades diferentes (pixel hash distinto), sem repetição, sem distorção. Proporção oficial (6×5) visível: **100% em ≥1440 px, ~90% em 1280, ~80% em 1180, ~65% em 1024** (limite de espaço lado a lado); faixa superior no mobile/tablet (mantém a página curta). Causa do corte que o time apontou: flancos com altura fixa + `cover`; agora altura = a do mosaico inteiro e painel central compactado. Bug achado no reteste e corrigido: CTA cortado em ≥1440 px (`nowrap` antigo) — removido; CTA dentro do painel de 390 a 1920 px. `sizes` dos flancos ajustado para 38vw (evita subamostragem). |
| QA-077 | **BLOCKED — AGUARDANDO RETRATOS OFICIAIS DOS PILOTOS** | Sem retratos oficiais aprovados; nada foi improvisado nem gerado. |

**Dependem de decisão humana (não de código):** Caio confirmar que aparece nos retratos e aprovar local/enquadramento da foto do espaço; aceitar as pessoas que aparecem nos dois mosaicos.

**Nomenclatura oficial:** "Nelsinho Piquet Jr." é a grafia editorial oficial do site (a planilha QA-075 ainda diz "Nelson"; prevalece a determinação da Sprint 02).

**Bug adicional resolvido (achado no reteste focalizado):** CTA "Crie um projeto com a Scuderia" do mosaico ficava cortado em ≥1440 px (regra `white-space:nowrap` antiga + painel mais estreito). Corrigido; o CTA fica dentro do painel de 390 a 1920 px, sem overflow. **RESOLVIDO.**

Arquivos: `scripts/build-media.py`, `assets-build/manifest.json` (+2 entradas), `assets-build/img/eco-espaco-scuderia-*` e `time-mosaico-foto-2-*`, `index.template.html`, `index.html`, `css/components.css` (bloco `.time-mosaico`).

### G. Fechamento formal da Sprint 02
**SPRINT 02 FECHADA** em 30/09/2026. Pendências exclusivamente humanas: aprovação de Caio/time (QA-053, QA-054, QA-079) e retratos oficiais (QA-077). DEFERRED conforme seção C. Nenhuma alteração adicional da Sprint 02 será feita.

---

## SPRINT 03 — ACESSIBILIDADE E INTERAÇÃO

Sprints 01 e 02 congeladas. Regra: corrigir comportamento/acessibilidade **sem redesenhar** — sem mudar composição aprovada, copy, imagens, arquitetura ou espaçamento por preferência. Só HTML semântico, foco, teclado, ARIA, skip-link, reduced-motion e controles. Agentes só inspecionam/retestam; edição só do coordenador. O que exige dispositivo físico, VoiceOver ou NVDA fica **NEEDS REAL DEVICE / MANUAL TEST** (sem simular aprovação). Status: **MAPA** (antes de editar).

### A. Itens que serão trabalhados

| ID | Problema (medido pelos agentes) | Solução proposta | Critério de aceite |
|---|---|---|---|
| **QA-027** (P1) | (1) `<main>` sem `tabindex="-1"`: o skip-link muda o hash mas `activeElement` fica em `BODY`. (2) Anel de foco **cortado** em `video` nativo de Conteúdo e nos 8 `.conteudo__feed-link` (no mobile, sem indicador algum). (3) Navbar `.is-hidden` segue escondida enquanto recebe foco (foco em link invisível). (4) Foco no vídeo de Conteúdo fica sob a navbar fixa (sem `scroll-margin`). (5) Pilotos mobile: Tab nos cards 2/4 deixa o card ~75% fora da tela. (6) Rolagem "travada" ~4 s após o load sobre a faixa de Pilotos (overflow vertical de 24 px da faixa por causa do `translateY` do reveal). | (1) `tabindex="-1"` em `main` + `main:focus{outline:none}`. (2) `outline-offset:-3px` nesses dois alvos. (3) `.nav.is-hidden:focus-within{transform:none}` (+ `focusin` remove `is-hidden`). (4) `scroll-margin-top` só nos focáveis de `main` (não `scroll-padding` global: deslocaria as âncoras aprovadas). (5) foco → `scrollIntoView` inline center. (6) `overflow-y:hidden` nas faixas horizontais (`.pilotos-time__cards`, `.experiencias__cards`, `.carrossel__track`). | Teclado-only em 1440 e 390: skip-link leva o foco a `main`; todo foco visível (diff de pixels ≠ 0); foco nunca fica em elemento oculto/coberto; sem armadilha; wheel/touch em Pilotos rola a página desde o 1º tick; QA-028 (foco do botão de menu) preservado. |
| **QA-007** (P2) | `role="tablist"` sem `tab`/`aria-selected`/`tabpanel`; estado ativo só por classe. | Padrão "grupo de botões": `role="group"`, `aria-current` no indicador ativo e posição no nome ("Ir para X, n de N"). Não forçar tabs (não há painéis). | Leitor/árvore: nome + posição + estado atual; teclado Tab/Enter/Espaço. |
| **QA-029** (P2) | Bug real no desktop: o track trava no item 3 — bolinhas 5–6 inalcançáveis e "próximo" não dá a volta; sem anúncio de posição; `scrollIntoView` smooth ignora reduced-motion. | `carrossel.js`: estado explícito no clique (lock), `atEnd()` → último, região `aria-live="polite"` só para ação por botão, `behavior:"auto"` em reduced-motion; slides `role=group` "n de N". | Ir/voltar, 1º/último, dots 1–6 alcançáveis em 390 e 1440; sem avanço automático; estado anunciado. |
| **QA-006** (P2) | 10 `<h5>` (4 em Experiências sob H3; 6 em Bandeiras sob H2). | `<h3>` nos 10 + `line-height:1.5` em `.card h3` (preserva o visual exato do h5). | Outline sem saltos; aparência idêntica (medir altura dos cards antes/depois). |
| **QA-038** (P1) | Zoom real 200%/400% **PASS** (640 e 320 px sem reflow quebrado). Texto-só 200%: `.section-head` estoura (390/320) e `.legado__frame` (<1024) corta texto. Nav com breakpoints em px quebra com texto grande. | `.section-head > :not(.section-head__index){min-width:0}`; `.legado__frame` mobile como grid (mesmo tamanho no zoom normal). Nav px→em: **não aplicar** (não validável aqui). | 320 px e texto 200% sem overflow/corte nesses dois pontos; aparência normal idêntica. Zoom nativo real do navegador = **NEEDS REAL DEVICE / MANUAL TEST**. |
| Interação (achados) | Sound toggle anuncia "Silenciar vídeo, pressionado" (label mutável + `aria-pressed`); pause toggle usa `video.paused` (anuncia "Reproduzir" fora de tela); `article.piloto-card[tabindex=0]` sem nome; `section.transicao aria-label="Transição"` sem valor; botão de menu sem `aria-expanded`; scroll-spy nunca limpa `aria-current`; `ul.experiencias__cards` focável sem nome. | Label estático + `aria-pressed`; label do pause por intenção do usuário; `aria-labelledby` nos cards; remover label "Transição"; `aria-expanded` sincronizado; limpar `aria-current` ao sair das seções; `role="region"` + `aria-label` na faixa de Experiências. | Árvore de acessibilidade coerente; nomes únicos e sem dupla codificação de estado. |
| Reduced-motion | Rede de segurança global não cobre `::before/::after` (`piloto-card__media::after` mantém 0,36 s) nem `iteration-count`. | `*,*::before,*::after{…iteration-count:1…}` dentro de `@media (prefers-reduced-motion: reduce)`. | Em reduce: 0 animações e nenhuma transição em pseudo-elementos; look normal inalterado. |
| **QA-043** (P2) | Sem `<track>`. Bastidores (depoimentos) e Legado (provável narração) têm fala; Experiências sem áudio; Bandeiras provável trilha. | Só o que não exige conteúdo novo: `aria-describedby` ligando o vídeo de Bastidores à legenda visível. **Legendas WebVTT = NEEDS CONTENT** (Will/cliente). | Vínculo legenda↔vídeo presente; QA-043 **não** fecha até haver WebVTT. |

### B. NEEDS REAL DEVICE / MANUAL TEST (sem simulação de aprovação)
QA-052 (VoiceOver/NVDA), QA-039 (Safari iOS / Chrome Android físicos), zoom nativo real do navegador (QA-038 parte final), toque real em Pilotos (a emulação CDP foi inconclusiva), Nav com fonte-padrão aumentada (validar em Chrome "Very large"/Firefox text-only).

### C. Preservar (não tocar)
QA-003 (pausa dos vídeos), QA-026 (menu), QA-028 (foco do botão de menu), QA-014/044/045 (H1 único, alts, landmarks), tokens de contraste, composição e copy aprovadas.

### D. Fora desta sprint
Performance, SEO, analytics, Lighthouse, headers (rodadas próprias); opcionais registrados e não aplicados: listener de mudança no `cursor-trail`, nomes únicos nos CTAs repetidos, `aria-labelledby` em seções com H2, pausa do zoom do hero, nav em `em`.

### E. RESULTADOS — Sprint 03 (implementação + reteste em paralelo)

Reteste: desktop (1440×900) e mobile (390×844, toque/mobile), **teclado-only** (Tab/Shift+Tab/Enter/Espaço/Esc/setas) e `prefers-reduced-motion`; zoom emulado em 640×400 e 320×740. Verificação de "nenhuma mudança visual": altura/largura de cards, títulos, quadro do Legado, section-head e altura total do documento idênticas antes/depois em 1440/1024/768/390/320.

| ID | Status | O que mudou |
|---|---|---|
| **QA-027** | **FIXED · RETEST PASS** (teclado-only, desktop + mobile, com e sem reduced-motion). Toque real = **NEEDS REAL DEVICE / MANUAL TEST** | Skip-link agora leva o foco a `<main tabindex="-1">` (sem anel); anel de foco visível em TODAS as 73 (desktop) / 68 (mobile) paradas — corrigido o corte no vídeo de Conteúdo e nos 8 links do feed (antes: nenhum indicador no mobile); navbar escondida reaparece quando recebe foco; `scroll-margin-top` só nos focáveis de `main` (âncoras seguem em top≈0; sem `scroll-padding` global); foco nos cards de Pilotos (mobile) traz o card para a área visível; "rolagem presa" sobre a faixa de Pilotos corrigida (`overflow-y:hidden` nas faixas horizontais: a 1ª rolagem já move a página); sem armadilhas, sem tabindex positivo, ciclo fecha em `body`. QA-028 preservado. |
| **QA-007** | **FIXED · RETEST PASS** | `role="tablist"` removido; grupo de botões com `aria-current` (um só `true`), nome com posição ("Ir para X, n de 6"), slides `role=group` "n de 6". |
| **QA-029** | **FIXED · RETEST PASS** (swipe real = manual) | Bug do desktop corrigido (bolinhas 5–6 inalcançáveis e "próximo" que não dava a volta): estado explícito no clique + `atEnd()`. Região `aria-live="polite"` só para ação por botão ("Espaço 5 de 6: …"); swipe/scroll atualiza a bolinha sem anunciar; sem avanço automático; `scrollIntoView` respeita reduced-motion. |
| **QA-006** | **FIXED · RETEST PASS** | 10 `<h5>` → `<h3>`; `line-height:1.5` em `.card h3` preserva o visual. Outline: H1 único, nenhum salto, zero h5; medidas idênticas às de antes. |
| **QA-038** | **PARCIAL — NEEDS REAL BROWSER / MANUAL TEST** | Zoom real equivalente (200% = 640 px; 400% = 320 px): **PASS**. Texto-só 200%: corrigidos `.section-head` (390/320) e `.legado__frame` mobile (cresce com o texto; tamanho normal inalterado: 390×488, 768×960, 320×400). **Não corrigido/não validável aqui:** (a) 320 px + texto 200% ainda estoura por `.hero__body`/`.frentes__painel` (combinação extrema); (b) espaçamento de texto (1.4.12) a 320 px ainda estoura por `.piloto-card`; (c) nav desktop em 1280 com texto 200% (breakpoints em px; migrar para `em` exige teste em navegador real). Zoom nativo do navegador e fonte-padrão grande: **NEEDS REAL DEVICE / MANUAL TEST**. |
| **QA-043** | **NEEDS CONTENT** (não fecha) | Só o que não exige conteúdo novo: vídeo de Bastidores ligado à legenda visível por `aria-describedby`. Auditoria de áudio: Bastidores (depoimentos) e Legado (provável narração) têm fala → precisam de legendas **WebVTT** (Will/cliente); Experiências sem áudio; Bandeiras provável trilha. Nada foi inventado. |
| **QA-052** | **NEEDS REAL DEVICE / MANUAL TEST** | VoiceOver/NVDA não simulados. A árvore de acessibilidade foi inspecionada por script (nomes, papéis, estados coerentes). |
| **QA-039** | **NEEDS REAL DEVICE / MANUAL TEST** | Safari iOS / Chrome Android físicos e matriz de navegadores. |
| Achados de interação | **FIXED · RETEST PASS** | Sound toggle: rótulo estático "Som do vídeo" + `aria-pressed` (sem dupla codificação); pause toggle: rótulo por intenção do usuário (não anuncia "Reproduzir" quando o IntersectionObserver pausa fora da tela); `article.piloto-card` com `role=group` + `aria-labelledby`; `aria-label="Transição"` (landmark sem valor) removido; botão de menu com `aria-expanded` sincronizado (inclui Escape); scroll-spy limpa `aria-current` ao voltar ao hero; faixa de Experiências (mobile) com nome. |
| Reduced-motion | **FIXED · RETEST PASS** | Rede de segurança global agora cobre `::before/::after`, `iteration-count` e delays; 0 animações em reduce (incl. pseudo-elementos); movimento normal intacto (1 animação infinita: `hero-bg-respira`; reveals animam; carrossel suave). |

**Regressões:** nenhuma (Sprints 01–02 intactas; landmarks, H1, alts — 41 —, menu, vídeos/pausa, contraste e CTAs verificados). As diferenças de alt em relação ao HEAD são as mudanças intencionais das Sprints 01–02.

**Arquivos alterados (Sprint 03):** `index.template.html`, `index.html` (regenerado), `css/base.css`, `css/components.css`, `js/carrossel.js`, `js/pilotos.js`, `js/motion.js`, `js/nav.js`, `js/video-sound-toggle.js`.

**Opcionais registrados e NÃO aplicados:** listener de mudança no `cursor-trail`, nomes únicos nos CTAs repetidos, `aria-labelledby` nas seções com H2, pausa para o zoom do hero (WCAG 2.2.2, movimento sutil já desligado em reduce), nav em `em`.

### F. Fechamento da Sprint 03
**SPRINT 03 CONCLUÍDA** (fechamento formal em 30/09/2026). Itens mantidos como **MANUAL / REAL DEVICE** (sem emulação adicional, sem legendas inventadas):
- **QA-052** — VoiceOver / NVDA — **MANUAL / REAL DEVICE**.
- **QA-039** — Safari iOS / Chrome Android físico — **MANUAL / REAL DEVICE**.
- **QA-038** — validação final de zoom / text spacing em navegador real — **MANUAL / REAL DEVICE**.
- **QA-043** — **AGUARDANDO ARQUIVOS REAIS DE LEGENDA / WebVTT** (Will/cliente).
Itens opcionais registrados na seção D/E **não** foram aplicados e permanecem fora de escopo.

---

## SPRINT 04 — PERFORMANCE E CARREGAMENTO

Sprints 01–03 fechadas. Regra: só ganho **mensurável**; sem mudar copy, layout, hierarquia, crops, assets aprovados, acessibilidade corrigida nem comportamento visual. Originais preservados (`assets/Imagens/novos-assets/pessoas.mp4` 496 MB e `assets/videos/pilotos/Ingo_*.mp4` 454 MB ficam intocados; novas versões são geradas **a partir deles**, nunca recomprimindo arquivo já comprimido). Agentes só auditaram/medem; edição só do coordenador. Status: **MAPA** (antes de editar).

### A. IDs da planilha relacionados a performance
| ID | Situação na planilha | Tratamento nesta sprint |
|---|---|---|
| **QA-048** (P2) | Peso dos vídeos (Legado 12,7 MB desktop / 4,3 MB mobile; Complexo 5,9 MB) — "definir orçamento de mídia, carregar perto da viewport, otimizar variantes" | Reduzir Bastidores (25,5 MB), Legado desktop; `preload` sob demanda; posters leves. |
| **QA-050** (P2) | Lighthouse / Core Web Vitals / rede móvel não medidos | Baseline antes × depois (Lighthouse mobile e desktop + Playwright com throttling). INP não é mensurável headless → declarado. Dados de campo = produção. |
| **QA-047** (P1) / **QA-056** (P1) | Hero disponível / atraso de entrada (relato de 4–5 s) | Medir (hero opacity 1 e FCP/LCP, filmstrip). Sem alterar a animação aprovada; atacar só as causas de atraso reais (fonte/CSS bloqueantes). |
| **QA-049** (validado) | Formatos/srcset de imagens | **Preservar** AVIF/WebP/srcset; corrigir apenas `sizes` incorreto. |
| **QA-061** | Área preta no vídeo móvel (intermitente) | Teste manual/dispositivo — não tocar. |

### B. Problemas, causa, solução e critério (todos medidos pelos agentes)

| # | Problema (medido) | Causa provável | Solução proposta | Critério de aceite |
|---|---|---|---|---|
| P1 | **Bastidores 25,5 MB** (1280w) para um quadro de 636×358 (desktop) / 358×201 (mobile); sem variante mobile. | Encode único (2,1 Mbps); `pessoas.mp4` 4K disponível como fonte. | Reencode **da fonte 4K**: desktop 1280 CRF 28 maxrate 1800k AAC 96k estéreo (≈16,5 MB, VMAF ≈91 vs 95,5 atual; testado, indistinguível nos frames) + mobile 720 CRF 28 maxrate 1000k AAC 64k mono (≈7,9 MB). `<source media>` por largura; faststart; `preload="metadata"` mantido. Original preservado. | −35% desktop / −69% mobile; ffprobe + VMAF + frames lado a lado; vídeo toca, pausa, busca, chega ao fim; legenda/aria preservados. |
| P2 | **Posters eager (867 KB)**: `pessoas-poster.jpg` 3840×2160 540 KB; `legado-ingo-poster.jpg` 228 KB — baixados no load mesmo 4–11 mil px abaixo. | `poster` não é lazy; arquivos superdimensionados. | Mesmos enquadramentos, novos tamanhos: pessoas 1280w (~79 KB) e legado 1440w (~70 KB). | −~560 KB no load; posters idênticos ao olho; sem flash preto. |
| P3 | **Vídeos fora da dobra baixam no load** (desktop 11,7–14,6 MB; mobile ~10,3 MB) — `autoplay` anula `preload`. | Chromium trata `autoplay` como `preload=auto`. | Remover `autoplay` **do HTML** dos 3 vídeos de fundo e `preload="none"`; o IntersectionObserver existente já chama `play()` (mantém o autoplay aprovado na tela); observer extra com `rootMargin:600px` antecipa o download; pausa/retomada e reduced-motion da Sprint 03 intactos. | Bytes de vídeo no load ≈ 0; ao entrar na tela o vídeo toca igual; pausa manual persiste; reduced-motion não inicia; sem flash preto (poster até o 1º frame). Sem-JS: fica o poster (aceito; o controle de pausa já é JS). |
| P4 | **Legado desktop 12,7 MB** (1920w) para quadro 1440×720. | Resolução acima do necessário. | Variante 1440w CRF 25 maxrate 2800k (≈5,6 MB, VMAF@1440 93 vs 96,6) **da fonte original**, mesmo corte/tempo; mobile 720w (4,3 MB) mantido. | −56% desktop; frames comparados; crop idêntico. |
| P5 | **`sizes` incorreto**: 6 `<source>` do feed sem `sizes` (100vw → 800/1280w em caixa de ~180–350 px); case PETRONAS 58vw (real 44vw/92vw); cards de Estrutura 30vw/78vw (real 25vw/34vw/60vw); Princípios sub-dimensionado no desktop; Escopo 90vw (real 79vw). | `sizes` copiado de layouts antigos; `<source>` ignora `sizes` do `<img>`. | Corrigir `sizes` (valores medidos no DOM). Sem trocar arquivos, crops ou srcset. | Navegador escolhe arquivo ≥ pixels necessários e ≤1,25× (por viewport 390/768/1024/1440, DPR1/2/3); economia medida (≈170–600 KB por visita). Nenhuma imagem borrada. |
| P6 | **Fontes**: CSS do Google Fonts bloqueia render (~890 ms simulado), woff2 descobertos tarde; **CLS 0,07** intermitente pela troca de fonte (fallback ≠ métrica); IBM Plex pedido e nunca usado. | Fonte hospedada em terceiro + `display=swap` sem fallback ajustado. | Self-host de 3 woff2 latin (Special Gothic Condensed One, Inter variável, JetBrains Mono 400) em `assets-build/fonts/` + `@font-face` local `font-display:swap` + `<link rel=preload>` dos 2 críticos; remover Google CSS e IBM Plex. | LCP/FCP ≤ baseline; CLS ≈ 0 em runs repetidos; 0 requisições de terceiros; aparência tipográfica idêntica (screenshots); caracteres PT-BR ok. |
| P7 | **JS morto**: `scrollseq.js` e `caterham.js` (sem markup correspondente) carregados (2 requests, 9,5 KB). | Restos de seções removidas. | Remover só o `import`/chamada em `main.js` (arquivos ficam no disco, não refatorar). | −2 requests; nenhum erro de console; nenhuma funcionalidade perdida (markup inexistente confirmado). |
| P8 | **Comentários/whitespace no caminho crítico**: CSS 121 KB raw / ~31,8 KB gzip (33,8 KB de comentários só em components.css); HTML com 26 comentários (15,6 KB raw). | Fonte documentada servida sem etapa de build. | Etapa de build: `build-html.py` remove comentários HTML; novo `build-css` gera CSS comprimido (remove comentários/whitespace, sem reescrever regras). Fontes comentadas permanecem no repositório. | CSS gzip ↓ ~15–20 KB; HTML gzip ↓ ~6 KB; **computed styles e screenshots idênticos** (diff de pixels = 0); nenhum seletor alterado. |
| P9 | `/api/instagram-feed` já envia `s-maxage=3600` (verificado). | — | Nada a fazer. | — |

### C. Registrado e NÃO aplicado (sem ganho mensurável suficiente ou não verificável localmente)
- `vercel.json` com `Cache-Control: immutable` para `assets-build/img/*-<hash>.*` (372 de 390 arquivos têm hash): **recomendado, mas só validável em produção** — não criado nesta sprint (produção).
- Loop `requestAnimationFrame` ocioso do `cursor-trail` (≈3% de um núcleo no desktop): ganho pequeno; não alterar comportamento aprovado.
- Preload da imagem do hero (LCP é o H1, não a imagem); bundle/modulepreload (1 RTT, baixo).
- Remover órfãos de `assets-build/img` (152 arquivos, 14 MB, só peso de repositório/deploy — sem impacto de banda); CSS órfão `.palestras*` etc. (~1,9 KB gzip — a etapa P8 já cobre o grosso).
- Legado mobile 720w e Bandeiras 848w: adequados; AVIF para posters (compat.).
- Dados de campo / CrUX / Lighthouse em produção real, INP real: **produção**.

### D. RESULTADOS — Sprint 04 (implementação + reteste em paralelo)

**Método/limites:** medição em servidor local "tipo Vercel" (gzip/brotli, Range, cache), Lighthouse 13 + Playwright (Fast 4G, CPU 4×). **Localhost: sem CDN/HTTP2/latência real** — valores absolutos são indicativos; vale o delta. INP não é mensurável headless (aproximado por latência de clique). Antes = 3 execuções; depois = 5. Nada de dado de campo (produção).

| ID | Status | Resultado |
|---|---|---|
| **QA-048** | **FIXED · RETEST PASS** | Bastidores 25,5 → **16,5 MB** (desktop 1280, −35%) e **7,9 MB** (mobile 720, −69%, antes inexistente), codificados **do original 4K** (VMAF ≈91 vs 95,5; frames indistinguíveis; áudio preservado; faststart; 90,11 s). Legado desktop 12,7 → **5,35 MB** (1440w, −58%; mesmo trecho: PSNR 44 dB vs o anterior). Posters: Bastidores 540 → 97 KB; Legado 228 → 94 KB. Vídeos de fundo: **0 bytes no load** (antes 1,1 MB mobile / 1,9 MB desktop no load; Lighthouse total 8,9/14,0 MB → 0,78/0,70 MB). Play continua ≤ 0,33 s após entrar na tela, sem quadro preto. Bastidores: 0 MB no load (metadados só a 600 px da viewport). |
| **QA-050** | **MEDIDO (local) — dados de produção PENDENTES** | **Lighthouse mobile 73 → 87 · desktop 97 → 100.** Mobile: FCP 2,98 → 1,21 s; Speed Index 3,03 → 1,21 s; CLS 0; TBT 0; transferência 8,9 → 0,78 MB; requests 46 → 38; terceiros: Google Fonts → nenhum. LCP simulado mobile = 3,99 s (elemento virou `p.lead`; **artefato da simulação** — LCP observado 0,18–0,35 s sem throttling e ~1,0 s com Fast 4G + CPU 4×). Desktop: FCP 919 → 325 ms; LCP 1153 → 789 ms. Playwright mobile: bytes no load 2,20 → 0,49 MB; FCP=LCP 1472 → 1044 ms; load event 3234 → 1564 ms; TBT≈169 → 52 ms; latência do menu 231 → 142 ms. Desktop (sem throttle): FCP 384 → 240 ms; load 485 → 228 ms; bytes no load 3,05 → 0,52 MB. |
| **QA-047 / QA-056** | **MEDIDO — hero disponível ≈0,56 s (mobile throttled) / 0,16 s (desktop)** | Título+CTAs com opacity 1 em 613 → 565 ms (mobile) e 181 → 159 ms (desktop); primeira pintura mais cedo (~1,0 s vs 1,5 s) por sair o CSS bloqueante de terceiro. Filmstrip: hero completo já no 1º frame (~1,2 s); antes, em ~2,3 s o título ainda estava esmaecido e sem CTAs. A animação aprovada não foi alterada (o tempo de "visível" é definido por ela). **Relato de 4–5 s não reproduzido.** Validar em rede real/aparelho (produção). |
| **QA-049** | **PRESERVADO** | AVIF/WebP/srcset intactos; só `sizes` corrigido: −26% a −44% de imagem por visita (ex.: 390@3 −833 KB, 768@1 −954 KB, 1440@2 −1,0 MB). Sem perda de nitidez (conferido a DPR 2). |
| **QA-061** | **MANUAL / REAL DEVICE** | Não tocado. |

**Mudanças de carregamento (todas sem alterar visual):**
1. **Fontes hospedadas** (`assets-build/fonts/`: Special Gothic Condensed One, Inter variável, JetBrains Mono 400; mesmos glifos — 0 pixels de diferença) + preload dos 2 críticos; removido o CSS do Google (bloqueava render ~890 ms simulados) e IBM Plex (nunca usada). CLS intermitente 0,07 (troca de fonte) → 0 em 5/5 execuções (não prova definitiva).
2. **CSS/HTML:** `scripts/build-css.py` gera `css/site.min.css` (3 folhas em 1 request; só remove comentários/espaços): 121 → 66 KB (gzip 31,7 → 12,0 KB). `build-html.py` tira os 26 comentários do HTML público: 94 → 79 KB. **Paridade provada:** 685 elementos × todas as propriedades computadas + pseudo-elementos = 0 diferenças; screenshots 390/768/1024/1440 = 0 pixels diferentes.
3. **Vídeos:** `autoplay` removido do HTML + `preload="none"`; o IntersectionObserver existente continua dando `play()` ao entrar na tela (autoplay aprovado mantido), com pré-carga 600 px antes; pausa/retomada e reduced-motion da Sprint 03 intactos (rótulos verificados).
4. **Imagens:** `sizes` corrigido em 6 `<source>` do feed (sem `sizes` = 100vw), case, cards de Estrutura (inclui gastronomia), Princípios, Escopo e Pilotos.
5. **JS morto:** `scrollseq.js` e `caterham.js` deixam de ser importados (−2 requests; arquivos permanecem no disco).

**Arquivos novos/alterados:** `assets-build/video/pessoas-bastidores-desktop-1280w.mp4`, `…-mobile-720w.mp4`, `legado-ingo-desktop-1440w.mp4`; `assets-build/img/pessoas-poster-1280w.jpg`, `legado-ingo-poster-1440w.jpg`; `assets-build/fonts/*.woff2` (3); `css/site.min.css`, `css/tokens.css` (@font-face), `scripts/build-css.py` (novo), `scripts/build-html.py`, `index.template.html`, `index.html`, `js/main.js`, `js/video-sound-toggle.js`. O Bastidores antigo de 25 MB foi devolvido a `assets/Imagens/novos-assets/otimizado/pessoas/` (fora do deploy). **Originais preservados** (`pessoas.mp4` 496 MB, `Ingo_*.mp4` 454 MB).

**Regressões:** nenhuma. 256 URLs locais = 200; sem overflow (390/768/1024/1440); console limpo (só o 404 local de `/api/instagram-feed`); CTAs, menu, carrossel, pausa dos vídeos e acessibilidade intactos.

**Achados não corrigidos / registrados:**
- Imagens sem degrau de 320w (logo, feed, pilotos em DPR 1 baixam 480w para caixas de 130–250 px, ~2–3×) e `marcas-historia` com teto em 1280w (pode ficar macia em retina): exigem novos derivados — fora desta sprint.
- `jetbrains-mono-400-latin.woff2` é instância estática 400 (a do Google era variável 400/500): sem impacto hoje (só usado a 400).
- `→` (U+2192) e `✕` (U+2715) renderizam com fonte do sistema, **igual ao antes**.
- Arquivos antigos ainda no disco e no deploy: `legado-ingo-desktop-1920w.mp4` (12,7 MB), posters antigos, `css/{tokens,base,components}.css` (não carregados) e 152 derivados órfãos de imagem (~14 MB): peso de deploy, sem impacto de banda — limpeza opcional.

### E. Precisam de teste em PRODUÇÃO
- Lighthouse/PageSpeed e dados de campo (CrUX, LCP/INP/CLS reais) com CDN e HTTP/2.
- `vercel.json` com `Cache-Control: immutable` para `assets-build/img/*-<hash>.*` (372 de 390 arquivos com hash; 18 sem hash) — **recomendado, não criado** (não validável localmente).
- Comportamento do `/api/instagram-feed` (já envia `s-maxage=3600`) e tempo de resposta.
- Vídeos em rede 4G real / aparelho (Safari iOS: `preload="none"` + `play()` no IntersectionObserver), QA-061.
- Navegadores/dispositivos físicos (QA-039) e nova rodada de Lighthouse após o deploy.

### F. Fechamento da Sprint 04
**SPRINT 04 CONCLUÍDA** (fechamento formal em 30/09/2026):
- **QA-048** — corrigido.
- **QA-050** — medido localmente (produção pendente).
- **QA-047** e **QA-056** — passaram nas medições disponíveis.
- **QA-049** — apenas `sizes`/entrega corrigidos; formatos AVIF/WebP/srcset preservados.
- **QA-061** — permanece para **teste manual em dispositivo**.
- **POLISH FUTURO** (salvo se um teste real mostrar problema visual): degraus de 320w para logo/feed/pilotos e resolução de `marcas-historia` em retina.
Nenhum novo refinamento de performance será feito.

---

## SPRINT 05 — SEO E PRODUÇÃO

Sprint 04 fechada. Regra: **sem mudança visual** (layout, tipografia, copy, imagens, crops, motion, seções aprovadas intactos); só `<head>`, arquivos de raiz e configuração. Domínio oficial = `https://www.scuderiabandeiras.com.br/` (evidência: planilha QA-051 e comportamento vivo: apex → www 307, www 200; nenhum outro domínio no projeto) — **NEEDS HUMAN DECISION D2**: confirmar `www` como canônico antes de publicar. Não simular aprovação: o que depende de CDN, domínio, SSL, Search Console, crawler social, analytics real, CrUX ou dispositivo = **PRODUCTION TEST REQUIRED**. Status: **MAPA** (antes de editar).

| ID | Problema | Estado atual | Solução proposta | Critério de aceite | Validação |
|---|---|---|---|---|---|
| **QA-009** | Sem `og:image`/`og:url`; sem Twitter Card | Só og:title/description/type/locale; **não existe capa social dedicada aprovada** | `og:url`, `og:site_name`, `og:image` (+type/width/height/alt) e `twitter:*` com URL absoluta. Imagem = **derivado 1200×630 JPEG (sem texto nem logo) da foto real já publicada do complexo** (`imagem-scuderia-complexo.png`, recorte 1,905:1, q≈86, ≤300 KB). **GAP VISUAL parcial**: precisa de aprovação do Will/Caio como capa social (mural e patrocinadores visíveis). | Tags absolutas; JPG 1200×630 real; sem AVIF/WebP; nenhuma mudança visual. | Local: parse + dimensões. **PRODUCTION TEST REQUIRED**: WhatsApp, LinkedIn, Facebook Debugger, X. |
| **QA-010** | Sem canonical | Ausente | `<link rel="canonical" href="https://www.scuderiabandeiras.com.br/">` (auto-referência, sem âncora). | Única, absoluta, igual a `og:url`. | Local: parse. **PRODUCTION TEST REQUIRED** (Search Console). D2. |
| **QA-011** | `robots.txt` 404 | Ausente | `robots.txt` na raiz: `Allow: /` + `Sitemap:` absoluto; não bloqueia css/js/assets. | 200 local; nada bloqueado. | **PRODUCTION TEST REQUIRED**. |
| **QA-012** | `sitemap.xml` 404 | Ausente | `sitemap.xml` com a home (sem `lastmod` inventado). | XML válido, URL canônica. | **PRODUCTION TEST REQUIRED** (envio ao Search Console). |
| **QA-015** (P3) | Sem JSON-LD | Ausente | `Organization` **só com fatos do site**: nome, url, `sameAs` (4 redes), endereço do rodapé. **Sem** `telephone` (QA-023 pendente) e **sem** `logo` (só existe AVIF/WebP — D1b). | JSON válido, nenhum dado inventado. | Local: parse. **PRODUCTION TEST REQUIRED** (Schema Markup Validator). |
| **QA-013** | (validado) título, descrição, lang | OK | **Preservar** (title 42 chars, description 99, `lang=pt-BR`, H1 único). | Sem mudança. | Local. |
| **QA-058** | 404 padrão da Vercel (texto cru) | Sem `404.html` | `404.html` na raiz reaproveitando `css/site.min.css`, fontes locais, tokens e classes existentes (zero CSS novo); `noindex`; caminhos **absolutos**; sem JS; "Voltar ao início" + contato (WhatsApp já usado no rodapé). **Copy nova → precisa de aprovação.** | Status 404 preservado; estilo correto em qualquer profundidade (`/a/b/c`); 390/1440 sem overflow; foco visível. | Local (servidor que devolve o 404.html). **PRODUCTION TEST REQUIRED**: `curl -I` em rota inexistente. |
| **QA-069** | `/favicon.ico` 404 | Só PNGs declarados | `favicon.ico` na raiz, montado com os PNGs aprovados 16/32/48 (sem reamostrar); `<link rel="icon" href="/favicon.ico" sizes="any">` antes dos PNGs. **Sem manifest** (sem objetivo PWA). | ICO válido (16/32/48). | Local. **PRODUCTION TEST REQUIRED**: 200 `image/x-icon`. |
| **QA-068** | Link do rodapé aponta ao apex (307) | `https://scuderiabandeiras.com.br` | Mesmo texto visível; `href="https://www.scuderiabandeiras.com.br/"`. | Sem salto de redirect; aparência idêntica. | Local (href). **PRODUCTION TEST REQUIRED**. D2. |
| **QA-059** | Apex → www responde 307 | Configuração de domínio no painel da Vercel | **Não criar redirect em código** (especulativo; risco de loop; QA-051 validado). Ação humana: Project → Domains → redirecionamento permanente. | — | **PRODUCTION TEST REQUIRED / ação humana**. |
| **QA-070** | Faltam headers de segurança | Só HSTS (da Vercel) | `vercel.json` com `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (só o que o site não usa). **CSP não será forçada**: o candidato testado localmente (0 violações) entra só como `Content-Security-Policy-Report-Only`. HSTS não duplicar. | JSON válido; site inalterado com os headers (Playwright). | Local. **PRODUCTION TEST REQUIRED** (Chrome/Safari/Firefox; feed do Instagram ativo). |
| **Cache** (recomendação da Sprint 04) | Sem `vercel.json`; tudo `max-age=0` | 372 de 392 imagens têm hash (calculado sobre o **arquivo-fonte**); 20 sem hash | `immutable` **só** para `assets-build/img/*-<10hex>.(avif\|webp\|jpg)` (regex provada: 372 casam, 20 não). **Salvaguarda**: `build-media.py` ganha `PIPELINE_VERSION` (vazio = hashes atuais inalterados) — mudar qualidade/larguras exige bumpar. Vídeos 1 dia + SWR; fontes 7 dias; favicon 1 dia; `css/` e `js/` 5 min com `must-revalidate` (usam `?v=` manual, **nunca immutable**). | Regex verificada no diretório real; nenhuma regra sobreposta. | Local (regex/JSON). **PRODUCTION TEST REQUIRED**: headers reais, MIME `font/woff2`. |
| **Deploy surface** | `qa/` (14,7 MB, planilha) e `media-kit/` (728 MB) **não** estão no `.vercelignore` (subiriam num `vercel --prod` via CLI); `manifest.json` expõe 54 caminhos-fonte; CSS-fonte comentado ainda servido | Produção hoje responde 404 para `/doc`, `/scripts`, `/qa` (provável deploy via Git) | `.vercelignore` += `qa/`, `media-kit/`, `.vercel/`, `assets-build/manifest.json`, `css/base.css`, `css/components.css`, `css/tokens.css` (não referenciados; o site usa `site.min.css`). Órfãos (`Brand/`, `carros/`, `assets/car/`…) = **decisão humana D5** (não tocar). | Nenhuma URL local referenciada é ignorada. | Local (simulação). **PRODUCTION TEST REQUIRED** (`.vercelignore` honrado). |
| **API Instagram** | `api/instagram-feed.js` sólida (sem vazamento de token), mas: sem timeout; erro e `configured:false` cacheados 1 h; `console.error(err)` pode logar URL com token | 404 local é esperado (servidor estático) | Hardening mínimo: `AbortController` 5 s; cache curto (60 s) quando não há posts; log só `err.name/message`. Front: aceitar `permalink` só de `https://www.instagram.com/…`. **Não** marcar produção como PASS. | Matriz de cenários (sem env, sucesso, 400/429, JSON inválido, timeout, throw) passa; nenhum token na resposta nem no log. | Local (mock). **PRODUCTION TEST REQUIRED**: credenciais reais, validade do token (~60 dias, sem renovação automática), forma real da resposta. |
| **QA-055** (P1) | Sem analytics | Nenhum ID/config no projeto; `cta.js` só dispara se `gtag` existir | **BLOCKED — AGUARDANDO CREDENCIAL/ID** (ferramenta + consentimento/LGPD = decisão humana). Nada de placeholder/snippet. Contrato de eventos documentado (`cta_click {origin,destination}`, `whatsapp_click {origin}`; 9 origens). | Nenhum ID fictício em produção. | **PRODUCTION TEST REQUIRED** quando houver ID. |
| **QA-031** | Perfis sociais não homologados | 4 links respondem (TikTok: curl inconclusivo) | Sem mudança de código; todos com `rel=noopener`. | — | **Teste manual** em navegador/aparelho (D7). |
| **QA-063** (P3) | Comentários internos em código público | HTML 0; `site.min.css` 0; **`js/*.js` (~15 KB) e CSS-fonte ainda servidos** com referências a `doc/`, pendências e 2º número de WhatsApp | CSS-fonte sai do deploy (`.vercelignore`). **JS: decisão humana D6** (sem minificador nesta sprint). | — | Local / **PRODUCTION TEST REQUIRED**. |

**Fora desta sprint (decisão humana / outra rodada):** QA-022/023 (microcopy e titularidade do WhatsApp), QA-042 (privacidade), QA-065 (ordem/rótulos do menu), QA-040, QA-053/054/077, QA-043, QA-052/039/038, QA-061.

### D. RESULTADOS — Sprint 05 (implementação + reteste técnico em paralelo)

Nenhuma alteração visual: o diff de `index.html` contra a build da Sprint 04 tem só `<head>` (meta/link/JSON-LD), o `href` do rodapé (mesmo texto visível) e as mudanças finais de carregamento da Sprint 04 (`sizes` de gastronomia, Bastidores `preload="none"`). Regressão de performance: **nenhuma** (Lighthouse mobile 87 → 87, desktop 100 → 100; FCP/LCP/CLS/TBT dentro do ruído; bytes no load +2 KB = `favicon.ico`; vídeos no load 0).

| ID | Status | Resultado |
|---|---|---|
| **QA-009** | **FIXED (local) · PRODUCTION TEST REQUIRED · GAP VISUAL parcial** | `og:url`, `og:site_name`, `og:image` (1200×630 JPEG real, 166 KB, sem texto/logo) + type/width/height/alt e `twitter:card=summary_large_image` + title/description/image/alt. **Não existe capa social dedicada aprovada:** a imagem é um recorte da foto já publicada do complexo (`scripts/build-og.py`, reproduzível) — o mural mostra pilotos e patrocinadores → **precisa de aprovação do Will/Caio**. Validar previews reais em WhatsApp, LinkedIn, Facebook Debugger e X. |
| **QA-010** | **FIXED (local) · D2 · PRODUCTION TEST REQUIRED** | Um único `canonical` = `https://www.scuderiabandeiras.com.br/`, igual a `og:url`. Confirmar `www` como canônico (D2) antes de publicar. |
| **QA-011** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `robots.txt` (`Allow: /` + `Sitemap:` absoluto; não bloqueia css/js/assets). |
| **QA-012** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `sitemap.xml` válido, só a home, sem `lastmod` inventado. Enviar ao Search Console (humano). |
| **QA-015** | **FIXED (local) · PRODUCTION TEST REQUIRED** | JSON-LD `Organization` válido com fatos do site (nome, url, 4 `sameAs`, endereço do rodapé). **Sem** telefone (QA-023) e **sem** logo (só existe AVIF/WebP — D1b). |
| **QA-013 / QA-014** | **PRESERVADOS** | title, description, `lang`, H1 único e outline iguais ao HEAD/Sprint 04. |
| **QA-058** | **FIXED (local) · PRODUCTION TEST REQUIRED · COPY NOVA A APROVAR** | `404.html` com identidade (fontes, token vermelho, logo, classes existentes, zero CSS novo), `noindex`, caminhos absolutos, sem JS; status 404 em `/x` e `/a/b/c/d` (390/1440, sem overflow, contraste do botão 4,85:1, foco visível). Textos novos ("ERRO 404", "Página não encontrada", "O endereço que você tentou abrir…", "Voltar ao início", "Falar com o time no WhatsApp") precisam de aprovação. Confirmar em preview: `curl -I` numa rota inexistente. |
| **QA-069** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `favicon.ico` (16/32/48, bytes idênticos aos PNGs aprovados) na raiz + `<link rel="icon" href="/favicon.ico" sizes="any">`. Sem manifest (sem objetivo PWA). |
| **QA-068** | **FIXED (local) · D2** | Rodapé: `href` → `https://www.scuderiabandeiras.com.br/`, texto visível idêntico (some o salto 307). |
| **QA-059** | **AÇÃO HUMANA · PRODUCTION TEST REQUIRED** | Redirect apex → www (307 → permanente) é configuração do painel da Vercel (Project → Domains). **Nada criado em código** (especulativo; risco de loop; QA-051 validado). |
| **QA-070** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `vercel.json`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (só APIs não usadas). **CSP não forçada:** apenas `Content-Security-Policy-Report-Only` (0 violações em 390/768/1024/1440 com menu, vídeos, carrossel e feed mockado). HSTS não duplicado (a Vercel já envia). |
| **Cache** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `immutable` **só** em `assets-build/img/*-<10hex>.(avif\|webp\|jpg)`: regex casa exatamente 372 arquivos (21 sem hash — posters, `conteudo-*`, capa social — ficam no padrão). Vídeos 1 dia + SWR; fontes 7 dias + SWR; favicons 1 dia; `css/` e `js/` 5 min `must-revalidate` (`?v=` manual → nunca immutable); HTML inalterado. **Salvaguarda criada:** o hash é do arquivo-fonte, então `build-media.py` ganhou `PIPELINE_VERSION` (vazio = nomes atuais intactos): mudar qualidade/larguras exige bumpar, senão bytes novos com nome antigo ficariam presos 1 ano. |
| **Deploy surface** | **FIXED (local) · PRODUCTION TEST REQUIRED** | `.vercelignore` += `qa/`, `media-kit/`, `.vercel/`, `assets-build/manifest.json`, `css/base.css`, `css/components.css`, `css/tokens.css`. Simulação: nada do que o site referencia (267 caminhos de `index.html`, `404.html`, `url()` do CSS e grafo de módulos JS) fica ignorado; deploy ≈ 114 MB. Confirmar que o `.vercelignore` é honrado no método de deploy (Git vs CLI). |
| **API Instagram** | **VALIDADA local (mock) · PRODUCTION TEST REQUIRED — NÃO é PASS de produção** | Sem vazamento de token (resposta nem log, inclusive em erros com a URL repetida). Hardening: timeout 5 s (testado: retorna em ~5,0 s), cache 1 h só com posts (60 s quando vazio/erro/sem env), log só `name/message` com redação. Front: `permalink` só aceito se `https://www.instagram.com/…` (testados `javascript:`, domínio falso, `http:`, null). Fallback estático intacto em `configured:false`, 500, 404, HTML e abort. **Só na Vercel:** `IG_USER_ID`/`IG_ACCESS_TOKEN` reais, validade do token (~60 dias, sem renovação automática), forma real da resposta, cold start. |
| **QA-055** | **BLOCKED — AGUARDANDO CREDENCIAL/ID** | Nenhum ID/configuração no projeto; nada foi instalado nem simulado (sem placeholders). Escolha da ferramenta e consentimento/LGPD = decisão humana. Contrato de eventos já existente e mantido: `cta_click {origin, destination:"whatsapp"}`, `whatsapp_click {origin}`; origens: navbar, menu-mobile, hero, palestra, team-building, bandeiras-empresarial, conteudo, cta-final, footer (sem PII). |
| **QA-031** | **MANUAL** | Os 4 links sociais têm `rel=noopener` e respondem (TikTok: curl inconclusivo) → conferir em navegador/aparelho (D7). |
| **QA-063** | **PARCIAL · D6** | HTML e `site.min.css` sem comentários; CSS-fonte comentado sai do deploy. **`js/*.js` (~15 KB) segue servido com referências internas** (docs, pendências, 2º número de WhatsApp) — decisão humana (sem minificador nesta sprint). |

**Arquivos criados/alterados (Sprint 05):** `robots.txt`, `sitemap.xml`, `favicon.ico`, `404.html`, `vercel.json` (novos); `.vercelignore`; `index.template.html` + `index.html` (head, JSON-LD, rodapé); `assets-build/img/og-scuderia-bandeiras-1200x630.jpg`; `scripts/build-og.py` (novo); `scripts/build-media.py` (`PIPELINE_VERSION`); `api/instagram-feed.js`; `js/instagram-feed.js`.

**PASS local:** metadados/JSON-LD, raiz, 404 (status e layout em 4 combinações), regras do `vercel.json` (regex + headers emulados + CSP Report-Only sem violações), simulação do `.vercelignore`, matriz da API (12 cenários) e do front (8 cenários), 268 URLs locais = 200, console limpo, CTAs (11 wa.me), menu, vídeos (autoplay por observer, pausa), carrossel, fallback do Instagram, sem overflow.

**PRODUCTION TEST REQUIRED:** domínio/SSL, canonical pública e Search Console, redirect apex → www, headers reais (`curl -I`: immutable, nosniff, etc.; MIME `font/woff2`; `/favicon.ico` = 200 `image/x-icon`), 404 real em rota inexistente (inclusive profundidade `/a/b/c`), previews WhatsApp/LinkedIn/Facebook/X (limpar cache), CSP Report-Only em Chrome/Safari/Firefox, API com credenciais reais, `.vercelignore` honrado, Lighthouse/CrUX reais, analytics (quando houver ID).

**Decisões humanas pendentes:** **D1** aprovar a capa social (recorte do complexo) ou fornecer uma capa dedicada; **D1b** PNG/JPG do logo para o JSON-LD; **D2** confirmar `www.scuderiabandeiras.com.br` como canônico e tornar o redirect do apex permanente no painel; **D3** confirmar que o projeto Vercel `catalogo-bandeiras` serve o `www` e que nenhum host `*.vercel.app` fica indexável; **D4** titularidade do WhatsApp (QA-023) antes de qualquer `telephone`; **D5** órfãos no deploy (`Brand/`, `carros/`, `assets/car`, `assets/imagem-perfil-pilotos`, `assets/videos`; ~20 MB, sem impacto funcional) e método de deploy; **D6** comentários internos nos `js/*.js` públicos; **D7** conferir o perfil do TikTok em navegador; **copy da 404** a aprovar; **ferramenta de analytics e consentimento (LGPD)**.

**Riscos antes da publicação:** (1) o `canonical`/`og:url` só estão corretos se `www` for mesmo o domínio definitivo; (2) a capa social usa uma foto com patrocinadores e mural — confirmar uso; (3) `immutable` depende da disciplina do `PIPELINE_VERSION` ao mudar parâmetros de imagem; (4) qa/ e media-kit/ só estão protegidos pelo `.vercelignore` — se o deploy for via CLI, conferir antes; (5) o token do Instagram expira em ~60 dias sem renovação automática (o feed cai no fallback estático, sem erro visível); (6) itens já conhecidos e anteriores a esta sprint: sobra transitória de 9–13 px de overflow no hover dos cards de pilotos em 1024 px (`body` com `overflow-x: hidden`; igual na Sprint 04).

### E. Fechamento da Sprint 05
**SPRINT 05 CONCLUÍDA** em 30/09/2026 (implementação e reteste local). Não avança para deploy. O pedido pendente de **retratos de pilotos (busto + fundo)** não foi iniciado porque a Sprint 05 proíbe alterar visualmente Pilotos.

---

## RODADA FINAL DE CONSOLIDAÇÃO (auditoria, sem alteração no site)

Auditoria local em paralelo (QA técnico, acessibilidade, performance, SEO/produção, visual/conteúdo) contra `http://localhost:8000/`. **Nenhum arquivo do site foi alterado nesta rodada**; só este documento. Sem commit, sem deploy.

**Resultado:** nenhuma regressão e nenhum defeito objetivo novo que exija código. `index.html` e `css/site.min.css` idênticos ao que `build-html.py`/`build-css.py` geram; 298 referências locais existem em disco; sem overflow horizontal em 320/375/390/768/1024/1180/1280/1440; 0 vídeos baixados no load; console só com o 404 local de `/api/instagram-feed`.

**Status vigente dos IDs abertos**
- Bloqueado por insumo humano: QA-053 e QA-054 (aprovação de enquadramento/pessoas), QA-077 (retratos oficiais), QA-079 (aprovação visual), QA-043 (WebVTT), QA-055 (analytics), QA-020 (rótulo do CTA), QA-022/023 (WhatsApp), QA-040, QA-042, QA-065, QA-063 (D6), D1, D1b, D2, D3, D4, D5, D7, copy da 404.
- Teste real/produção: QA-019, 031, 038, 039, 052, 061, 050, 047, 056, 017, 027 (toque), 009 (previews), 010/011/012/015/058/068/069/070 (headers, Search Console), 059 (painel Vercel), cache immutable, `.vercelignore`, API Instagram.
- Fechados (local): todos os demais das Sprints 01–05.

**Achados registrados e NÃO corrigidos (decisão humana ou risco visual)**
1. 27 arquivos necessários ao site estão **fora do git** (`vercel.json`, `robots.txt`, `sitemap.xml`, `404.html`, `favicon.ico`, `css/site.min.css`, `assets-build/fonts/`, OG, 3 MP4 novos, derivados `eco-espaco-*` e `time-mosaico-foto-2-*`, `scripts/build-css.py`, `scripts/build-og.py`). Deploy via Git sem `git add` quebra o site.
2. Deploy ≈119 MB: `assets/`, `carros/`, `Brand/` e 160 órfãos de `assets-build/` (~30,5 MB, inclui `legado-ingo-desktop-1920w.mp4` 12,7 MB e `caterham-*`). Sem impacto no usuário; confirmar antes de ignorar (D5).
3. Rodapé a 390 px: links de 17–21 px de altura (WCAG 2.5.8, espaçamento não medido). Corrigir muda o ritmo vertical aprovado: só após validação visual.
4. `aria-controls` ausente no botão do menu (opcional). `robots.txt` sem `Disallow: /api/` (baixo risco).
5. Título da seção 07 ("Marcas que já andam ao lado…") pode soar como parceria atual; o subtítulo atenua. Decisão de copy.
6. Mosaico no celular (390 px) mostra ~2 de 5 linhas de cada foto (decisão da Sprint 02). Cargos de Christian ("Chefe de equipe") e Ingo ("Embaixador") a confirmar.
7. Autorizações de imagem/marca sem registro: logos de terceiros, patrocinadores no mural/macacões, pessoas dos mosaicos, Ingo, Caterham, PETRONAS (case histórico).
