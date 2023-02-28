import Player from "./js/entity/Player.js";
import DiceService from "./js/service/DiceService.js";
import GameService from "./js/service/GameService.js";

/**
 * Tableau représentant les deux joueurs
 */
let players = [
    new Player('joueur 1', 0,0),
    new Player('joueur 2',0,0)
]

/**
 * éléments HTML représentant les scores courants des 
 * deux joueurs
 */
const currentScores = [
    document.querySelector('#curr-score-1'),
    document.querySelector('#curr-score-2')
]

/**
 * éléments HTML reprénsentant les scores globaux
 * des deux joueurs
 */
const globalScores = [
    document.querySelector('#g-score-1'),
    document.querySelector('#g-score-2')
]

/**
 * bouton permettant de faire un lancer de dés
 */
const btnRoll = document.querySelector('#roll');

/**
 * bouton permettant de garder son score
 */
const btnHold = document.querySelector('#hold');

/**
 * image du dé
 */
const dice = document.querySelector('#dice');

/**
 * bouton permettant de relancer une partie
 */
const btnReplay = document.querySelector('#new-game');

/**
 * élément HTML affichant le nom de la personne qui a gagné.
 */
const textGagnant = document.querySelector('#gagnant');

//initialisation des services
const diceService = new DiceService();
const gameService = new GameService(players);

/**
 * variable permettant de déterminer le tour du joueur
 */
let idxOfCurrentPlayer = 0;

/**
 * fonction s'occupant du traitement du click sur le bouton roll
 */
let roll = ()=>{
    const rollResult = diceService.rollDice(dice);
    //dans le cas où l'utilisateur a tiré un 1, on arrête son tour.
    if(rollResult == 1){
        players[idxOfCurrentPlayer].currentScore = 0;
        currentScores[idxOfCurrentPlayer].innerHTML = 0;
        idxOfCurrentPlayer = gameService.changeTurn(idxOfCurrentPlayer);
    //sinon, on augmente son score courant;
    } else {
        players[idxOfCurrentPlayer].currentScore += rollResult;
        console.log(idxOfCurrentPlayer);
        console.log(players[idxOfCurrentPlayer].currentScore)
        currentScores[idxOfCurrentPlayer].innerHTML = players[idxOfCurrentPlayer].currentScore;
        if(gameService.checkIfWin(idxOfCurrentPlayer)){
            textGagnant.innerHTML = players[idxOfCurrentPlayer].name +" a gagné";
            btnRoll.removeEventListener('click', roll);
            btnHold.removeEventListener('click', hold);
            hold();


        }
    }
}

/**
 * fonction s'occupant du traitement du click sur le bouton hold
 */
let hold = ()=>{
    players[idxOfCurrentPlayer].globalScore = players[idxOfCurrentPlayer].currentScore + players[idxOfCurrentPlayer].globalScore;
    players[idxOfCurrentPlayer].currentScore = 0;
    globalScores[idxOfCurrentPlayer].innerHTML = players[idxOfCurrentPlayer].globalScore;
    currentScores[idxOfCurrentPlayer].innerHTML = 0;
    idxOfCurrentPlayer = gameService.changeTurn(idxOfCurrentPlayer);
}

/**
 * fonction permettant de remettre les variables à zéro.
 */
let reset = ()=>{
    players = [
        new Player('joueur 1', 0,0),
        new Player('joueur 2',0,0)
    ];
    currentScores.forEach(score => score.innerHTML = 0);
    globalScores.forEach(score => score.innerHTML = 0);
    idxOfCurrentPlayer = 0;
    btnRoll.addEventListener('click', roll);
    btnHold.addEventListener("click", hold);
    textGagnant.innerHTML = "";
}


btnRoll.addEventListener('click', roll);

btnHold.addEventListener('click', hold);

btnReplay.addEventListener('click', reset);