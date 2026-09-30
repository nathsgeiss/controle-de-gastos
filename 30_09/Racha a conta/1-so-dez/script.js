/* Racha a conta — o cenário de 10%, feito junto.
   Os outros dois cartões ficam para a turma. */

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

    
    // console.log(`tipo campoConta antes de Number: ${typeof campoConta.value}`);
    // const somaStrings = '1' + '1';
    // console.log(`somaStrings: ${somaStrings}`);
    const conta = Number(campoConta.value);
    const pessoas = Number(campoPessoas.value);

    if (conta <= 0) {
        erro.textContent = 'Informe o valor da conta.';
    } else if (pessoas < 1) {
        erro.textContent = 'Precisa ter pelo menos uma pessoa.';
    } else {
        erro.textContent = '';

        //0%
        const totalZero = conta;
        const porPessoaZero = totalZero / pessoas;
        total0.textContent = 'R$ ' + totalZero.toFixed(2).replace('.', ',');
        pessoa0.textContent = 'R$ ' + porPessoaZero.toFixed(2).replace('.', ',');

        // 10%
        const gorjetaDez = conta * 10 / 100;
        const totalDez = conta + gorjetaDez;
        const porPessoaDez = totalDez / pessoas;
        total10.textContent = 'R$ ' + totalDez.toFixed(2).replace('.', ',');
        pessoa10.textContent = 'R$ ' + porPessoaDez.toFixed(2).replace('.', ',');

        //15%
        const gorjetaQuinze = conta * 15 / 100;
        const totalQuinze = conta + gorjetaQuinze;
        const porPessoaQuinze = totalQuinze / pessoas;
        total15.textContent = 'R$ ' + totalQuinze.toFixed(2).replace('.', ',');
        pessoa15.textContent = 'R$ ' + porPessoaQuinze.toFixed(2).replace('.', ',');

    }
});
