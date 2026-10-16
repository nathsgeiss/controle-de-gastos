# Parte 1 — os gastos numa lista

Vamos levar a playlist para o controle de gastos: os gastos passam a ficar
numa lista, como as músicas da fila.

Teste com a sequência de sempre:

| descrição | valor | categoria |
|---|---|---|
| lanche | 12.50 | Alimentação |
| ônibus | 4.35 | Transporte |
| cinema | 30.00 | Lazer |
| pipoca | 12.50 | Alimentação |

O resumo não pode mudar:

| | depois dos quatro |
|---|---|
| Total gasto | R$ 59,35 |
| Gastos registrados | 4 |
| Média por gasto | R$ 14,84 |
| Maior gasto | cinema — R$ 30,00 |
| Orçamento | Passou R$ 9,35 do orçamento |

---

## Passo 1 — a lista de gastos

Crie uma lista vazia, `gastos`, e a cada gasto adicionado, coloque o objeto
do gasto nela.

Para conferir: depois da sequência de teste, digite `gastos` no console. Deve
aparecer uma lista com 4 objetos, na ordem em que foram adicionados. E
`gastos[2]` deve ser o cinema.

---

## Passo 2 — o histórico como lista

Hoje o histórico é um texto que vai crescendo. Troque por uma lista numerada
no HTML, montada a partir dos gastos, como a fila da playlist:

```
1. lanche — R$ 12,50
2. ônibus — R$ 4,35
3. cinema — R$ 30,00
4. pipoca — R$ 12,50
```

No CSS, as linhas pares ganham um fundo diferente.

No fim, a variável do histórico não deve existir mais: ele sai da lista.

---

## Passo 3 — quantos gastos

Na playlist, a contagem de músicas vinha do tamanho da fila. Faça o mesmo com
a quantidade de gastos.

No fim, a variável da quantidade também não deve existir mais.

---

## Terminou?

Faça o commit e passe para a **Parte 2**.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
