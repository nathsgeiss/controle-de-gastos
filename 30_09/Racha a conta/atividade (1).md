# Pra onde foi meu dinheiro? — funções

Vamos levar para o controle de gastos o que fizemos no Racha a conta.

Isto é uma **refatoração**: o código muda por dentro e a tela continua
exatamente igual. Depois de cada parte, teste com a sequência de sempre e
confira que nada mudou:

| descrição | valor |
|---|---|
| lanche | 12.50 |
| ônibus | 4.35 |
| cinema | 30.00 |
| pipoca | 12.50 |

**Toda função nova é testada no console antes de ser usada na tela.** Cada
parte traz as chamadas para testar e o que elas devem devolver.

Declare as funções no começo do `script.js`, antes dos `querySelector`.

---

## Parte 1 — formatarReais()

Traga a `formatarReais()` do Racha a conta e use em **todos** os lugares onde
um valor aparece formatado.

Antes de começar, conte quantas vezes o `.toFixed(2).replace('.', ',')`
aparece no seu código. No fim, deve sobrar uma só: a de dentro da função.

| no console | deve devolver |
|---|---|
| `formatarReais(12.5)` | `'R$ 12,50'` |
| `formatarReais(1375)` | `'R$ 1.375,00'` |

Para ver os milhares funcionando no projeto, adicione um gasto de 1000.

---

## Parte 2 — calcularMedia()

Crie uma função que recebe o total e a quantidade e devolve a média.

| no console | deve devolver |
|---|---|
| `calcularMedia(59.35, 4)` | `14.8375` |
| `calcularMedia(30, 2)` | `15` |
| `calcularMedia(0, 0)` | `0` |

A última linha é a difícil. O que acontece sem nenhum cuidado? Teste antes de
resolver.

---

## Parte 3 — textoDoGasto()

Crie uma função que recebe a descrição e o valor e devolve o texto do gasto:

| no console | deve devolver |
|---|---|
| `textoDoGasto('cinema', 30)` | `'cinema — R$ 30,00'` |
| `textoDoGasto('ônibus', 4.35)` | `'ônibus — R$ 4,35'` |

Ela pode usar a `formatarReais()` lá dentro.

Procure no seu código: em quantos lugares esse formato aparece?

---

## Parte 4 — mensagemDoOrcamento()

Crie uma função que recebe o quanto sobra do orçamento e devolve a frase
que aparece na tela:

| no console | deve devolver |
|---|---|
| `mensagemDoOrcamento(37.5)` | `'R$ 37,50 disponíveis'` |
| `mensagemDoOrcamento(0)` | `'R$ 0,00 disponíveis'` |
| `mensagemDoOrcamento(-9.35)` | `'Passou R$ 9,35 do orçamento'` |

Essa função devolve um texto. Ela não mexe na tela, nem nas classes.

---

## Parte 5 — variáveis CSS

Abra o `style.css` e procure as cores que se repetem.

Crie uma variável para cada uma no `:root` e troque todas as repetições.
Para conferir, mude o valor de uma variável: todos os lugares daquela cor
devem mudar juntos. Depois volte a cor original.

---

## Se sobrar tempo

- **Fez o menor gasto?** Ele pode usar a `textoDoGasto()`.
- **Fez a porcentagem do orçamento?** Crie a `calcularPorcentagem(total, orcamento)`.
  `calcularPorcentagem(59.35, 50)` deve devolver `118.7`.
- **Fez os gastinhos?** Crie a `ehGastoPequeno(valor)`. O que ela deveria
  devolver?

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
