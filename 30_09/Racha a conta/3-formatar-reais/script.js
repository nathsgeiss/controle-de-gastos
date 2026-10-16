/* Racha a conta — segunda versão: a formatação vira função.
   Seis lugares usam a formatarReais(). Mudar o formato
   agora é mudar UMA linha. */

function formatarReais(valor) { // lowerCamelCase
    // return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    console.log(`valor: ${valor}`);
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

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

        // sem gorjeta
        const totalSem = conta;
        const porPessoaSem = totalSem / pessoas;
        total0.textContent = formatarReais(totalSem);
        pessoa0.textContent = formatarReais(porPessoaSem);

        // 10%
        const gorjetaDez = conta * 10 / 100;
        const totalDez = conta + gorjetaDez;
        const porPessoaDez = totalDez / pessoas;
        total10.textContent = formatarReais(totalDez);
        pessoa10.textContent = formatarReais(porPessoaDez);

        // 15%
        const gorjetaQuinze = conta * 15 / 100;
        const totalQuinze = conta + gorjetaQuinze;
        const porPessoaQuinze = totalQuinze / pessoas;
        total15.textContent = formatarReais(totalQuinze);
        pessoa15.textContent = formatarReais(porPessoaQuinze);
    }
});
