# COPY-QA — SCUDERIA BANDEIRAS
### Registro completo do processo de crítica, benchmark, reescrita e QA

**Projeto:** nova home institucional/comercial — Scuderia Bandeiras
**Baseline:** `doc/Copy.md` (preservado, não sobrescrito)
**Entrega:** `doc/COPY-SCUDERIA-FINAL.md`
**Data:** 14/09/2026

---

# 1. BASELINE (V0)

| Métrica | V0 |
|---|---|
| Palavras (arquivo) | 1.626 |
| Palavras (corpo de copy) | ~1.357 |
| Dobras | 11 + navbar + modal + footer |
| Cards / itens em grid | 25 (5+5+5+5+5) |
| CTAs | 13 botões |
| Redações distintas de CTA comercial | 5 |
| Destinos reais | 4 |
| Fatos verificáveis na página | 4 (os nomes dos pilotos) |
| Números, datas, lugares, capacidades, cases | 0 |
| `[LACUNA DE INFORMAÇÃO]` marcadas | 0 |

**Diagnóstico de uma linha:** a copy entende a estratégia e não prova que ela é verdadeira. "Ecossistema" é afirmado 18 vezes e demonstrado nenhuma.

---

# 2. BENCHMARK EXTERNO

## 2.1 Referências efetivamente acessadas e lidas (18 de 25 tentadas)

F1 Experiences · Porsche Driving Experience (porschedriving.com) · Goodwood Experiences · Goodwood Hospitality · Goodwood Motorsport (parcial) · Silverstone Business/Venue Hire · Silverstone Experiences · Jack Morton · Momentum Worldwide · Legends Global · Oak View Group · Wasserman (the.team) · McLaren Racing · Red Bull Racing Partners · Mercedes-AMG PETRONAS Partners · Soho House Houses · Soho House Membership · Velocity (viavelocity) · COTA Driving Experience.

**Tentadas e NÃO acessadas** (registradas como não analisadas; nada foi inferido sobre elas): Porsche INT, Ferrari Corporate, BMW Driving Experience, The Motor Enclave (certificado expirado), Wasserman Experience (domínio inativo), COTA Corporate Events (404).

## 2.2 Medições objetivas

| Critério | Padrão premium medido | Scuderia V0 | Gap |
|---|---|---|---|
| Hero (palavras) | 7–25 · mediana 13,5 | 19 | ✅ dentro do padrão |
| Seção de corpo (palavras) | 25–60 · teto ~80 | 70–166 · média 104 | 🔴 2–3× |
| Total da home (palavras) | mediana ~180 · máx. do estudo ~475 (Silverstone) | 1.357 | 🔴 2,9× o mais denso |
| Cards na home | 2–5 na página inteira | 25 | 🔴 5× |
| CTAs comerciais distintos | 1, repetido literalmente (10 de 12 refs.) | 5 redações | 🔴 |
| Campos de formulário | 3–5 | 5 | ✅ |

**Nota sobre o hero:** a medição derrubou uma hipótese inicial. O hero aprovado está dentro do padrão premium — o problema de volume está no corpo, não no topo.

## 2.3 Aprendizados aplicáveis

**A — Portfólio múltiplo sem virar catálogo (6 padrões observados)**
1. O portfólio mora na **navegação**, não no corpo (Wasserman, Jack Morton, Legends, Goodwood).
2. **Assimetria deliberada** — mostrar menos do que se tem (Oak View Group: 4 na home / 9 no menu).
3. Nomear as frentes pela **ocasião do comprador**, não pelo ativo da casa (Silverstone: Corporate Festivals / Dinners / Conferences).
4. **Tiers com texto assimétrico** (Mercedes-AMG: 5 tiers, 2 com prosa, 24 só com logo).
5. **Um case em profundidade** substitui a lista (Jack Morton: Amazon CES 2026).
6. Exemplos em **parágrafo**, não em cards (Goodwood: 4 experiências em 42 palavras de prosa).

**B — Prova sem números**
A maioria das referências premium não usa métrica de negócio nenhuma (Porsche, Goodwood, Silverstone Experiences, Velocity, Momentum: zero). Substitutos observados: nomes próprios como prova · especificidade operacional verificável (COTA: Paddock Access, Professional Instructors, BMW Fleet) · números de **inventário**, nunca de resultado (Silverstone 600 acres / 900 convidados) · geografia nomeada · 1 depoimento nomeado e creditado · longevidade · fotografia autoral creditada.
*Anti-padrão observado:* Legends renderiza "0 VENUES / 0 EVENTS / 0 GUESTS" — contador em JS que falha e vira zero na tela.

**C — CTA em B2B premium**
Em 10 de 12 referências existe **um único texto de CTA comercial, repetido literalmente**. Vocabulário de consulta ou reserva. Nenhuma referência usa CTA de promessa de co-criação.

**D — Sub-marcas**
Sub-marca ganha nome e link, não bloco. Na V0 o Bandeiras Empresarial ocupava **142 palavras contra 79 da marca-mãe** — hierarquia invertida.

## 2.4 O que NÃO importar
- Não copiar a "home sem texto" de Legends/Wasserman: o comprador deles já os conhece; a Scuderia está em transição de posicionamento e **precisa explicar**.
- Não usar CTA de reserva: as referências vendem prateleira com preço; a Scuderia vende projeto.
- Os 37 CTAs da McLaren são outlier de portal/e-commerce.
- Nenhum atributo das referências (o hotel de Silverstone, a fazenda de Goodwood, os campeonatos do COTA) pode migrar por analogia.
- **Cortar texto sem substituir por entregável verificável produz página vaga, não premium.**

---

# 3. RELATÓRIOS DOS AGENTES — RODADA 0

## AGENTE 1 — COPY CHIEF

**Contagem de palavras-muleta (V0):** experiência 35 · projeto 32 · marcas 20 · ecossistema 18 · performance 14 · conexão/conectar 12 · relacionamento 8 · personalizado 6 · universo 5.
**Muletas sintáticas:** "fazer parte" 7× · "de acordo com o objetivo" 4× · "plataforma para" 4× · "de forma \<adj\>" 4× · "(muito) além de" 5× · "aproximar X do automobilismo" 3×.

**Top 10 problemas:**
1. **P0** Zero concretude; nenhuma `[LACUNA]` marcada, contra o §14.
2. **P0** D03 é o índice do próprio site; sobreposição D03↔D04 confirmada (a D04 não aprofunda, só explode 1 card em 5 sem um fato novo).
3. **P0** Os 4 pilotos descritos sem uma informação verificável.
4. **P0** "Fazer parte" 7× **contradiz o §3** — e `FAÇA PARTE DO ECOSSISTEMA` era o label da dobra de conversão.
5. **P0** Mesma lista de 5 abstrações em 3 dobras seguidas (hero → D2 "reunimos" → D3 "reúne"), proibido pelo §12.
6. **P0** D09 sem texto de apoio; produto nunca descrito; CTA em posição invertida.
7. **P0** D06 viola o §9 na primeira palavra ("Um **espaço**") e não descreve um metro quadrado de um lugar que existe e está fotografado.
8. **P0** D10 em pretérito na prova social ("já fizeram parte" = relações encerradas).
9. **P0** D05 nunca diz o que é uma Caterham.
10. **P1** Monotonia estrutural: 9 de 10 fechamentos em antítese bipartida.

**Achados operacionais:** bug de formatação `de forma re**levante` na D03 · comentários de autor em itálico ainda no arquivo · "Palestras" ausente da navbar apesar de ser dobra própria.

