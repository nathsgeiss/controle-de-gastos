/* ===========================================================
   Bilheteria — primeira versão, com valores soltos.

   Repare na calcularPrecoDoIngresso(): TRÊS parâmetros. É o incômodo
   que leva aos objetos.
   =========================================================== */

const PRECO_INTEIRA = 32;
const CLASSIFICACAO = 14;


/* -----------------------------------------------------------
   Funções
   ----------------------------------------------------------- */

function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// A comparação já é true ou false: dá para devolver direto.
function temDireitoAMeia(idade, documento) {
    return idade < 18 || documento === 'estudante' || documento === 'professor';
}

function podeAssistir(idade, classificacao) {
    return idade >= classificacao;
}

// Três parâmetros: idade, documento e preço.
function calcularPrecoDoIngresso(idade, documento, precoInteira) {
    if (temDireitoAMeia(idade, documento)) {
        return precoInteira / 2;
    }
    return precoInteira;
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoNome = document.querySelector('.campo-nome');
const campoIdade = document.querySelector('.campo-idade');
const erro = document.querySelector('.erro');

const telaIngresso = document.querySelector('.ingresso');
const telaVendidos = document.querySelector('.vendidos');
const telaArrecadado = document.querySelector('.arrecadado');

let vendidos = 0;
let arrecadado = 0;


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    // :checked — a mesma pseudo-classe do CSS: o radio marcado
    const documento = document.querySelector('input[name="documento"]:checked').value;

    if (nome === '') {
        erro.textContent = 'Escreva o nome.';
    } else if (campoIdade.value === '' || idade < 1) {
        erro.textContent = 'Informe uma idade válida.';
    } else if (!podeAssistir(idade, CLASSIFICACAO)) {
        erro.textContent = '';
        telaIngresso.textContent = nome + ' tem ' + idade + ' anos. O filme é para maiores de ' + CLASSIFICACAO + '.';
        telaIngresso.classList.add('recusado');
    } else {
        erro.textContent = '';

        const preco = calcularPrecoDoIngresso(idade, documento, PRECO_INTEIRA);

        let tipo = 'inteira';
        if (temDireitoAMeia(idade, documento)) {
            tipo = 'meia-entrada';
        }

        vendidos = vendidos + 1;
        arrecadado = arrecadado + preco;

        telaIngresso.textContent = nome + ' · ' + tipo + ' · ' + formatarReais(preco);
        telaIngresso.classList.remove('recusado');
        telaVendidos.textContent = vendidos;
        telaArrecadado.textContent = formatarReais(arrecadado);

        campoNome.value = '';
        campoIdade.value = '';
    }
});
