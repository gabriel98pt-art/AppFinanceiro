---
name: diario-melhorias
description: Adiciona uma entrada no topo de MELHORIAS.md descrevendo uma mudança positiva feita na AppFinanceiro (financas.html) ou no separador TVDE. Usar sempre que terminar de implementar e testar uma melhoria/correção visível pro utilizador nesse projeto — não usar para tarefas internas (refactor sem efeito visível, config, docs).
---

# Diário de melhorias

`MELHORIAS.md`, na raiz do projeto, é um diário local (fora do git) de tudo que melhorou na app, em linguagem simples — não é um changelog técnico.

## Quando usar

Depois de terminar e confirmar (testado) uma mudança que um utilizador notaria: uma correção de bug, uma funcionalidade nova, uma melhoria de usabilidade. Não usar para mudanças que não afetam quem usa a app (ex: só organização interna do código, hooks, CI).

## Como escrever a entrada

1. Ler o topo de `MELHORIAS.md` para conferir o formato mais recente e não repetir o que já está lá.
2. Pegar a data de hoje e, se a mudança já foi commitada, o hash curto do commit (`git log -1 --format=%h`).
3. Escrever no formato:

```
## DD/MM/AAAA — AppFinanceiro: título curto da mudança (`hash`)
- **Frase de efeito em negrito** — explicação simples do que mudou, sem termos técnicos (nada de "refactor", "hook", "state", nomes de função). Escreve como se estivesses a explicar pro dono da app, focando no que ele vai notar/ganhar.
- Uma segunda bullet se houver mais de um efeito notável na mesma mudança.
```

Se a mudança for no separador TVDE, usar `## DD/MM/AAAA — TVDE (AppFinanceiro): título` (padrão já usado nas entradas antigas).

4. Inserir a entrada **logo depois da linha `---`** do cabeçalho (ou seja, no topo da lista, antes de todas as outras entradas) — nunca no fim do ficheiro.
5. Não adicionar entrada nenhuma se a tarefa não passou de testada/confirmada, ou se for um assunto puramente técnico sem efeito perceptível pro utilizador.
