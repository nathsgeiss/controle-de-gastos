# Pra onde foi meu dinheiro? — o resumo completo

O total e o maior gasto já funcionam. Agora vamos completar o resumo e
colocar um limite de gastos na semana.

São quatro partes. **Antes de digitar cada uma**, resolva no caderno:

- o que o programa precisa lembrar entre um gasto e outro?
- com que valor isso começa?
- o que muda a cada gasto adicionado?

E faça o teste de mesa com a sequência abaixo. Só depois vá para o teclado.

---

## A sequência para testar

Use sempre estes quatro gastos, nesta ordem:

| descrição | valor |
|---|---|
| lanche | 12.50 |
| ônibus | 4.35 |
| cinema | 30.00 |
| pipoca | 12.50 |

Depois dos quatro, a tela deve mostrar:

| | |
|---|---|
| Total gasto | R$ 59,35 |
| Gastos registrados | 4 |
| Média por gasto | R$ 14,84 |
| Maior gasto | cinema — R$ 30,00 |
| Orçamento | Passou R$ 9,35 do orçamento |

---

## Parte 1 — quantos gastos

Mostre quantos gastos já foram registrados.

Gastos recusados pela validação não contam.

---

## Parte 2 — a média

Mostre a média por gasto, com duas casas decimais.

Pense em qual conta dá a média. E pense também: a média precisa ser
**lembrada** entre um gasto e outro, ou dá para **calcular na hora**?

---

## Parte 3 — o histórico

Troque o "Nenhum gasto ainda." pela lista de tudo o que foi adicionado, um
por linha:

```
lanche — R$ 12,50
ônibus — R$ 4,35
cinema — R$ 30,00
pipoca — R$ 12,50
```

É o mesmo padrão do acumulador, só que com texto. E o `\n` dentro do texto
vira quebra de linha na tela.

---

## Parte 4 — o orçamento da semana

O orçamento da semana é de **R$ 50,00**. Crie uma constante para ele.

Depois de cada gasto, mostre quanto ainda sobra:

| depois de | deve aparecer |
|---|---|
| lanche | R$ 37,50 disponíveis |
| ônibus | R$ 33,15 disponíveis |
| cinema | R$ 3,15 disponíveis |
| pipoca | Passou R$ 9,35 do orçamento |

Repare que a frase muda quando o orçamento estoura. E o valor que aparece
depois de "Passou" é positivo, mesmo que a conta dê negativa.

**Quando o orçamento estourar, o total e a frase ficam vermelhos.** O CSS já
está pronto: basta colocar a classe `estourado` nos dois elementos.

Para pensar no caderno: se um dia der para apagar um gasto e o total voltar
para baixo do orçamento, o vermelho precisa sair. O seu código já está
preparado para isso?

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto.
