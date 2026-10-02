/* ===========================================================
   Pra onde foi meu dinheiro?
   =========================================================== */

/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */
function formatarReais(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularMedia(valorTotal, quantidade){
    return valorTotal / quantidade;
}

function montarTextoDoGasto(gasto) {
    return `${gasto.descricao} — ${formatarReais(gasto.valor)}`;
}

function montarMensagemDoOrcamento(restante) {
    if (restante >= 0) {
        return formatarReais(restante) + ' disponíveis';
    }
    return 'Passou ' + formatarReais(-restante) + ' do orçamento';
}

// Função solicitada pela Parte 2
function podeAdicionar(descricao, valor) {
    return descricao.trim() !== '' && valor !== '';
}

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const botaoAdicionar = document.querySelector('.formulario button'); // Seleciona o botão
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');

const quantidade = document.querySelector('.quantidade');
const media = document.querySelector('.media');
const historico = document.querySelector('.historico');
const restante = document.querySelector('.restante');

/* -----------------------------------------------------------
   Atualizar estado do botão
   ----------------------------------------------------------- */
function atualizarEstadoDoBotao() {
    // Se NÃO pode adicionar, desabilita o botão
    botaoAdicionar.disabled = !podeAdicionar(campoDescricao.value, campoValor.value);
}

// Ouve as digitações nos campos
campoDescricao.addEventListener('input', atualizarEstadoDoBotao);
campoValor.addEventListener('input', atualizarEstadoDoBotao);

/* -----------------------------------------------------------
   O que o programa precisa lembrar
   ----------------------------------------------------------- */

let total = 0;
let maiorGasto = {
    descricao: '',
    valor: 0
};
let gastosRegistrados = 0;
let txt = '';

// Estado inicial do botão ao carregar a página
atualizarEstadoDoBotao();

/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    // Como o botão só é clicável com ambos preenchidos,
    // ainda validamos se o valor é maior que zero.
    if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {
        erro.textContent = '';

        const gasto = {
            descricao: descricao,
            valor: valor
        };

        total = total + gasto.valor;
        gastosRegistrados = gastosRegistrados + 1;

        txt = txt + montarTextoDoGasto(gasto) + '\n';

        if (gasto.valor > maiorGasto.valor) {
            maiorGasto = gasto;
        }

        telaTotal.textContent = formatarReais(total);
        telaMaior.textContent = montarTextoDoGasto(maiorGasto);
        quantidade.textContent = gastosRegistrados;
        media.textContent = formatarReais(calcularMedia(total, gastosRegistrados));
        historico.textContent = txt;
        
        const valorRestante = 50 - total;
        restante.textContent = montarMensagemDoOrcamento(valorRestante);

        if (valorRestante < 0){
            restante.classList.add("estourado");
        }

        if (total > 50){
            telaTotal.classList.add("estourado");
        }

        // Limpar os campos para o próximo envio
        campoDescricao.value = '';
        campoValor.value = '';

        // Garante que o botão volte a ficar desabilitado após limpar os campos
        atualizarEstadoDoBotao();
    }
});