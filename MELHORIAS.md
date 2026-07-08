# 📒 Diário de melhorias — TVDE & Finanças

Anotação corrida de todas as mudanças positivas nas apps (Controle Motorista antiga e separador TVDE da AppFinanceiro).
**As novas entram no topo**, com data, app e uma linha simples do que melhorou. Ficheiro local, fora do git.

---

## 08/07/2026 — TVDE (AppFinanceiro): lançar valor certo nas finanças
- **Corrigido o valor lançado como receita** — o botão 💰 lançava o "lucro bruto" (que já descontava a recarga própria e somava o Extra), mas o que a plataforma realmente deposita na conta é a **Receita** (faturamento menos tudo, exceto a recarga própria — que o motorista paga à parte). Semana e Mês passaram a lançar a Receita; o Lucro continua visível só para acompanhar a meta. Tabela de Meses ganhou a coluna Receita para comparar os dois valores.

## 08/07/2026 — TVDE (AppFinanceiro)
- **Melhor aproveitamento do ecrã grande** — no computador (≥900px), o TVDE deixou de ser uma coluna única esticada: Resumo mostra lucro e metas lado a lado (gráfico e performance a toda a largura, mini-cartões numa linha), a lista de Semanas ficou em 2 colunas, as tabelas de Meses e Períodos ficaram lado a lado, e em Ajustes os Parâmetros ficam ao lado dos Dados. No telemóvel nada mudou.

## 07/07/2026 — TVDE (AppFinanceiro)
- **Mini-cartões independentes dos valores** — cada parte da janela da semana escolhe-se por si; os 4 cartões ficaram: Horas · Por hora · Viagens · Por viagem (podem trocar-se tocando neles na pré-visualização de Ajustes). `ba3ee4c`

## 07/07/2026 — Fusão: Controle Motorista → separador TVDE na AppFinanceiro
- **Novo separador 🚕 TVDE** dentro da app finanças, protegido pelo login, com Resumo · Semanas · Meses · Ajustes. `c5460a9`
- **Dados na nuvem** — o TVDE passou a sincronizar no Firebase junto com as finanças (antes vivia só num navegador). `c5460a9`
- **Importação do backup** da app antiga com resumo e confirmação antes de gravar (nº de semanas, períodos, totais). `c5460a9`
- **Editor de semana** com cálculo ao vivo, meses/períodos com Seg. Social editável, resumo com metas por ritmo (sem. X/4) e tendência das últimas 4 semanas. `0ac99cf`
- **Ajustes completos** (campos, quadros, contas, pré-visualização ao vivo) com a regra "desligado some de tudo, nada se apaga". `a629dc6`
- **💰 Lançar lucro nas finanças** — botão na semana e no mês cria uma receita (origem TVDE); sempre manual, com confirmação, marca de ✓ já lançado e aviso anti-duplicação; o ↩ Desfazer reverte tudo. `f605b63`
- **Desfazer unificado** — qualquer ação TVDE entra no ↩/↪ do topo da app finanças.
- A app antiga continua intacta, a funcionar em paralelo; os backups .json são compatíveis nos dois sentidos.

## 07/07/2026 — Controle Motorista (app antiga)
- **Backup a sério** — cópia .json exportada do Safari e guardada fora do navegador (Transferências); foi ela que alimentou a fusão.
- **Privacidade** — os valores reais da planilha saíram de dentro do ficheiro da app (restauração passa pelo backup); botão de reset renomeado para "Apagar tudo e recomeçar do zero".
- **Ícone** próprio (🚕) no separador do navegador.

## 06/07/2026 — Controle Motorista: personalização total da janela da semana
- **Regra única** — campo desligado em Ajustes some da app INTEIRA (formulário, consulta, listas, resumo, tabelas, parâmetros), mas nada se apaga: valores antigos continuam nas contas e voltam ao religar; CSVs mantêm sempre todas as colunas.
- **Guardar sem sustos** — campos escondidos preservam o valor gravado ao guardar a semana (nunca zeram às escondidas).
- **Resultado linha a linha** — % Frota, Receita, Custos e Lucro bruto com interruptor e ordem individuais; lucro bruto sem repetição (já está no destaque).
- **Pré-visualização ao vivo em Ajustes** — controlos à esquerda, preview fixo à direita; usa o mesmo desenho da janela real (nunca mente).
- **Mini-cartões com 8 métricas** — toque troca a métrica (só no preview; na janela da semana nada é clicável por engano).
- **Cartão único "Janela da semana"** em Ajustes juntando quadros + campos, com menos scroll.
- **Quadros reordenáveis** — a ordem dos blocos da consulta (destaque, mini-cartões, valores, resultado) é escolhida pelo utilizador.
- **Visual da consulta** — lucro em destaque com cor da meta, custos a vermelho SEM sinal −, extra a verde com +, custos totais com % do faturamento ao lado.
- **Campos configuráveis** — ligar/desligar e ordenar o que o formulário pergunta (Faturamento fixo).

## 06/07/2026 — Controle Motorista: consulta e navegação
- **Clique na semana abre consulta só-leitura** com botão "✏️ Editar" — acabou o risco de alterar sem querer.
- **"＋ Nova semana" discreto no topo** do cartão, em vez do botão grande no fundo.

## 06/07/2026 — Controle Motorista: nascimento
- App criada a partir da planilha Google "Controle Motorista": ficheiro único, tema escuro "painel noturno" com âmbar, fórmulas da planilha replicadas (receita, lucro bruto, gorjetas só anotação, % frota por semana, mês de pagamento, períodos de 4 semanas), 17 semanas importadas, metas por ritmo, tendência, CSV para Excel/Sheets, backups.
