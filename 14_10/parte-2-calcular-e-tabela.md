# Parte 2 — calcular a partir da lista

Na Parte 1, os gastos foram para uma lista. Mas o total e o maior gasto ainda
são **acumulados**: a cada gasto novo, o programa soma no total e compara com
o maior.

Agora imagine um botão **Desfazer último gasto**. Na lista, bastaria um
`pop()`. O histórico e a quantidade voltariam sozinhos, porque saem da lista.
Mas o total e o maior, não: eles estão guardados em variáveis que não sabem
que a lista mudou.

A solução é parar de guardar e passar a **calcular**: na hora de mostrar a
tela, percorrer a lista e descobrir o total e o maior a partir dela.

---

## Antes de começar: o exemplo do boletim

Abra a pasta `exemplo-boletim` no navegador e no VS Code. É uma página de
notas de uma turma que faz exatamente o que você vai fazer: a lista de notas
é a única coisa que o programa lembra, e média, maior e menor são calculados
a partir dela.

Use o botão **Remover última** e repare: a média, a maior e a menor nota se
ajustam sozinhas.

No `script.js` do boletim, encontre e leia com calma:

**Somar uma lista** (`calcularSoma`):

```js
function calcularSoma(notas) {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma = soma + notas[i].nota;
    }
    return soma;
}
```

É o acumulador de sempre, só que agora ele mora **dentro da função**, começa
em zero toda vez e percorre a lista inteira.

**Procurar o maior** (`encontrarMaiorNota`):

```js
function encontrarMaiorNota(notas) {
    let maior = notas[0];
    for (let i = 1; i < notas.length; i++) {
        if (notas[i].nota > maior.nota) {
            maior = notas[i];
        }
    }
    return maior;
}
```

Começa com o **primeiro** item da lista e compara com os outros, a partir do
segundo (`i = 1`). Devolve o objeto inteiro, para saber também de quem é a
nota.

**Procurar o menor** (`encontrarMenorNota`):

```js
function encontrarMenorNota(notas) {
    let menor = notas[0];
    for (let i = 1; i < notas.length; i++) {
        if (notas[i].nota < menor.nota) {
            menor = notas[i];
        }
    }
    return menor;
}
```

Compare com a anterior: é a mesma função, com **uma diferença só**, o sinal
da comparação. `>` procura o maior; `<` procura o menor.

Por que começar com `notas[0]`, e não com zero? Para o maior, zero até
funcionaria, porque toda nota é maior que zero. Mas para o menor, não: nenhuma
nota é menor que zero, e a função devolveria zero. Começando com o primeiro
item da lista, a função funciona para o maior e para o menor.

**Mostrar tudo** (`mostrarBoletim`): a função que calcula tudo e coloca na
tela. Todo botão termina chamando ela.

Teste no console do boletim antes de seguir:

| no console | deve devolver |
|---|---|
| `calcularSoma(notas)` | `58` |
| `encontrarMaiorNota(notas)` | o objeto do Fábio |
| `encontrarMenorNota(notas)` | o objeto do Hugo |

---

## Passo 1 — o total calculado

No controle de gastos, crie a `calcularTotal(gastos)`, como a
`calcularSoma()` do boletim.

| no console | deve devolver |
|---|---|
| `calcularTotal(gastos)` | `59.35`, depois da sequência de teste |

Use ela em todos os lugares que mostram o total: o resumo e o orçamento. No
fim, a variável `total` que ia somando não deve existir mais.

---

## Passo 2 — o maior calculado

Crie a `calcularMaiorGasto(gastos)`, como a `encontrarMaiorNota()`.

| no console | deve devolver |
|---|---|
| `calcularMaiorGasto(gastos)` | o objeto do cinema |

No fim, a variável `maiorGasto` também não deve existir mais. A única coisa
que o programa lembra é a lista.

---

## Passo 3 — o menor calculado

O resumo ganha um indicador novo, **Menor gasto**. Crie a
`calcularMenorGasto(gastos)`, como a `encontrarMenorNota()`.

| no console | deve devolver |
|---|---|
| `calcularMenorGasto(gastos)` | o objeto do ônibus |

Depois da sequência de teste, o resumo deve mostrar "ônibus — R$ 4,35".

---

## Passo 4 — desfazer

No cartão do histórico, um botão **Desfazer último gasto** tira o último
gasto da lista e mostra a tela de novo.

Depois de desfazer a pipoca:

| | deve aparecer |
|---|---|
| Total gasto | R$ 46,85 |
| Gastos registrados | 3 |
| Média por gasto | R$ 15,62 |
| Maior gasto | cinema — R$ 30,00 |
| Menor gasto | ônibus — R$ 4,35 |
| Orçamento | R$ 3,15 disponíveis |

Confira também:

- o vermelho do orçamento saiu?
- desfazendo tudo, o que aparece no maior e no menor gasto? (o boletim
  mostra "—")
- com a lista vazia, o botão Desfazer deveria funcionar?

---

## Passo 5 — o histórico em tabela

Troque a lista do histórico por uma tabela completa, como a do boletim:

| parte | o que é |
|---|---|
| `<caption>` | o título da tabela |
| `<thead>` | a linha de cabeçalho: #, Descrição, Valor |
| `<tbody>` | uma linha para cada gasto, montada pelo JavaScript |
| `<tfoot>` | o rodapé, com o total |

Repare no rodapé do boletim: `colspan="2"` faz uma célula ocupar duas
colunas.

Para conferir: o total do rodapé bate com o total do resumo? E continua
batendo depois de desfazer?

---

## Se sobrar tempo

- **As categorias.** Desfaça a pipoca e olhe o cartão "Por categoria":
  Alimentação deveria voltar para R$ 12,50. Voltou? Se não voltou, faça o
  total de cada categoria também ser calculado a partir da lista. Dica: o
  gasto precisa saber de qual categoria ele é.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
