# Pra onde foi meu dinheiro? — objetos e arrays

Vamos levar para o controle de gastos o que fizemos na Bilheteria: o gasto vira
objeto, o botão espera o formulário completo e, como os filmes, os gastos
ganham categorias, cada uma com o próprio total.

Teste sempre com a sequência de sempre, agora com categoria:

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

Toda função nova é testada no console antes de ser usada na tela, e todo nome
de função começa com um verbo que diz o que ela faz.

---

## Parte 0 — nomes que dizem o que fazem

Duas funções de 30/09 têm nome de coisa, não de ação: `textoDoGasto()` e
`mensagemDoOrcamento()`. Renomeie as duas para `montarTextoDoGasto()` e
`montarMensagemDoOrcamento()`.

Para não esquecer nenhuma chamada: no VS Code, clique no nome da função e
aperte **F2**. Ele troca o nome na declaração e em todas as chamadas de uma
vez.

---

## Parte 1 — o gasto vira objeto

Descrição e valor descrevem uma coisa só: o gasto. No ouvinte, junte os dois
num objeto `gasto`, e use `gasto.descricao` e `gasto.valor` daí em diante.

Depois mude a `montarTextoDoGasto()` para receber o gasto inteiro:

| no console | deve devolver |
|---|---|
| `montarTextoDoGasto({ descricao: 'cinema', valor: 30 })` | `'cinema — R$ 30,00'` |

**O maior gasto.** Hoje ele usa duas variáveis que precisam mudar sempre
juntas. Troque as duas por uma só, `maiorGasto`, que guarda o gasto inteiro.

Pense no caderno: com que valor o `maiorGasto` começa?

---

## Parte 2 — o botão que espera

O botão Adicionar só pode ficar ativo quando a descrição **e** o valor
estiverem preenchidos.

Crie a função:

| no console | deve devolver |
|---|---|
| `podeAdicionar('lanche', '12.50')` | `true` |
| `podeAdicionar('', '12.50')` | `false` |
| `podeAdicionar('   ', '12.50')` | `false` |
| `podeAdicionar('lanche', '')` | `false` |

Depois use essa função para desabilitar o botão enquanto a pessoa digita. E no
CSS, deixe o botão desabilitado com cara de desabilitado.

Confira estas três situações:

- a página acabou de abrir: o botão está desabilitado?
- você adicionou um gasto e os campos foram limpos: o botão voltou a ficar
  desabilitado?
- o mouse passa por cima do botão desabilitado: ele muda de cor?

Com o botão desabilitado, algumas mensagens de erro nunca mais vão aparecer.
Quais? Ainda faz sentido manter essas mensagens no código?

---

## Parte 3 — categorias

Cada gasto passa a ter uma categoria: Alimentação, Transporte ou Lazer. E a
página mostra quanto foi gasto em cada uma.

Depois da sequência de teste:

| categoria | total |
|---|---|
| Alimentação | R$ 25,00 |
| Transporte | R$ 4,35 |
| Lazer | R$ 30,00 |

**No HTML e no CSS:** um campo de escolha da categoria no formulário, e um
cartão novo, "Por categoria", para a lista de totais. O cartão precisa caber
no layout do celular e do computador.

**No JavaScript:** as categorias ficam numa lista de objetos, e cada categoria
guarda o próprio total, como cada filme guardava as próprias vendas.

As opções do campo e a lista de totais são montadas pelo JavaScript, a partir
da lista. Para conferir: acrescente uma quarta categoria só no JavaScript. Ela
deve aparecer no campo e no cartão sem mudar mais nada.

Pense no caderno antes:

- o que cada objeto de categoria precisa guardar?
- quando um gasto é adicionado, qual categoria muda, e o que muda nela?
- em que momento a lista de totais precisa ser mostrada de novo?

---

## Se sobrar tempo

- **Qual categoria pesou mais?** Mostre o nome da categoria com o maior total.
  É o maior gasto de 28/09, agora percorrendo a lista.
- **O ouvinte enxuto.** Separe o ouvinte em funções, até ele ser lido como uma
  lista de tarefas: `registrarGasto(gasto)`, `mostrarResumo()`,
  `mostrarOrcamento()`, `limparFormulario()`. Para cada função, responda no
  caderno: ela só devolve um valor, ou mexe em alguma coisa?
- **Foco visível.** Use a página só com o teclado. Dá para ver onde você está?
  Use o `:focus-visible` nos campos e no botão.
- **Na Bilheteria:** acrescente a cada filme o horário da sessão e a sala, e
  mostre os dois no cartaz a partir do objeto.

---

## Para entregar

Faça o commit e envie o controle de gastos para o GitHub, mesmo que
incompleto.
