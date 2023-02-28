export default class GameService{

    constructor(players){
        this.players = players;
    }
    
    checkIfWin(indexOfCurrentPlayer){
        return (this.players[indexOfCurrentPlayer].currentScore + this.players[indexOfCurrentPlayer].globalScore) >= 100;
    }

    changeTurn(indexOfCurrentPlayer){
        return (indexOfCurrentPlayer +1) % 2;
    }

}