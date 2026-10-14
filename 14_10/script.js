/* ===========================================================
   Pra onde foi meu dinheiro? — Parte 1
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

// Passo 1: Criando a lista vazia 'gastos' (substitui a variável 'txt' antiga)
let gastos = [];

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

function calcularMedia(valorTotal, qtd) {
    if (qtd === 0) return 0;
    return valorTotal / qtd;
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

    // Passo 1: Cria o objeto do gasto
    const gasto = {
        descricao: descricao,
        valor: valor,
        categoria: nomeCategoria
    };

    // Passo 1: Adiciona o objeto na lista 'gastos' usando .push()
    gastos.push(gasto);

    // Atualiza o total da categoria correspondente
    const categoriaEncontrada = categorias.find(c => c.nome === nomeCategoria);
    if (categoriaEncontrada) {
        categoriaEncontrada.total += gasto.valor;
    }

    // Atualiza o total geral
    total += gasto.valor;

    // Atualiza o maior gasto, se aplicável
    if (gasto.valor > maiorGasto.valor) {
        maiorGasto = gasto;
    }

    // Passo 2: Monta o histórico como uma lista numerada (<ol>) a partir de 'gastos'
    let htmlHistorico = '<ol>';
    gastos.forEach(item => {
        htmlHistorico += `<li>${montarTextoDoGasto(item)}</li>`;
    });
    htmlHistorico += '</ol>';
    historico.innerHTML = htmlHistorico;

    // Atualiza o DOM
    telaTotal.textContent = formatarReais(total);
    telaMaior.textContent = montarTextoDoGasto(maiorGasto);
    
    // Passo 3: A quantidade de gastos vem direto do tamanho da lista (gastos.length)
    quantidade.textContent = gastos.length;
    media.textContent = formatarReais(calcularMedia(total, gastos.length));

    mostrarTotaisPorCategoria();

    // Lógica do orçamento da semana (R$ 50,00)
    const valorRestante = 50 - total;
    restante.textContent = montarMensagemDoOrcamento(valorRestante);

    if (valorRestante < 0) {
        restante.classList.add("estourado");
    }

    if (total > 50) {
        telaTotal.classList.add("estourado");
    }

    // Limpa os campos do formulário
    campoDescricao.value = '';
    campoValor.value = '';

    atualizarEstadoDoBotao();
});