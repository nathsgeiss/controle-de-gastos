/* ===========================================================
   Pra onde foi meu dinheiro?

   Estado do código ao fim da parte guiada: o total, a
   validação e o maior gasto.
   =========================================================== */


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */
function formatarReais(valor) { // lowerCamelCase
    // return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    console.log(`valor: ${valor}`);
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularMedia(valorTotal, quantidade){
   return valorTotal / quantidade;
}

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');

const quantidade = document.querySelector('.quantidade');
const media = document.querySelector('.media');
const historico = document.querySelector('.historico');
const restante = document.querySelector('.restante');

/* -----------------------------------------------------------
   O que o programa precisa lembrar entre um gasto e outro.

   Ficam FORA do ouvinte: se ficassem dentro, nasceriam de
   novo a cada gasto e o total nunca passaria de um valor.
   ----------------------------------------------------------- */

let total = 0;
let maiorValor = 0;
let maiorDescricao = '';
let gastosRegistrados = 0;
let mediaGastos = 0;
let txt = '';

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

        gastosRegistrados = gastosRegistrados + 1;
        //ou gastosRegistrados++;
        //ou gastorsRegistrados += 1;

        //mediaGastos = total / gastosRegistrados


        txt = txt + descricao + formatarReais(valor) + '\n';

        // o maior gasto
        /* Se o maior mudou, a descrição muda junto.
           Com > (e não >=), em caso de empate fica o
           primeiro gasto que chegou naquele valor. */
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }

        // mostrar na tela
        telaTotal.textContent = formatarReais(total);
        telaMaior.textContent = maiorDescricao + formatarReais(maiorValor);
        quantidade.textContent = gastosRegistrados;
        media.textContent = formatarReais(calcularMedia(total, gastosRegistrados));
        historico.textContent = txt;
        restante.textContent = `R$ ${(50-total).toFixed(2).replace('.', ',')} disponíveis`;

        if ((50-total) < 0){
         console.log("entrou no if da linha 98");
         restante.classList.add ("estourado");
         // Transforma o valor negativo em positivo e muda o texto
            let valorPassou = (50-total) * -1;
            restante.textContent = `Passou R$ ${valorPassou.toFixed(2).replace('.', ',')} do orçamento`;
        }

        if (total > 50){
         console.log("entra no if da linha 103");
         telaTotal.classList.add ("estourado");
        }

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
    }

});