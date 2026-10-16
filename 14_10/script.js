/* ===========================================================
   Pra onde foi meu dinheiro? — Parte 2 (Com Tabela de Histórico)
   =========================================================== */

/* -----------------------------------------------------------
   O que o programa precisa lembrar (Estado)
   ----------------------------------------------------------- */
const categorias = [
    { nome: 'Alimentação', total: 0 },
    { nome: 'Transporte', total: 0 },
    { nome: 'Lazer', total: 0 }
];

let gastos = [];

/* -----------------------------------------------------------
   Selecionar Elementos do DOM
   ----------------------------------------------------------- */
const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const campoCategoria = document.querySelector('.campo-categoria');
const botaoAdicionar = document.querySelector('.formulario button[type="submit"]');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');
const telaMenor = document.querySelector('.menor');
const quantidade = document.querySelector('.quantidade');
const media = document.querySelector('.media');
const historico = document.querySelector('.historico');
const restante = document.querySelector('.restante');
const listaCategorias = document.querySelector('.lista-categorias');

/* -----------------------------------------------------------
   Funções Auxiliares de Cálculo
   ----------------------------------------------------------- */
function formatarReais(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularMedia(valorTotal, qtd) {
    if (qtd === 0) return 0;
    return valorTotal / qtd;
}

function podeAdicionar(descricao, valor) {
    return descricao.trim() !== '' && valor !== '';
}

function calcularTotal(listaGastos) {
    let soma = 0;
    for (let i = 0; i < listaGastos.length; i++) {
        soma = soma + listaGastos[i].valor;
    }
    return soma;
}

function calcularMaiorGasto(listaGastos) {
    if (listaGastos.length === 0) return null;
    let maior = listaGastos[0];
    for (let i = 1; i < listaGastos.length; i++) {
        if (listaGastos[i].valor > maior.valor) {
            maior = listaGastos[i];
        }
    }
    return maior;
}

function calcularMenorGasto(listaGastos) {
    if (listaGastos.length === 0) return null;
    let menor = listaGastos[0];
    for (let i = 1; i < listaGastos.length; i++) {
        if (listaGastos[i].valor < menor.valor) {
            menor = listaGastos[i];
        }
    }
    return menor;
}

/* -----------------------------------------------------------
   Funções para o Histórico em Tabela (Passo 5)
   ----------------------------------------------------------- */
function montarLinhasDaTabela(listaGastos) {
    let linhas = '';
    for (let i = 0; i < listaGastos.length; i++) {
        linhas += `
            <tr>
                <td>${i + 1}</td>
                <td>${listaGastos[i].descricao}</td>
                <td>${formatarReais(listaGastos[i].valor)}</td>
            </tr>`;
    }
    return linhas;
}

function atualizarTabelaHistorico() {
    if (gastos.length === 0) {
        historico.innerHTML = 'Nenhum gasto ainda.';
        return;
    }

    const totalGeral = calcularTotal(gastos);

    let conteudoTabela = `
        <table>
            <caption>Histórico de gastos</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                ${montarLinhasDaTabela(gastos)}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Total</td>
                    <td>${formatarReais(totalGeral)}</td>
                </tr>
            </tfoot>
        </table>
    `;
    historico.innerHTML = conteudoTabela;
}

/* -----------------------------------------------------------
   Funções de Categorias e Renderização Geral
   ----------------------------------------------------------- */
function preencherOpcoesCategorias() {
    campoCategoria.innerHTML = '';
    categorias.forEach(cat => {
        const opcao = document.createElement('option');
        opcao.value = cat.nome;
        opcao.textContent = cat.nome;
        campoCategoria.appendChild(opcao);
    });
}

function mostrarTotaisPorCategoria() {
    listaCategorias.innerHTML = '';

    const tabela = document.createElement('table');
    tabela.className = 'tabela-categorias';

    let conteudo = `
        <thead>
            <tr>
                <th>categoria</th>
                <th>total</th>
            </tr>
        </thead>
        <tbody>
    `;

    categorias.forEach(cat => {
        let totalCat = 0;
        gastos.forEach(g => {
            if (g.categoria === cat.nome) {
                totalCat += g.valor;
            }
        });

        conteudo += `
            <tr>
                <td>${cat.nome}</td>
                <td>${formatarReais(totalCat)}</td>
            </tr>
        `;
    });

    conteudo += '</tbody>';
    tabela.innerHTML = conteudo;
    listaCategorias.appendChild(tabela);
}

function atualizarInterface() {
    atualizarTabelaHistorico();

    const totalGeral = calcularTotal(gastos);
    const maior = calcularMaiorGasto(gastos);
    const menor = calcularMenorGasto(gastos);

    telaTotal.textContent = formatarReais(totalGeral);
    
    if (maior) {
        telaMaior.textContent = `${maior.descricao} — ${formatarReais(maior.valor)}`;
    } else {
        telaMaior.textContent = '—';
    }

    if (menor && telaMenor) {
        telaMenor.textContent = `${menor.descricao} — ${formatarReais(menor.valor)}`;
    } else if (telaMenor) {
        telaMenor.textContent = '—';
    }

    quantidade.textContent = gastos.length;
    media.textContent = formatarReais(calcularMedia(totalGeral, gastos.length));

    mostrarTotaisPorCategoria();

    const valorRestante = 50 - totalGeral;
    restante.textContent = montarMensagemDoOrcamento(valorRestante);

    if (valorRestante < 0) {
        restante.classList.add("estourado");
    } else {
        restante.classList.remove("estourado");
    }

    if (totalGeral > 50) {
        telaTotal.classList.add("estourado");
    } else {
        telaTotal.classList.remove("estourado");
    }
}

function montarMensagemDoOrcamento(restante) {
    if (restante >= 0) {
        return formatarReais(restante) + ' disponíveis';
    }
    return 'Passou ' + formatarReais(-restante) + ' do orçamento';
}

/* -----------------------------------------------------------
   Atualizar estado do botão Adicionar
   ----------------------------------------------------------- */
function atualizarEstadoDoBotao() {
    botaoAdicionar.disabled = !podeAdicionar(campoDescricao.value, campoValor.value);
}

campoDescricao.addEventListener('input', atualizarEstadoDoBotao);
campoValor.addEventListener('input', atualizarEstadoDoBotao);

/* -----------------------------------------------------------
   Inicialização
   ----------------------------------------------------------- */
preencherOpcoesCategorias();
mostrarTotaisPorCategoria();
atualizarEstadoDoBotao();
atualizarInterface(); // <--- Adicionado aqui para garantir que o histórico comece renderizado corretamente

/* -----------------------------------------------------------
   Escutar Ações (Submit e Botão Desfazer)
   ----------------------------------------------------------- */
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);
    const nomeCategoria = campoCategoria.value;

    if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
        return;
    }

    erro.textContent = '';

    const gasto = {
        descricao: descricao,
        valor: valor,
        categoria: nomeCategoria
    };

    gastos.push(gasto);
    atualizarInterface();

    campoDescricao.value = '';
    campoValor.value = '';
    atualizarEstadoDoBotao();
});

botaoDesfazer.addEventListener('click', function () {
    if (gastos.length > 0) {
        gastos.pop();
        atualizarInterface();
    }
});