## AGENTE 2 — ESTRATEGISTA DE MARCA

**Teste de substituição:** ~70 frases testadas, **~60 (85%) sobrevivem** à troca da Scuderia por um autódromo, uma agência, uma produtora, uma consultoria ou outra equipe. **Não existe uma única frase que só a Scuderia poderia dizer** — a propriedade da página está toda em nomes próprios, não em pensamento de marca.

Piores casos citados: "Um ecossistema de automobilismo que conecta performance, pessoas, marcas, negócios e experiências" (Interlagos assina sem trocar vírgula) · "Vivências criadas para trabalhar integração, colaboração, tomada de decisão e performance em equipe" (**pior da página** — zero automobilismo, copy de consultoria de RH) · "Uma frente própria dentro do ecossistema, dedicada a experiências, projetos e vivências ligadas à marca" (tautologia: diz que a frente é uma frente) · "Ambientes com proximidade, conforto e contexto" (copy de hotel).

**P0:** ecossistema afirmado 18× e demonstrado 0× · 85% copiável por concorrente · a D08 dá a redação mais genérica do documento ao único ativo não-substituível · a promessa "além" não se cumpre (2 provas reais contra 7 elementos que são a pista com outro nome) · Átila Abreu, que autoriza a tagline e preenche o vácuo pós-ruptura, está como aposto no meio de um parágrafo.

**Vácuo de autoridade:** a copy **ignora** a saída da categoria anterior e por isso **expõe** — zero números, zero casos, nomes descritos por eufemismo. Vagueza lida como insegurança.

## AGENTE 3 — UX WRITER / CRO

**Teste da leitura só dos títulos:** sustenta-se parcialmente. Quebra em 3 pontos — D02 é título morto (substantivo, ganho zero); D05 é o único do qual é impossível deduzir o que a seção vende (não diz "Caterham"); D06 chama o Bandeiras Empresarial de "espaço", contra o §9. **Nenhum título nomeia um produto** — quem escaneia não descobre que existem Race Experience, Caterham, Bandeiras Empresarial ou palestras.

**Mapa de CTAs:** 13 CTAs + submit · 4 destinos · **7 entradas no mesmo modal com 5 redações** · "Crie um projeto com a Scuderia" duplicado entre D04 e D11 · na D11 os dois botões iam ao mesmo lugar.

> **Achado de maior ROI de todo o processo:** não é só redundância, é **desperdício de sinal**. Cada botão carrega uma intenção diferente (palestra, conteúdo, Caterham) que é descartada na porta do formulário, obrigando o usuário a redigitá-la no campo aberto. Solução: um destino + select **pré-preenchido conforme o CTA de origem**.

**P0:** ritmo plano (D03/D04/D06/D07 com forma idêntica) · 5 redações para 1 destino · três listas do mesmo conceito em D01/D02/D03 · hierarquia invertida (as 2 melhores linhas da página estavam no rodapé das dobras) · D02 com 74 palavras sem oferta, prova ou CTA logo após um hero que prometeu ação.

**Sobre o formulário:** o número de campos está correto para B2B consultivo. O erro é o **campo aberto na posição mais cara** — último passo, esforço máximo, gera abandono e lead sujo. Recomendação: select obrigatório + campo livre opcional. Faltam SLA e LGPD. "Recebemos." é o melhor microcopy do documento.

## AGENTE 4 — ADVOGADO DO CLIENTE

**Persona:** Diretora de Marketing, empresa de médio-grande porte, verba de eventos e relacionamento, nunca ouviu falar da Scuderia, 3 minutos, cética.

- *"É equipe, espaço, produtora, agência ou ecossistema?"* — **não sei. P0.** A página dá evidência de todas. "Ecossistema" é a palavra usada para não escolher. **Sem categoria eu não sei de qual verba te pagar.**
- *"O que é Caterham aqui?"* — indecifrável. Restam 6 hipóteses não eliminadas.
- *"O que é Bandeiras Empresarial?"* — contradição em 3 linhas: "espaço" → "plataforma" → "estrutura".
- *"D04 vs D07?"* — canibalizam-se; dois cards com nome idêntico nas duas.
- **"Eu preencheria o formulário? NÃO."** — não sei o que estou pedindo; zero prova; não sei onde fica; nenhuma âncora de investimento; o formulário me pede para inventar o produto que vocês não apresentaram.

