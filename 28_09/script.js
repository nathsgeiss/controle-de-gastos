/* ===========================================================
   Pra onde foi meu dinheiro?

   Estado do código ao fim da parte guiada: o total, a
   validação e o maior gasto.
   =========================================================== */


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');


/* -----------------------------------------------------------
   O que o programa precisa lembrar entre um gasto e outro.

   Ficam FORA do ouvinte: se ficassem dentro, nasceriam de
   novo a cada gasto e o total nunca passaria de um valor.
   ----------------------------------------------------------- */

let total = 0;
let maiorValor = 0;
let maiorDescricao = '';


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {

    /* Sem esta linha, o formulário tenta enviar os dados e a
       página recarrega — e tudo o que foi somado some. */
    evento.preventDefault();

    /* trim() tira os espaços do começo e do fim. Sem ele, uma
       descrição com três espaços passaria na validação. */
    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    /* Validação: o primeiro teste verdadeiro para a cadeia.
       Só chega no else quem passou por todos. */
    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '') {
        erro.textContent = 'Informe o valor.';
    } else if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {

        erro.textContent = '';

        // o total
        total = total + valor;

        // o maior gasto
        /* Se o maior mudou, a descrição muda junto.
           Com > (e não >=), em caso de empate fica o
           primeiro gasto que chegou naquele valor. */
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }

        // mostrar na tela
        telaTotal.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
        telaMaior.textContent = maiorDescricao + ' — R$ ' + maiorValor.toFixed(2).replace('.', ',');

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
    }

});