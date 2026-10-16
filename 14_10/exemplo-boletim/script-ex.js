/* ===========================================================
   Boletim — exemplo de como CALCULAR a partir de uma lista.

   A lista de notas é a única coisa que o programa lembra.
   Média, maior e menor são calculados na hora de mostrar,
   percorrendo a lista com for.

   Por isso o "Remover última" é só um pop(): todo o resto
   se ajusta sozinho quando a tela é mostrada de novo.
   =========================================================== */


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */

function formatarNota(nota) {
    return nota.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// SOMAR: um acumulador que começa em zero e recebe cada item.
// calcularSoma([{ nota: 8 }, { nota: 6 }]) → 14
function calcularSoma(notas) {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma = soma + notas[i].nota;
    }
    return soma;
}

function calcularMedia(soma, quantidade) {
    if (quantidade === 0) {
        return 0;
    }
    return soma / quantidade;
}

// PROCURAR O MAIOR: começa com o primeiro item da lista e
// compara com os outros. Quem for maior toma o lugar.
// Devolve o objeto inteiro, para saber também de quem é a nota.
function encontrarMaiorNota(notas) {
    let maior = notas[0];
    for (let i = 1; i < notas.length; i++) {
        if (notas[i].nota > maior.nota) {
            maior = notas[i];
        }
    }
    return maior;
}

// PROCURAR O MENOR: igual ao maior, trocando o > por <.
function encontrarMenorNota(notas) {
    let menor = notas[0];
    for (let i = 1; i < notas.length; i++) {
        if (notas[i].nota < menor.nota) {
            menor = notas[i];
        }
    }
    return menor;
}

// Uma linha <tr> para cada nota, com o número dela na lista.
function montarLinhasDaTabela(notas) {
    let linhas = '';
    for (let i = 0; i < notas.length; i++) {
        linhas = linhas + `
            <tr>
                <td>${i + 1}</td>
                <td>${notas[i].aluno}</td>
                <td>${formatarNota(notas[i].nota)}</td>
            </tr>`;
    }
    return linhas;
}

function montarTextoDaNota(item) {
    return item.aluno + ' — ' + formatarNota(item.nota);
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoAluno = document.querySelector('.campo-aluno');
const campoNota = document.querySelector('.campo-nota');
const botaoRemover = document.querySelector('.botao-remover');

const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaMenor = document.querySelector('.menor');
const telaLinhas = document.querySelector('.linhas');
const telaMediaRodape = document.querySelector('.media-rodape');

// A única coisa que o programa lembra.
const notas = [
    { aluno: 'Ana', nota: 8.5 },
    { aluno: 'Bruno', nota: 6 },
    { aluno: 'Carla', nota: 9.5 },
    { aluno: 'Davi', nota: 7 },
    { aluno: 'Elza', nota: 5.5 },
    { aluno: 'Fábio', nota: 10 },
    { aluno: 'Gabi', nota: 7.5 },
    { aluno: 'Hugo', nota: 4 }
];


/* -----------------------------------------------------------
   Mostrar: tudo sai da lista
   ----------------------------------------------------------- */

function mostrarBoletim() {
    const soma = calcularSoma(notas);
    const media = calcularMedia(soma, notas.length);

    telaLinhas.innerHTML = montarLinhasDaTabela(notas);

    if (notas.length === 0) {
        telaMedia.textContent = '—';
        telaMediaRodape.textContent = '—';
        telaMaior.textContent = '—';
        telaMenor.textContent = '—';
    } else {
        telaMedia.textContent = formatarNota(media);
        telaMediaRodape.textContent = formatarNota(media);
        telaMaior.textContent = montarTextoDaNota(encontrarMaiorNota(notas));
        telaMenor.textContent = montarTextoDaNota(encontrarMenorNota(notas));
    }

    botaoRemover.disabled = notas.length === 0;
}

mostrarBoletim();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const item = {
        aluno: campoAluno.value.trim(),
        nota: Number(campoNota.value)
    };

    if (item.aluno !== '' && campoNota.value !== '') {
        notas.push(item);
        campoAluno.value = '';
        campoNota.value = '';
        mostrarBoletim();
    }
});

// pop: tira a última. Média, maior e menor se ajustam sozinhos.
botaoRemover.addEventListener('click', function () {
    notas.pop();
    mostrarBoletim();
});