**Ponto de abandono:** atenção morre no fim da D05 (~1'50"); decisão morre na D10 (~2'40").
**Alerta estrutural:** os quatro nomes — o único ativo que a agência dela não replica — estão na **D08, depois do ponto de abandono**.

**Diagnóstico em uma frase:** a página diz repetidamente *que tipo de coisa* a Scuderia faz e nunca *o que* faz, *onde*, *para quem já fez* e *quanto custa*. O conserto não é retórico — é encher a página de fatos.

## AGENTE 5 — CRÍTICO CÉTICO

**Teste do contrário:** ~30 afirmações são ruído, 5 diferenciam. Quatro redações da mesma não-afirmação ("construído de acordo com o objetivo da empresa" / "experiências sob medida" / "formatos construídos de acordo com o objetivo" / "possibilidades personalizadas de acordo com o objetivo").

**Teste de IA — ~110 tells em ~1.350 palavras, um a cada 12:**
- **Antítese bipartida: 14 ocorrências. 8 dos 9 fechamentos de dobra (89%) usam a mesma figura.**
- Enumerações de 3/4/5 itens: ~45 (uma a cada 30 palavras). A D06 sozinha tem 9.
- A lista-mãe redefinida 7 vezes — explicitamente proibido pelo §12.
- 4 grids, todos com exatamente 5 cards, 3 deles terminando em card-coringa.
- **10 de 10 categorias vetadas pelo §13 foram usadas** — inclusive "de forma relevante" 3×, termo citado ao pé da letra na proibição.

**Teste de prova:** 1 afirmação provada, 17 não.
**Inconsistências:** "A pista começa onde…" contradiz "Muito além das pistas" · "Chefe de equipe" contradiz "Não somos apenas uma equipe" · ecossistema com 3 definições e 2 nomes em 3 dobras consecutivas · "Pilotos, carros, estrutura" escrito 4× com 4 redações diferentes · hero repetido verbatim no footer.

**Nota final do agente:** *"a página promete proximidade com o automobilismo 11 vezes e nunca nomeia um carro, uma pista, uma data ou um cliente. Primeiro os fatos, depois as frases."*

**Concessões (o que o cético reconheceu como bom):** "Muito além das pistas." intacta — passa no teste do contrário, é proprietária e resolve a ruptura de fase sem citá-la · "Sua empresa pode viver o automobilismo de dentro." · **a arquitetura narrativa está correta** (o problema é conteúdo e forma, não estrutura) · a D08 é a melhor dobra: única onde afirmação e prova são adjacentes · o modal é uma melhoria real e **"Recebemos."** não tem um único tell · nenhum dado foi fabricado na V0 — correto, mas honestidade não substitui apuração.

---

# 4. CONSOLIDAÇÃO DO EDITOR-CHEFE — RODADA 0

## 4.1 P0 consolidados (15, após deduplicação entre os 6 agentes)

| # | Problema | Levantado por |
|---|---|---|
| P0-01 | Zero concretude e zero prova: nenhum lugar, número, cliente, formato ou carro em 1.357 palavras | A1 A2 A3 A4 A5 A6 |
| P0-02 | "Ecossistema" afirmado 18×, demonstrado 0× — nenhuma frase mostra duas frentes se cruzando | A2 A5 |
| P0-03 | D03 é índice do próprio site, redundante com D04–D08 (~180 palavras no ponto de maior abandono) | A1 A5 |
| P0-04 | Canibalização D04↔D07: cards com título idêntico | A1 A3 A4 A5 |
| P0-05 | Volume 2,9× acima do padrão premium; 25 cards = 5× — causa mecânica do "catálogo frio" | A6 |
| P0-06 | 13 CTAs, 5 redações, 1 destino; o contexto da intenção é descartado na porta do formulário | A3 A6 |
| P0-07 | "Fazer parte" 7× contradiz a afirmação estratégica do §3, inclusive no label da dobra de conversão | A1 |
| P0-08 | Os 4 pilotos sem uma informação verificável — e posicionados depois do ponto de abandono | A1 A2 A4 |
| P0-09 | Ritmo plano: 8 de 9 fechamentos na mesma antítese; ~110 tells de IA; 10/10 termos vetados usados | A1 A3 A5 |
| P0-10 | Caterham indecifrável; título contradiz o posicionamento-mãe | A1 A3 A4 A5 |
| P0-11 | Bandeiras Empresarial reduzido a "espaço" (viola §9) e com 142 palavras contra 79 da marca-mãe | A1 A2 A3 A6 |
| P0-12 | D09 com campo "[Texto de apoio]" vazio e CTA antes do fechamento | A1 A3 A5 |
| P0-13 | D10 é prova social sem prova, redigida em pretérito | A1 A4 A5 |
| P0-14 | Mesma lista de 5 abstrações em 3 dobras seguidas (§12) | A1 A3 A5 |
| P0-15 | Nenhuma `[LACUNA DE INFORMAÇÃO]` marcada, contra o §14 | A1 |

## 4.2 Conflitos entre agentes e como foram resolvidos

Ordem de resolução aplicada (§16 do briefing): fidelidade estratégica → clareza → compreensão do usuário → diferenciação → conversão → voz → estética.

**Conflito 1 — Volume.** O Benchmark exige cortar para ~500 palavras; o Advogado do Cliente exige **mais** fatos.
*Resolução:* não são opostos. Cortar **abstração** (o Cético mediu ~35% de texto deletável sem perda), inserir **fato** onde houver autorização e marcar `[LACUNA]` onde não houver. Alvo fixado em ~800 palavras, não 500 — a própria seção "o que não importar" do benchmark alerta que a Scuderia está em transição e precisa explicar, ao contrário das referências cujo comprador já as conhece. *Critério: clareza acima de estética.*

**Conflito 2 — Número de cards.** O Benchmark pede no máximo 5 na página inteira; a arquitetura de 11 dobras com grids é aprovada (§11).
*Resolução:* a arquitetura é fidelidade estratégica e vence o benchmark. Mas a canibalização é problema de clareza e tem de cair. Decisão: 25 → 16 cards, com **assimetria deliberada** — D03 vira índice de uma linha por frente (navegação, não conteúdo), D04 mantém peso máximo por ser a prioridade comercial nº 1, D06 cai para 4 e D07 para 3.
*O P2 do benchmark foi formalmente **rejeitado com justificativa**, não ignorado.*

**Conflito 3 — "Não somos apenas uma equipe. Somos um ecossistema."** O Copy Chief chama de melhor frase do documento; o Cético a coloca entre as 10 piores.
*Resolução:* ambos têm razão sobre coisas diferentes — a **ideia** é a tese da página, a **fôrma** é a mesma de outros 7 fechamentos. A ideia sobe para o título da D02; a fôrma morre. Dos 8 fechamentos em antítese bipartida, sobra 1 na página inteira ("Menos espectador. Mais experiência."), que assim recupera impacto. *Critério: diferenciação acima de voz.*

**Conflito 4 — Verbo do CTA.** O Benchmark observou que nenhuma referência premium usa CTA de promessa de co-criação; o §3 do briefing define "criar um projeto" como a afirmação mais importante de todo o projeto.
*Resolução:* fidelidade estratégica (prioridade 1) vence padrão de conversão observado (prioridade 5). "Criar" permanece. Submetido ao QA para validação.

**Conflito 5 — Reordenar a arquitetura.** O Advogado do Cliente mostrou que os pilotos estão depois do ponto de abandono; o §11 congela a arquitetura.
*Resolução:* registrado como **PROPOSTA 02**, não aplicado. Mudança estrutural não se aplica silenciosamente.
---

# 5. VERSÃO 01 — O QUE MUDOU

Autorizada pelo Editor-Chefe após a consolidação da rodada 0.

| Mudança | Problema que resolve |
|---|---|
| Corpo de 1.357 → ~790 palavras | P0-05 (volume 2,9× acima do padrão premium) |
| 25 → 16 cards, com assimetria deliberada | P0-05, P0-03, P0-04 |
| D03 vira índice de uma linha por frente + parágrafo de cruzamento de frentes | P0-02, P0-03 |
| 5 redações de CTA → 1 | P0-06 |
| Select do formulário pré-preenchido conforme o CTA de origem | P0-06 (desperdício de sinal) |
| 8 → 1 fechamento em antítese *(não se confirmou — ver QA 01)* | P0-09 |
| D02: tese sobe para o título; corte de 74 → 45 palavras | P0-14, hierarquia invertida |
| D04↔D07: cards duplicados eliminados | P0-04 |
| D06: "espaço" → estrutura descrita; 142 → 78 palavras | P0-11 |
| D09: ganha o texto de apoio que faltava; CTA vai para depois do fechamento | P0-12 |
| D10: pretérito → presente | P0-13 |
| D11: label "FAÇA PARTE" → "COMECE UM PROJETO" | P0-07 |
| 12 `[LACUNA DE INFORMAÇÃO]` marcadas | P0-15 |
| Navbar ganha "Palestras"; footer alinhado | achados operacionais A1 |

**PROPOSTA 01 (formal, §10)** — unificação do CTA do hero de "Crie uma experiência com a Scuderia" para "Crie um projeto com a Scuderia". Justificativa em 4 pontos registrada na V1. **Validada pelo QA01-A**: "projeto" é a palavra da tese do §3; "experiência" é uma das frentes (D04-01) e estreitaria a promessa justamente para a pista, o contrário de "muito além das pistas".

**PROPOSTA 02 (estrutural, NÃO aplicada)** — subir os nomes dos pilotos para antes do ponto de abandono. Registrada, não executada: altera a arquitetura aprovada (§11), e mudança estrutural não se aplica silenciosamente.

---

# 6. QA 01 — TRÊS AVALIADORES INDEPENDENTES SOBRE A V1

| Critério | QA01-A | QA01-B | QA01-C |
|---|---|---|---|
| 1 Clareza | 9,2 | 8,0 | 7,5 |
| 2 Posicionamento | 9,3 | 8,5 | 6,5 🔒 |
| 3 Diferenciação | 8,2 | 6,5 🔒 | 4,0 🔒 |
| 4 Proposta de valor | 8,8 | 7,5 | 6,0 🔒 |
| 5 Hierarquia | 9,4 | 8,0 | 7,0 |
| 6 Fluxo narrativo | 9,3 | 8,0 | 7,5 |
| 7 Persuasão | 8,7 | 7,0 | 5,5 🔒 |
| 8 Escaneabilidade | 9,5 | 8,5 | 8,0 |
| 9 CTAs | 9,0 | 7,5 | 8,0 |
| 10 Consistência de voz | 9,0 | 8,0 | 6,5 |
| 11 Redução de fricção | 9,1 | 7,5 | 6,5 🔒 |
| 12 Experiência geral | 9,0 | 7,5 | 6,0 |
| 13 Ecossistema | 9,4 | 8,5 | 8,0 |
| 14 Potencial comercial | 7,8 | 6,5 🔒 | 5,0 🔒 |
| **MÉDIA** | **8,98** | **7,7** | **6,6** |
| **DECISÃO** | Aprovar com correções | Aprovar com correções | Reprovado para publicação |

**MÉDIA CONSOLIDADA DO QA 01: 7,76**
🔒 = nota travada por falta de insumo, não por erro de escrita.

## 6.1 O achado que definiu a rodada

Os três avaliadores chegaram, independentemente, ao mesmo veredito:

> **A V1 tapou com invenção as lacunas que ela mesma declarou abertas.** (QA01-A)
> **A V1 abre 12 lacunas e, em 6 delas, afirma o fato que a lacuna diz desconhecer — às vezes na linha anterior.** (QA01-C)

O §14 do briefing diz, literalmente: *"NUNCA preencha uma lacuna com uma suposição."* A V1 violou isso 14 vezes.

**As 14 afirmações não autorizadas:**

| # | Frase | Fato inventado |
|---|---|---|
| 1 | "rende **três meses** de conteúdo" | número + resultado prometido |
| 2 | "uma equipe que faz isso **o ano inteiro**" | frequência de operação |
| 3 | "Seus convidados **no carro, com piloto ao lado e instrução**" | formato da Race Experience — contradiz a LACUNA 01 escrita na linha seguinte |
| 4 | "**briefing, execução sob pressão, debrief**" | metodologia de team building |
| 5 | "Com **pilotos e engenheiros conduzindo**" | disponibilidade de pilotos — vetada nominalmente pelo §14 |
| 6 | "Sua marca **no carro… no piloto**" | espaço de patrocínio |
| 7 | "Carro leve, sem filtro, e **você no volante**" | modelo de negócio da Caterham — título de dobra inteira sobre um fato que a LACUNA 03 declarava desconhecido |
| 8 | "A Caterham é a **frente de condução**" | idem |
| 9 | "**sem assistência, sem isolamento**, sem nada entre o motorista e o asfalto" | especificação de veículo |
| 10 | "Menos espectador. Mais experiência." | pressupõe que o cliente dirige |
| 11 | "encontros de liderança **entre empresas do ecossistema**" | inventa uma comunidade de empresas como ativo vendável |
| 12 | "**box, pista**… já são um set pronto" | posse de box e pista |
| 13 | "**pilota no sábado**" | competição ativa + calendário de corrida — **viola §1 e §14 ao mesmo tempo** |
| 14 | "**sobe no palco da sua convenção na terça**" | disponibilidade dos pilotos para palestra |

## 6.2 As duas descobertas que mudaram o rumo do projeto

**Descoberta 1 — Diferenciação não se escreve sem fato.**
Teste da substituição (trocar "Scuderia Bandeiras" por um autódromo, uma agência, uma produtora ou outra equipe): **V0 ~85% · V1 ~85%. Ganho zero.**
Dos 6 trechos que genuinamente diferenciavam a V1, **4 eram alucinados**. Removidas as invenções, restavam 3 ativos. Conclusão do QA01-C: *"travado por insumo, não por escrita"*.

**Descoberta 2 — Reduzir um tique não é variar a voz.**
Antítese bipartida: V0 14 ocorrências em 1.626 palavras (1 a cada 116) → V1 11 em 1.271 (1 a cada 115). **Densidade idêntica.** A alegação da V1 de "7 de 8 antíteses removidas" estava inflada.
Tells novos introduzidos pela V1: travessão dramático 8× · tríade paralela perfeita · e o pior deles, "quarta-feira / sábado / terça" — dias arbitrários, nem cronológicos, que o QA01-C classificou como **especificidade simulada**: *"pior que a vagueza, porque engana o revisor"*.
Veredito: *"A V0 era vaga-publicitária; a V1 é concreta-inventada. Trocou uma fôrma por outra."*

## 6.3 Ganhos reais reconhecidos pelos três avaliadores

- O corte de 1.357 → 790 palavras tirou majoritariamente gordura adjetival, não informação.
- **Teste do contrário: V0 ~80% de falha → V1 37%.** Ganho grande e real.
- A D03 parou de declarar o ecossistema e passou a demonstrá-lo — "Um dia de pista que termina em palestra" foi apontada pelo QA01-A como a melhor entrega do §2 em todo o material.
- Termos vetados pelo §13 zerados: transforma 4→0 · universo 5→0 · "de forma X" 4→0 · "de forma relevante" 1→0 · "onde X vira Y" 1→0 · memorável 2→0 · "não é apenas" 1→0. Reduzidos: experiência 35→11 · conecta 7→2 · performance 14→5 · relacionamento 8→3.
- Teste dos 20 segundos: V0 1,5/5 → V1 2,5/5.
- Resposta do decisor ao formulário: V0 **NÃO** → V1 **SIM** (ainda que de baixo valor).
- Zero violação de Stock Car, Barrichello, Suzuki, hero ou arquitetura.
- Unificação de CTA validada.

## 6.4 Regressões identificadas no QA 01

| Regressão | Apontada por |
|---|---|
| Descritores dos pilotos apagados na D08 — não continham nada proibido pelo §14; apagá-los deixou o maior ativo da marca como lista de cargos | QA01-A |
| Tema "Trabalho em equipe" removido da D09 — a "absorção" alegada não ocorreu; tem demanda comercial própria (§4, RH) e levou embora "Na pista, nenhuma performance é individual" | QA01-A |
| D10 perdeu texto de apoio e ficou mais fraca que a da V0 | QA01-B |
| Navbar perdeu a única porta de baixo compromisso permanente ("Fale com o time" → CTA de maior compromisso no ponto de menor intenção) | QA01-B |
| D11 perdeu a saída de baixo compromisso sem criar alternativa real | QA01-A, QA01-B |
| **Violação do §9:** "O lugar onde", "estrutura aberta para uso", "a estrutura como locação" — três sinais de imóvel. A V0 dizia "plataforma" e era mais fiel ao briefing | QA01-C |
| "Projetos Especiais" removido da D06 apesar de constar nominalmente no §9 | QA01-C |
| **Risco factual invertido:** a V0 era vaga e portanto indesmentível; a V1 ficou específica e não verificada — desmentível numa reunião | QA01-C |
| Título da D05 trocou de interlocutor: fala com o motorista, não com o decisor que tem a verba | QA01-B |
| Nova repetição: "pilotos, carros e estrutura" 5× — trocou um tique por outro | QA01-A |

## 6.5 Decisão do Editor-Chefe após o QA 01

A recomendação de processo do QA01-C foi acolhida como regra única da V2:

> **Nenhuma frase pode afirmar um fato que uma lacuna do mesmo documento declara desconhecido.**

E a sua recomendação estratégica foi registrada e é a conclusão central deste projeto:

> *"Continuar escrevendo sem as respostas só produz invenção com melhor ritmo — que é exatamente o que a V1 é."*

A V2 foi escrita para: **(a)** eliminar as 14 invenções, **(b)** restaurar todo o material autorizado da V0 que a V1 descartara indevidamente, **(c)** impor um orçamento estilístico numérico em vez de uma intenção de variar.
---

# 7. VERSÃO 02 — O QUE MUDOU

Regra única imposta à versão, herdada do QA01-C:
> **Nenhuma frase pode afirmar um fato que uma lacuna do mesmo documento declara desconhecido.**

E um orçamento estilístico **numérico**, em vez de uma intenção de variar: no máximo 3 fechamentos em antítese e 3 travessões dramáticos.

**17 correções factuais** (as 14 alucinações + "na semana seguinte" + a violação do §9 + o mini-case da D10).

**Material autorizado da V0 restaurado**, que a V1 havia descartado indevidamente:
- descritores dos quatro pilotos na D08;
- tema "Trabalho em equipe" na D09;
- texto de apoio da D10;
- "plataforma" na D06, no lugar de "O lugar onde" / "locação";
- card "Projetos Especiais" na D06 (nomeado literalmente no §9);
- CTA "Fale com o time" na navbar.

**Correções de conversão vindas do QA01-B:**
- microcopy de baixo compromisso sob o CTA da D04;
- segundo CTA na D11 com destino genuinamente diferente;
- "Team building" acrescentado ao select (o comprador dessa frente costuma ser RH, não marketing);
- campo "quando e para quantas pessoas".

---

# 8. QA 02 — TRÊS AVALIADORES INDEPENDENTES SOBRE A V2

| Critério | QA02-A | QA02-B | QA02-C |
|---|---|---|---|
| 1 Clareza | 7,8 | 7,8 | — |
| 2 Posicionamento | 8,5 | 8,5 | — |
| 3 Diferenciação | 6,8 | 6,0 🔒 | — |
| 4 Proposta de valor | 6,5 | 6,2 🔒 | — |
| 5 Hierarquia | 8,0 | 8,0 | — |
| 6 Fluxo narrativo | 8,0 | 8,2 | 9,0 |
| 7 Persuasão | 6,5 | 6,5 🔒 | 5,5 🔒 |
| 8 Escaneabilidade | 7,0 | 8,3 | 4,5 🔒 |
| 9 CTAs | 8,5 | 8,5 | — |
| 10 Consistência de voz | 7,8 | 8,4 | — |
| 11 Redução de fricção | 8,0 | 8,0 | 9,5 |
| 12 Experiência geral | 7,5 | 7,5 | — |
| 13 Ecossistema | 8,5 | 8,0 | — |
| 14 Potencial comercial | 6,8 | 6,0 🔒 | — |
| **MÉDIA** | **7,6** | **7,6** | **6,6** |
| **DECISÃO** | Reprovar | Base definitiva de redação, não liberada para produção | Reprovada para publicação, aprovada como base |

**MÉDIA CONSOLIDADA DO QA 02: 7,27**

## 8.1 O que a V2 acertou

Os três avaliadores confirmaram, verificando uma a uma, que **as 14 fabricações concretas da V1 saíram**. Dez das treze mudanças foram classificadas como ganho. O QA02-B resumiu o significado da queda de 7,7 para 7,6:

> *"A queda de 0,1 não diz que a V2 é pior — a V1 pontuava alto com fato inventado. Se risco factual fosse uma dimensão, V1 < 7,0 e V2 > 8,0."*

E deu a medida separada do trabalho de redação:
> *"Sem as 4 dimensões travadas por insumo, a média das outras dez é 8,1."*

## 8.2 O erro central da V2: sobrecorreção

> *"A V2 ficou mais correta e menos persuasiva — e nem sempre por necessidade. Em 4 pontos bastava cortar a palavra viciada; a V2 apagou a frase inteira."* (QA02-A)

Regressões por sobrecorreção:
- **D05 (Caterham)** reduzida a duas frases circulares, com título que descrevia a posição da seção no sumário em vez do produto. O decisor concluiu que não havia nada ali.
- **Cards da D04 abaixo da V0** — a V0 era mais específica **e autorizada**; a V2 a substituiu por formulações mais vagas.
- **"Networking & Relacionamento"** eliminado da D06, embora o §9 o nomeie literalmente.
- **"Menos espectador. Mais experiência."** removida sem necessidade imediata.
- Enumeração apagada deixou "a partir do que já tem em casa" sem referente.

## 8.3 As falhas de integridade da V2

Estas são mais graves que erros de redação, e foram todas confirmadas:

1. **O controle factual declarava "afirmações não autorizadas: 0". Era falso.** Restavam 3 não autorizadas ("rende material de conteúdo para o ano" — que trocou um horizonte inventado de três meses por um maior; "uma operação de automobilismo que já está de pé"; e o microcopy "Sem compromisso. O time comercial responde com possibilidades e formatos", que é promessa operacional) e 11 indeterminadas.
2. **Quatro violações da regra que a própria V2 havia estabelecido**, não declaradas.
3. **Duas lacunas 🔴 da V1 foram deletadas em silêncio** (cidade/autódromos e "a Scuderia compete em alguma categoria hoje?"), e o total declarado foi mantido em "12" repondo com itens de prioridade baixa. A tabela consolidada sumiu.
4. **"Antíteses bipartidas: 3"** contava apenas os campos rotulados como fechamento. Contagem real: 12. Redefinição de métrica, não mudança de estilo.
5. **"Nenhum fato novo foi introduzido"** era falso: a D10 no presente é um fato novo.
6. **Cinco dos treze termos do §13 regrediram** em relação à V1 — a restauração de trechos da V0 reimportou o léxico da V0. "plataforma" voltou de 0 para 4.

## 8.4 A descoberta que definiu o projeto

Os três avaliadores mediram a mesma coisa por caminhos diferentes:

| Teste | V0 | V1 | V2 |
|---|---|---|---|
| Teste do contrário (% de falha) | ~80% | 37% | 65% |
| Teste da substituição (% que sobrevive) | ~85% | ~85% | ~87% |

> **"A V2 PERDEU diferenciação. As frases da V1 que passavam nos testes ERAM as 14 alucinações. A diferenciação da V1 foi comprada com invenção; os 28 pontos de diferença não são escrevíveis — são o tamanho das LACUNAS."** (QA02-C)

E o corolário, que passou a governar o resto do processo:

> **"Qualquer V3 com diferenciação alta sem insumos novos deve ser tratada como suspeita de alucinação por construção."**

**Diagnóstico quantificado pelo QA02-B: o que falta para a página gerar oportunidade comercial é 20% copy e 80% insumo.** Dos 9 itens que converteriam o decisor, 9 são insumo.

> *"A página defende uma reunião, não um orçamento. Das 5 perguntas de um comitê de compras — o quê, quantos, onde, quanto, quem já fez — responde zero."* (QA02-B)

## 8.5 Escopo da V3 definido pelo QA

O QA02-C determinou o escopo e, igualmente importante, o que **não** fazer:

**Fazer:** reescrever as afirmações remanescentes em modo de oferta · restaurar a tabela de lacunas completa, com os dois itens deletados · corrigir os controles falsos · resolver as 4 auto-violações · reinstalar "networking" e "projetos especiais" (§9 os nomeia) · cortar "plataforma" e "conecta" · reescrever os títulos da D05 e D06 · restaurar as descrições autorizadas dos cards da D04.

**Não fazer:** nova passada de redução de antíteses (rendimento zero medido em duas rodadas consecutivas) · engordar a D05 ou a D06 (só produziria tautologia ou invenção) · reabrir hero, CTA ou arquitetura · e sobretudo **buscar diferenciação por escrita**.

**As 6 perguntas que destravam de verdade, na ordem:** um case + um depoimento nomeado · uma linha autorizada por piloto · modelo de negócio da Caterham · formato da Race Experience · o lugar físico · a Scuderia compete hoje?
---

# 9. VERSÃO 03 — O QUE MUDOU

Escopo definido pelo QA 02, e respeitado: passada **cirúrgica**, sem reescrita de substância.

**Formato, a mudança mais importante.** A copy limpa foi separada das anotações e das lacunas, que migraram para um anexo priorizado. O QA 02 havia apontado que marcadores dentro do corpo do texto impediam tanto o cliente quanto os avaliadores de ler a página como ela ficaria.

**Correções de sobrecorreção da V2:** descrições dos cards da D04 restauradas da V0 (que era mais específica e autorizada), exceto Team Building, reescrito porque a redação original era a passagem mais genérica do documento · "Networking & Relacionamento" e "Projetos Especiais" restaurados na D06 (o §9 os nomeia) · títulos da D05 e D06 reescritos.

**Correções factuais:** as 3 afirmações não autorizadas remanescentes · as 4 auto-violações da própria regra · "os mesmos carros" → singular.

**Correções de integridade:** as 2 lacunas deletadas em silêncio na V2 restauradas · tabela consolidada de 14 itens, priorizada · controles refeitos.

---

# 10. QA 03 — TRÊS AVALIADORES INDEPENDENTES SOBRE A V3

| | QA03-A | QA03-B | QA03-C |
|---|---|---|---|
| **Média geral (14 critérios)** | **8,2** | **7,0** | **6,8** |
| Média das dimensões NÃO travadas por insumo | **8,5** | **8,2** | — |
| Média das dimensões travadas por insumo | 7,6 | 4,9 | — |
| Teste dos 20 segundos | — | **3,2 / 5** | — |
| Teste do contrário (% de falha) | — | — | **64%** |
| Teste da substituição (% que sobrevive) | — | — | **84%** |
| Teto sem novos insumos | — | — | **7,9** |
| Decisão | Aprovar com correções | Reprovada para produção, aprovada como copy-base | Parte 1 aprovada com ressalvas, Parte 4 reprovada |

**MÉDIA CONSOLIDADA DO QA 03: 7,33**

## 10.1 Evolução das medições ao longo do processo

| Medição | V0 | V1 | V2 | V3 |
|---|---|---|---|---|
| Teste dos 20 segundos | 1,5 / 5 | 2,5 | 2,4 | **3,2** |
| Teste do contrário (% de falha) | ~80% | 37%* | 65% | **64%** |
| Teste da substituição (% que sobrevive) | ~85% | ~85% | 87% | **84%** |
| Decisor preencheria o formulário? | NÃO | SIM, de baixo valor | SIM | NÃO** |
| Ponto de abandono | fim da D05 | D10 | fim da D05 | **D10** |
| Afirmações não autorizadas | 0 | 14 | 3 | 3 |
| Teto sem insumos | — | ~7,2 | 7,6 | **7,9** |

\* o 37% da V1 foi comprado com as 14 afirmações inventadas; não é um resultado válido.
\*\* o "não" da V3 mudou de natureza: *"antes eu não entendia a empresa; agora entendo e não consigo dimensionar."*

## 10.2 O que o QA 03 aprovou

- **Primeira versão factualmente confiável do processo.** Os três avaliadores verificaram item a item.
- **§1 limpo:** zero resíduo de Stock Car em toda a página.
- **Teste dos 20 segundos no melhor resultado das quatro versões** (3,2/5 contra 1,5 da V0).
- **Retenção:** o ponto de abandono avançou cinco dobras em relação à V0.
- **A separação em partes destravou a avaliação da copy como copy.**
- **O título da D06** ("Reunir, receber, lançar e gravar — dentro do automobilismo") foi o maior ganho isolado da versão, obtido sem nenhum insumo novo: dá quatro ocasiões de compra em quatro verbos.
- **O formulário é a melhor peça do projeto** (9,0 na avaliação do decisor).
- **O anexo é o trecho mais acionável do documento.**
- **Não há problema estrutural de redação.** Arquitetura, lógica narrativa, voz e máquina de conversão estão corretas. (QA03-A)

## 10.3 A auditoria que reprovou os meus controles

O QA03-C verificou as 9 declarações da Parte 4 da V3 e **derrubou 5**:

| Declaração da V3 | Realidade |
|---|---|
| "Palavras de copy ~800" | 899 nas 11 dobras — subdeclarado |
| "Termos do §13 zerados: 8 de 11" | 7 — "Alta performance" tinha ficado num card da D09 |
| "Afirmações não autorizadas: 0" | 3 |
| "Frases que afirmam o que uma lacuna declara desconhecido: 0" | 4 |
| "Cards: 18" | 27 sob régua consistente; e a coluna do V0 usava régua diferente |

E encontrou duas falhas de integridade que repetem, em forma nova, exatamente o defeito que a V3 atribuía à V2:

1. **A linha "Saídas de baixo compromisso" foi deletada da tabela sem nota** — e era a única métrica que havia piorado.
2. **Um número histórico foi reescrito sem aviso** (travessões da V2, declarados 3 na época, registrados como 2 na tabela da V3).

Nada disso é erro de redação. É falha de controle de qualidade, e num documento cujo argumento é "refizemos os controles porque os anteriores mentiam", pesa mais do que pesaria em qualquer outro lugar.

## 10.4 Os dois problemas de redação que nenhum insumo resolve

Identificados pelo QA03-C e registrados como limitações assumidas na entrega final:

**1. Registro sintático uniforme.** A maior parte dos blocos em grid segue a mesma fôrma — nome em negrito seguido de aposto explicativo — todas as dobras têm a mesma silhueta, e os fechamentos em antítese se repetem. Não é ruim frase a frase; é uniforme. E uniformidade em escala é, ela própria, a assinatura de texto genérico que o §13 proíbe. Insumo novo só troca substantivos nos mesmos encaixes.
*Atacado parcialmente na entrega final: o grid da dobra 06 virou parágrafo.*

**2. A arquitetura garante que o ecossistema seja afirmado muitas vezes e demonstrado uma.** Uma dobra por frente força cada frente a se apresentar isolada. O case que vier do item 1 será uma dobra entre onze. É o que a Proposta 02 tateia, e é onde está o resto do teto.

## 10.5 A conclusão que os três compartilham

> **"O que falta para essa página gerar oportunidade comercial é 10% copy e 90% insumo."** (QA03-B — era 20/80 na rodada anterior; a proporção piorou, e isso é elogio: a redação gastou quase todo o estoque de ganho disponível.)

> **"Qualquer versão com diferenciação alta sem insumos novos deve ser tratada como suspeita de alucinação por construção."** (QA02-C)

> **"Os 7 itens bloqueantes sozinhos não chegam a 9,0. Com os insumos mais os P0 de redação, 9,0-9,1. Implicação prática: executar os P0 de redação agora, em paralelo ao envio do anexo."** (QA03-A)

---

# 11. PASSADA FINAL — CORREÇÕES APLICADAS

Executada a recomendação do QA03-A: correção em paralelo, sem esperar os insumos. Sem reescrita de substância, medida como rendimento zero em duas rodadas.

**Copy:**
- "e não numa sala" removido (afirmava onde o team building acontece)
- "Empresas de diferentes segmentos **encontram**" neutralizado na D10
- promessa operacional removida da D11 e do modal
- plural "carros" corrigido nos 3 lugares restantes
- eco literal entre o índice da D03 e o título da D05 desfeito
- título da D05 passa a nomear a Caterham, conforme pedido pelo decisor
- título da D10 escrito: "Projetos que já saíram daqui" — funciona com ou sem a lista de marcas, com alternativa registrada
- card "Alta performance" renomeado (termo vetado pelo §13)
- "Dias construídos para relacionamento" restaurado na D04-03
- quarta repetição da lista de ativos eliminada no apoio da D04
- grid da D06 convertido em parágrafo (quebra a silhueta repetida, reduz 5 blocos, preserva todos os usos do §9)
- saída de baixo compromisso restaurada na D11, agora sem depender de um PDF existir
- microcopy antifricção restaurado sob o CTA da D04, reduzido à parte verificável

**Anexo:** de 14 para 21 itens. Sete acrescentados, vindos do QA 03: **faixa de investimento** (a 4ª pergunta de um comitê de compras, que não estava mapeada em lugar nenhum), one-pager em PDF, existência das páginas Caterham e Bandeiras Empresarial, qualquer número validável, prova visual do lugar, local do team building, quantidade de carros, encontros entre empresas, e **lei de incentivo** — o projeto tem uma pasta de imagens sobre o tema que a copy ignora por completo, e essa frente, se existir, abre acesso a outra verba na empresa cliente.
Acrescentado também um **padrão de especificidade** no topo do anexo: sem ele, um case genérico e quatro linhas vagas preenchem formalmente os itens sem mover nenhuma medição.

**Controles:** todas as 9 declarações recontadas manualmente. Quatro estavam erradas e foram corrigidas na própria entrega: palavras (839 declarado → 978 medido), blocos em grid (régua unificada: 29 → 22), textos de botão (4 → 7) e "ecossistema" (11 → 9). A linha deletada foi restaurada, e as três observações sobre os defeitos das tabelas anteriores ficaram registradas na entrega.

---

# 12. VEREDITO FINAL

## STATUS: **NÃO APROVADA — FALTAM INSUMOS**

Conforme o §22 do briefing, que prevê exatamente este desfecho:

> **O limite atual da copy é causado por falta de insumos.**

### Gates do §22

| Gate | Exigido | Situação |
|---|---|---|
| Média geral | ≥ 9,0 | **7,33** (média das 10 dimensões não travadas por insumo: **8,2-8,5**) |
| Clareza | ≥ 9 | 8,7 |
| Posicionamento | ≥ 9 | 8,8 |
| Proposta de valor | ≥ 9 | 7,8 🔒 |
| Experiência de leitura | ≥ 9 | 8,2 |
| CTAs | ≥ 9 | 8,5 |
| Entendimento do ecossistema | ≥ 9 | 8,6 |
| Potencial comercial | ≥ 9 | 7,6 🔒 |
| Diferenciação | ≥ 8,5 | 7,5 🔒 |
| QAs independentes concluídos | ≥ 3 | **9 avaliações em 3 rodadas** ✅ |
| Regressões significativas | nenhuma | nenhuma remanescente ✅ |
| P0 abertos | nenhum | **8 bloqueantes, todos travados por insumo** |

🔒 = travado por falta de informação, não por erro de escrita.

**É proibido inflar a nota para concluir a tarefa.** Não foi inflada. A média caiu de 8,98 (a avaliação mais generosa da V1) para 7,33 porque as avaliações posteriores descobriram que a nota alta da V1 se apoiava em 14 afirmações inventadas e num controle de qualidade falso.

### O que trava, especificamente

Três das quatro dimensões que decidem se a página gera negócio — Proposta de valor, Diferenciação e Potencial comercial — não sobem por redação. A medição que prova isso é o teste da substituição: **84% do texto continua fazendo sentido se "Scuderia Bandeiras" for trocada por um autódromo, uma agência de eventos ou uma produtora.** Contra 85% do original.

Numa das versões intermediárias esse número caiu para 37%. A melhora vinha inteiramente de 14 afirmações que haviam sido inventadas. Removidas, o número voltou.

**Não é possível escrever diferenciação. Só é possível escrever a partir dela.**

### Projeção

| Cenário | Média projetada |
|---|---|
| Hoje | 7,33 |
| Respondidos os 8 itens bloqueantes | ~8,7 |
| Bloqueantes + itens de alto impacto | **9,0 — 9,1** |

Com uma ressalva do QA03-C que a Scuderia precisa levar a sério: **Diferenciação ≥ 8,5 é o gate que decide, e ele não depende de os insumos existirem — depende de serem específicos.** Um case genérico e quatro linhas do tipo "vencedor de diversas provas" entregam formalmente os itens e não movem nenhum décimo.

### As 8 perguntas que destravam o projeto

1. Um case em 3 linhas e um depoimento nomeado
2. Uma linha de fato verificável e autorizada para cada um dos quatro pilotos
3. O modelo de negócio da Caterham
4. O formato da Race Experience — inclusive se o convidado dirige ou é conduzido
5. A cidade e a estrutura do Bandeiras Empresarial
6. Quais pilotos podem ser prometidos nominalmente em proposta
7. A lista de marcas com uso de logo aprovado
8. A Scuderia compete em alguma categoria hoje?

A oitava é a que organiza todas as outras. Enquanto ela não for respondida, o decisor não sabe se está falando com uma equipe, um espaço, uma produtora ou uma agência — e, nas palavras da simulação, *"não sei de qual verba te pagar."*

### Recomendação de processo

Congelar a redação. Converter o anexo em pauta de **uma única reunião** com a Scuderia. Uma quarta reescrita completa destruiria mais do que corrigiria — foi o que aconteceu entre a V1 e a V2, e o QA mediu rendimento zero nas duas últimas tentativas de melhorar a voz sem informação nova.

**Duas ações que não dependem da Scuderia e valem a pena agora:**
- A **Proposta 02** (subir os quatro nomes para antes do ponto de abandono) é o maior retorno disponível sob controle do projeto. Responder o item 2 sem mover a faixa aproveita metade do ganho.
- Um **one-pager comercial em PDF**. Mesmo perfeita, uma home não sustenta uma reunião interna de alocação de verba. Sem essa segunda peça, todo lead depende de um vendedor sênior apresentar por telefone.

---

# 13. ÍNDICE DO PROCESSO

| Rodada | Agentes | Entregável | Média |
|---|---|---|---|
| 0 — Diagnóstico | Copy Chief · Estrategista de Marca · UX Writer/CRO · Advogado do Cliente · Crítico Cético · Benchmark Researcher | 15 P0 consolidados, 5 conflitos resolvidos, 18 referências internacionais lidas | baseline |
| 1 — V1 + QA 01 | 3 avaliadores independentes | 14 alucinações detectadas | 7,76 |
| 2 — V2 + QA 02 | 3 avaliadores independentes | sobrecorreção e 6 falhas de integridade detectadas | 7,27 |
| 3 — V3 + QA 03 | 3 avaliadores independentes | 5 de 9 declarações derrubadas; primeira versão factualmente confiável | 7,33 |
| Final | Editor-Chefe | 13 correções de copy, anexo de 14 → 21 itens, 4 métricas corrigidas | — |

**Total: 15 agentes, 9 avaliações independentes, 4 versões.**

A média não subiu em linha reta, e isso é o resultado mais honesto deste relatório: a V1 marcou 8,98 numa avaliação e caiu quando se descobriu que a nota se apoiava em invenção. **Cada queda de nota neste processo corresponde a uma descoberta, não a uma piora.**

---

# 14. QA 04 — AVALIAÇÃO DA VERSÃO FINAL

Três avaliadores foram lançados. **Dois falharam por limite de sessão da API** e não produziram relatório. Registrado aqui porque a média do QA 04 se apoia em uma única avaliação, não em três.

## QA04-A — lente geral e de regressão

| # | Dimensão | V3 | **Final** |
|---|---|---|---|
| 1 | Clareza | 8,7 | **8,8** |
| 2 | Posicionamento | 8,8 | **8,8** |
| 3 | Diferenciação 🔒 | 7,5 | **7,6** |
| 4 | Proposta de valor 🔒 | 7,8 | **7,9** |
| 5 | Hierarquia | 8,0 | **8,3** |
| 6 | Fluxo narrativo | 8,3 | **8,6** |
| 7 | Persuasão 🔒 | 7,4 | **7,5** |
| 8 | Escaneabilidade | 8,9 | **8,6** ↓ |
| 9 | CTAs | 8,5 | **8,8** |
| 10 | Consistência de voz | 8,4 | **8,3** ↓ |
| 11 | Redução de fricção | 8,2 | **8,6** |
| 12 | Experiência geral | 8,2 | **8,5** |
| 13 | Entendimento do ecossistema | 8,6 | **8,6** |
| 14 | Potencial comercial 🔒 | 7,6 | **7,8** |

**Média geral 8,3** · **dimensões não travadas por insumo 8,6** · travadas 7,7.
**Decisão: aprovar com correções.**

### O que o QA 04 confirmou

**As 13 correções anunciadas foram todas de fato aplicadas** — inédito neste processo, que vinha de duas rodadas seguidas de correções anunciadas e cumpridas pela metade.

Ganhos limpos verificados: título da D10 · eco D03↔D05 desfeito · "Dias construídos para relacionamento" restaurado · "Alta performance" renomeado · neutralização da D10 · saída de baixo compromisso na D11 · remoção de "e não numa sala" e da promessa operacional.

### O que o QA 04 derrubou

1. **"Sem compromisso." voltou ao ar com o item 18 em aberto** — é exatamente uma "frase que afirma o que uma lacuna declara desconhecido", linha que a Parte 4.1 declarava zerada. Duas das treze correções se anulavam em parte.
2. **A correção do plural "carros" virou apagamento do carro em toda a página**, inclusive no parágrafo da D03, onde a palavra não estava no plural e era o melhor substantivo concreto do texto.
3. **Erro de contagem de palavras.** A declaração "a contagem subiu, não caiu" estava errada. Verificação por script com régua única: **V0 1.176 → V3 1.028 → final 968**. A redução real sobre o original é de 18%, e não os 28% declarados. Os números "1.357", "~790", "~820" e "899" circularam por quatro versões sem que a mesma régua fosse aplicada duas vezes.
4. Ecos remanescentes: D03↔D06 ("a frente que recebe empresas"), eco interno na D04 e na D05.
5. "retoma o contato" (D11) — erro de registro introduzido na passada final.
6. **O destino do botão "Fale com o time" nunca foi definido** — nem na copy, nem no anexo. Se apontar para o mesmo formulário, deixa de ser saída de baixo compromisso e vira uma quinta porta idêntica, que foi exatamente o defeito da copy original.

### Correções aplicadas após o QA 04

Oito, todas sem depender de insumo: "Sem compromisso." marcado como condicional · carro devolvido à D03 no singular · eco D03↔D06 desfeito · inventário devolvido ao apoio da D04 sem ecoar o card 05 · duplicação nome/carro removida da D05 · título da D06 partido em título e subtítulo · "retoma" → "entra em contato" · item 22 aberto no anexo para o destino do botão.
Tabelas de volume refeitas por script, com régua única e as colunas V1/V2 deixadas vazias em vez de preenchidas com números não reproduzíveis.

### Veredito sobre o rendimento da redação

> *"Resta ganho por redação? Pouco e identificável: os oito P0 valem ~0,1–0,2, levando a redação a ~8,8. Acima disso o rendimento se esgotou — cada nova remoção de repetição já está custando especificidade equivalente, porque não há material novo para o lugar. **A distância até 9,0+ é inteiramente insumo.**"*

---

# 15. SITUAÇÃO ATUAL

| | Valor |
|---|---|
| Nota geral da versão final | **8,3** |
| Nota das dimensões que dependem de redação | **8,6** (projeção ~8,8 com as 8 correções aplicadas) |
| Nota das dimensões travadas por falta de informação | **7,7** |
| Gate do §22 | média ≥ 9,0 |
| Distância até o gate | **inteiramente insumo** |
| Avaliações independentes realizadas | **10**, em 4 rodadas |
| Insumos mapeados | **22**, sendo 8 bloqueantes |

**Documento de coleta:** `doc/INSUMOS-PARA-NOTA-9.md` — formulário preenchível, com padrão de especificidade definido item a item e mapa de qual insumo destrava qual critério.

Com os 8 bloqueantes respondidos, a projeção é **~8,7**. Com os itens de alto impacto, **9,0–9,1**.

---

# 16. RODADA V9→V10 — INSUMOS FINAIS DO CLIENTE + QA DE 3 AVALIADORES

O cliente entregou `doc/INSUMOS-FINAIS-SCUDERIA-CLAUDE.md`, respondendo a maior parte dos 8 bloqueantes da seção 15 — inclusive o item de prioridade máxima do projeto inteiro: **a Scuderia não disputa atualmente nenhuma categoria oficial**, confirmado, com autorização para nomear a Stock Car como credencial histórica. Também trouxe o case PETRONAS completo, disponibilidade comercial nominal dos 4 pilotos, definições que resolvem a colisão "Race Experience" vs. "Team Building", e números do Bandeiras Empresarial.

**V9** foi uma integração em passada única (sem QA), para priorizar velocidade de envio ao cliente. **V10** corrigiu isso: 3 avaliadores independentes (auditor factual, estrategista/decisor cético, revisor de forma/UX), sem contexto compartilhado entre si, revisaram a V9.

| Avaliador | Veredito | Achados |
|---|---|---|
| Auditor Factual | Aprovar com correções | 3 P0, 6 P1 — nenhuma alucinação de fato novo, mas 3 contradições internas/generalizações indevidas |
| Estrategista/Decisor cético | Aprovar com correções | notas 5-7/10; achados centrais: zero sinal de preço na página, tese do "ecossistema" apoiada em case único reaproveitado 2x |
| Revisor de Forma/UX | Aprovar com correções | 5 P0, 12 P1 — nota de prontidão 6/10 |

**Achado convergente (2 de 3 avaliadores, independentemente):** a colisão de nomenclatura "Race Experience" que a V9 declarava resolvida não estava de fato resolvida no texto — o select do formulário e um item da dobra 04 ainda reintroduziam o nome como rótulo autônomo.

Todas as correções foram aplicadas e estão documentadas na Parte 2 e 4 de `doc/COPY-SCUDERIA-FINAL.md` (V10). Diferente das rodadas V1-V8, nenhum avaliador desta rodada encontrou fato inventado — os problemas eram de execução (nomenclatura, contradição interna pontual, CTAs), não de invenção. Isso é o primeiro sinal, em 10 versões, de que o gargalo do projeto migrou definitivamente de "redação" para "insumo e decisão do cliente" — que é exatamente a conclusão que a seção 15 já projetava.

**Restam 8 itens bloqueantes** (Parte 3 da V10), dos quais os dois de maior impacto comercial, segundo o estrategista: faixa de investimento (zero sinal de preço na página inteira) e um segundo case nomeado (a tese central hoje se apoia só em PETRONAS, citado duas vezes).
