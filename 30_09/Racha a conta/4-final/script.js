/* ===========================================================
   Racha a conta — versão final

   Cada função é escrita uma vez e usada várias:
     formatarReais()       6 chamadas
     calcularTotal()       3 chamadas
     calcularPorPessoa()   3 chamadas
   Corrigir uma função corrige todos os lugares que a chamam.
   =========================================================== */


/* -----------------------------------------------------------
   Funções
   ----------------------------------------------------------- */

// formatarReais(1375) → 'R$ 1.375,00'
function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// calcularTotal(187.5, 10) → 206.25   (a conta mais a gorjeta)
// function calcularTotal(conta, porcentagem) {
//     const gorjeta = conta * porcentagem / 100;
//     return conta + gorjeta;
// }

function calcularGorjeta(total, procentagem) {
    return total * porcentagem; 
}

// calcularPorPessoa(206.25, 4) → 51.5625
function calcularPorPessoa(total, pessoas) {
    return total / pessoas;
}


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoConta = document.querySelector('.campo-conta');
const campoPessoas = document.querySelector('.campo-pessoas');
const erro = document.querySelector('.erro');

const total0 = document.querySelector('.total-0');
const pessoa0 = document.querySelector('.pessoa-0');
const total10 = document.querySelector('.total-10');
const pessoa10 = document.querySelector('.pessoa-10');
const total15 = document.querySelector('.total-15');
const pessoa15 = document.querySelector('.pessoa-15');


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const conta = Number(campoConta.value);
    const pessoas = Number(campoPessoas.value);

    if (conta <= 0) {
        erro.textContent = 'Informe o valor da conta.';
    } else if (pessoas < 1) {
        erro.textContent = 'Precisa ter pelo menos uma pessoa.';
    } else {
        erro.textContent = '';

        //const totalSem = calcularTotal(conta, 0);
        const totalSemGorjeta = conta + calcularGorjeta(conta, 0);
        //const totalDez = calcularTotal(conta, 10);
        const totalDez = conta + calcularGorjeta(conta, 0.1);
        //const totalQuinze = calcularTotal(conta, 15);
        const totalQuinze = conta + calcularGorjeta(conta, 0.15);
        // const totalCinquenta = calcularTotal(conta, 50);
        // const totalCinquentaFormatado = formatarReais(totalCinquenta);

        total0.textContent = formatarReais(totalSem);
        const totalPorPessoaSemGorjeta = calcularPorPessoa(totalSem, pessoas);
        pessoa0.textContent = formatarReais(totalPorPessoaSemGorjeta);

        total10.textContent = formatarReais(totalDez);
        pessoa10.textContent = formatarReais(calcularPorPessoa(totalDez, pessoas));

        total15.textContent = formatarReais(totalQuinze);
        pessoa15.textContent = formatarReais(calcularPorPessoa(totalQuinze, pessoas));
    }
});
