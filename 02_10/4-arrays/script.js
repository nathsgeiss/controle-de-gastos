/* ===========================================================
   Bilheteria — com objetos e a lista de filmes.

   pessoa e filme agrupam o que pertence junto. Toda função
   recebe no máximo dois parâmetros. O filme tem propriedades
   de três tipos: texto, número e booleano.

   Os filmes ficam numa lista (array). O select guarda a
   posição do filme escolhido.
   =========================================================== */

const FILMES = [
    {
        titulo: 'Duna: Parte Dois',
        genero: 'Ficção científica',
        duracao: 166,
        classificacao: 14,
        preco: 32,
        legendado: true,
        em3D: false
    },
    {
        titulo: 'Divertida Mente 2',
        genero: 'Animação',
        duracao: 96,
        classificacao: 0,
        preco: 28,
        legendado: false,
        em3D: true
    },
    {
        titulo: 'Deadpool & Wolverine',
        genero: 'Ação',
        duracao: 127,
        classificacao: 18,
        preco: 32,
        legendado: true,
        em3D: false
    }
];


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
// Uma <option> para cada filme da lista. O value é a posição.
function montarOpcoesDeFilmes(filmes) {
    let opcoes = '';
    for (let i = 0; i < filmes.length; i++) {
        opcoes = opcoes + `<option value="${i}">${filmes[i].titulo}</option>`;
    }
    return opcoes;
}

// Classificação 0 é livre: o selo mostra 'L'.
function montarTextoDaClassificacao(classificacao) {
    if (classificacao === 0) {
        return 'L';
    }
    return String(classificacao);
}

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

// 'Ana · Duna: Parte Dois · meia-entrada · R$ 16,00'
function montarTextoDoIngresso(pessoa, filme) {
    let tipo = 'inteira';
    if (temDireitoAMeia(pessoa)) {
        tipo = 'meia-entrada';
    }
    return pessoa.nome + ' · ' + filme.titulo + ' · ' + tipo + ' · ' + formatarReais(calcularPrecoDoIngresso(pessoa, filme));
}

function montarTextoDaRecusa(pessoa, filme) {
    return pessoa.nome + ' tem ' + pessoa.idade + ' anos. O filme é para maiores de ' + filme.classificacao + '.';
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoFilme = document.querySelector('.campo-filme');
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

// O select guarda a posição do filme na lista: '0', '1' ou '2'.
function lerFilmeEscolhido() {
    return FILMES[Number(campoFilme.value)];
}

function mostrarFilme(filme) {
    telaTitulo.textContent = filme.titulo;
    telaClassificacao.textContent = montarTextoDaClassificacao(filme.classificacao);
    telaDetalhes.textContent = montarDetalhesDoFilme(filme);
    telaPreco.textContent = formatarReais(calcularPrecoDaInteira(filme));
}

campoFilme.innerHTML = montarOpcoesDeFilmes(FILMES);
mostrarFilme(lerFilmeEscolhido());


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

// change: quando outro filme é escolhido
campoFilme.addEventListener('change', function () {
    mostrarFilme(lerFilmeEscolhido());
});

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const filme = lerFilmeEscolhido();

    const pessoa = {
        nome: campoNome.value.trim(),
        idade: Number(campoIdade.value),
        documento: document.querySelector('input[name="documento"]:checked').value
    };

    if (pessoa.nome === '') {
        erro.textContent = 'Escreva o nome.';
    } else if (campoIdade.value === '' || pessoa.idade < 1) {
        erro.textContent = 'Informe uma idade válida.';
    } else if (!podeAssistir(pessoa, filme)) {
        erro.textContent = '';
        telaIngresso.textContent = montarTextoDaRecusa(pessoa, filme);
        telaIngresso.classList.add('recusado');
    } else {
        erro.textContent = '';

        vendidos = vendidos + 1;
        arrecadado = arrecadado + calcularPrecoDoIngresso(pessoa, filme);

        telaIngresso.textContent = montarTextoDoIngresso(pessoa, filme);
        telaIngresso.classList.remove('recusado');
        telaVendidos.textContent = vendidos;
        telaArrecadado.textContent = formatarReais(arrecadado);

        campoNome.value = '';
        campoIdade.value = '';
    }
});
