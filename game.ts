export class Game {
    constructor(playerOneName, playerTwoName) {
        this.player1 = new Player(playerOneName)
        this.player2 = new Player(playerTwoName)
        this.playsLeft = 32
    }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
    module.exports = Game;
}