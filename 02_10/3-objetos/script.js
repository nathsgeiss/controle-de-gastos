/* ===========================================================
   Bilheteria — com objetos.

   pessoa e filme agrupam o que pertence junto. Toda função
   recebe no máximo dois parâmetros. O filme tem propriedades
   de três tipos: texto, número e booleano.
   =========================================================== */

const FILME = {
    titulo: 'Duna: Parte Dois',   // texto
    genero: 'Ficção científica',  // texto
    duracao: 166,                 // número, em minutos
    classificacao: 14,            // número, idade mínima
    preco: 32,                    // número, a inteira em 2D
    legendado: true,              // booleano: legendado ou dublado
    em3D: false                   // booleano: 3D custa R$ 8,00 a mais
};

/* -----------------------------------------------------------
   Funções que só devolvem (puras)
   ----------------------------------------------------------- */

function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// temDireitoAMeia({ idade: 20, documento: 'estudante' }) → true
function temDireitoAMeia(pessoa) {
    return pessoa.idade < 18 || pessoa.documento === 'estudante' || pessoa.documento === 'professor';
}

function podeAssistir(pessoa, filme) {
    return pessoa.idade >= filme.classificacao;
}

// formatarDuracao(166) → '2h46'    formatarDuracao(127) → '2h07'
function formatarDuracao(minutos) {
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    if (resto < 10) {
        return horas + 'h0' + resto;
    }
    return horas + 'h' + resto;
}

// 'Ficção científica · 2h46 · Legendado'
function montarDetalhesDoFilme(filme) {
    let idioma = 'Dublado';
    if (filme.legendado) {
        idioma = 'Legendado';
    }

    let detalhes = filme.genero + ' · ' + formatarDuracao(filme.duracao) + ' · ' + idioma;
    if (filme.em3D) {
        detalhes = detalhes + ' · 3D';
    }
    return detalhes;
}

// O 3D custa R$ 8,00 a mais.
function calcularPrecoDaInteira(filme) {
    if (filme.em3D) {
        return filme.preco + 8;
    }
    return filme.preco;
}

function calcularPrecoDoIngresso(pessoa, filme) {
    if (temDireitoAMeia(pessoa)) {
        return calcularPrecoDaInteira(filme) / 2;
    }
    return calcularPrecoDaInteira(filme);
}

// 'Ana · meia-entrada · R$ 16,00'
function montarTextoDoIngresso(pessoa, filme) {
    let tipo = 'inteira';
    if (temDireitoAMeia(pessoa)) {
        tipo = 'meia-entrada';
    }
    return pessoa.nome + ' · ' + tipo + ' · ' + formatarReais(calcularPrecoDoIngresso(pessoa, filme));
}

function montarTextoDaRecusa(pessoa, filme) {
    return pessoa.nome + ' tem ' + pessoa.idade + ' anos. O filme é para maiores de ' + filme.classificacao + '.';
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

const telaTitulo = document.querySelector('.titulo-filme');
const telaClassificacao = document.querySelector('.classificacao-filme');
const telaDetalhes = document.querySelector('.detalhes-filme');
const telaPreco = document.querySelector('.preco-filme');

let vendidos = 0;
let arrecadado = 0;


/* -----------------------------------------------------------
   Funções que mexem na tela
   ----------------------------------------------------------- */

function mostrarFilme(filme) {
    telaTitulo.textContent = filme.titulo;
    telaClassificacao.textContent = filme.classificacao;
    telaDetalhes.textContent = montarDetalhesDoFilme(filme);
    telaPreco.textContent = formatarReais(calcularPrecoDaInteira(filme));
}

mostrarFilme(FILME);


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const pessoa = {
        nome: campoNome.value.trim(),
        idade: Number(campoIdade.value),
        documento: document.querySelector('input[name="documento"]:checked').value
    };

    if (pessoa.nome === '') {
        erro.textContent = 'Escreva o nome.';
    } else if (campoIdade.value === '' || pessoa.idade < 1) {
        erro.textContent = 'Informe uma idade válida.';
    } else if (!podeAssistir(pessoa, FILME)) {
        erro.textContent = '';
        telaIngresso.textContent = montarTextoDaRecusa(pessoa, FILME);
        telaIngresso.classList.add('recusado');
    } else {
        erro.textContent = '';

        vendidos = vendidos + 1;
        arrecadado = arrecadado + calcularPrecoDoIngresso(pessoa, FILME);

        telaIngresso.textContent = montarTextoDoIngresso(pessoa, FILME);
        telaIngresso.classList.remove('recusado');
        telaVendidos.textContent = vendidos;
        telaArrecadado.textContent = formatarReais(arrecadado);

        campoNome.value = '';
        campoIdade.value = '';
    }
});
