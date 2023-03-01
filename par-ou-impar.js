//exercicio 3

function getRndInterger(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
};

//Aprendendo funcionamento da funcão getRndInterger 
const numberRandom = getRndInterger(Number(process.argv[2]), Number(process.argv[3]));

//console.log(numberRandom);

//Informações do jogador
const choiceGamer = process.argv[2];
const gamer = Number(process.argv[3]);

//Informações do computador
const cpu = getRndInterger(0, 10);

//Resultado
const result = gamer + cpu;

//Interações do jogo
if((choiceGamer == "par" && result % 2 == 0) || (choiceGamer == "par" && result % 2 == 0) || (choiceGamer == "impar" && result % 2 !== 0) || (choiceGamer == "impar" && result % 2 !== 0)){
    console.log(`Você escolheu ${choiceGamer} com número ${gamer} e o computador escolheu como o número ${cpu}. O resultado foi ${result}. Você ganhou!`);
} else if((result % 2 == 0) || (result % 2 == 0) || (result % 2 !== 0) || (result % 2 !== 0)){
    console.log(`Você escolheu ${choiceGamer} com número ${gamer} e o computador escolheu como o número ${cpu}. O resultado foi ${result}. Você perdeu!`);
} else{
    console.log("Escolha par ou impar, e um número de 0 a 10!");
}; 