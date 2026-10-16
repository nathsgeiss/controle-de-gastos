/* ===========================================================
   Pra onde foi meu dinheiro?
   =========================================================== */

/* -----------------------------------------------------------
   O que o programa precisa lembrar (Estado)
   ----------------------------------------------------------- */
const categorias = [
    { nome: 'Alimentação', total: 0 },
    { nome: 'Transporte', total: 0 },
    { nome: 'Lazer', total: 0 }
];

let total = 0;
let maiorGasto = {
    descricao: '',
    valor: 0
};
let gastosRegistrados = 0;
let txt = '';

/* -----------------------------------------------------------
   Selecionar Elementos do DOM
   ----------------------------------------------------------- */
const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const campoCategoria = document.querySelector('.campo-categoria');
const botaoAdicionar = document.querySelector('.formulario button');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');
const quantidade = document.querySelector('.quantidade');
const media = document.querySelector('.media');
const historico = document.querySelector('.historico');
const restante = document.querySelector('.restante');
const listaCategorias = document.querySelector('.lista-categorias');

/* -----------------------------------------------------------
   Funções Auxiliares
   ----------------------------------------------------------- */
function formatarReais(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularMedia(valorTotal, quantidade) {
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

function podeAdicionar(descricao, valor) {
    return descricao.trim() !== '' && valor !== '';
}

/* -----------------------------------------------------------
   Funções de Categorias
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
        conteudo += `
            <tr>
                <td>${cat.nome}</td>
                <td>${formatarReais(cat.total)}</td>
            </tr>
        `;
    });

    conteudo += '</tbody>';
    tabela.innerHTML = conteudo;
    listaCategorias.appendChild(tabela);
}

/* -----------------------------------------------------------
   Atualizar estado do botão
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

/* -----------------------------------------------------------
   Escutar e alterar
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

    // Atualiza o total da categoria
    const categoriaEncontrada = categorias.find(c => c.nome === nomeCategoria);
    if (categoriaEncontrada) {
        categoriaEncontrada.total += gasto.valor;
    }

    // Atualiza gerais
    total += gasto.valor;
    gastosRegistrados += 1;
    txt += montarTextoDoGasto(gasto) + '\n';

    if (gasto.valor > maiorGasto.valor) {
        maiorGasto = gasto;
    }

    // Atualiza o DOM
    telaTotal.textContent = formatarReais(total);
    telaMaior.textContent = montarTextoDoGasto(maiorGasto);
    quantidade.textContent = gastosRegistrados;
    media.textContent = formatarReais(calcularMedia(total, gastosRegistrados));
    historico.textContent = txt;

    mostrarTotaisPorCategoria();

    const valorRestante = 50 - total;
    restante.textContent = montarMensagemDoOrcamento(valorRestante);

    if (valorRestante < 0) {
        restante.classList.add("estourado");
    }

    if (total > 50) {
        telaTotal.classList.add("estourado");
    }

    campoDescricao.value = '';
    campoValor.value = '';

    atualizarEstadoDoBotao();
});