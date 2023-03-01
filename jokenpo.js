//exercício 3 opção 2
function getRndInterger(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
};

//jogador
const gamerChoice = process.argv[2];

//computador
const options = ["pedra", "papel", "tesoura"];
const cpuChoice = options[getRndInterger(0, 2)];

//interações do jogo
if ((gamerChoice === "pedra" && cpuChoice === "tesoura") || (gamerChoice === "papel" && cpuChoice === "pedra") || (gamerChoice === "tesoura" && cpuChoice === "papel")) {
    console.log(`Você escolheu ${gamerChoice} e o computador escolheu ${cpuChoice}. Parabéns você venceu!!!`);
} else if(gamerChoice === cpuChoice){
    console.log(`Você escolheu ${gamerChoice} e o computador escolheu ${cpuChoice}. Empate!!!`);
} else if((gamerChoice === "tesoura" && cpuChoice === "pedra") || (gamerChoice === "pedra" && cpuChoice === "papel") || (gamerChoice === "papel" && cpuChoice === "tesoura")){
    console.log(`Você escolheu ${gamerChoice} e o computador escolheu ${cpuChoice}. O computador venceu!!!`);
} else{
    console.log("Escolha: pedra, papel ou tesoura");
};