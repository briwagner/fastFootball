"use strict";
var Game = (function () {
    function Game(playerOneName, playerTwoName) {
        this.player1 = new Player(playerOneName);
        this.player2 = new Player(playerTwoName);
        this.playsLeft = 32;
    }
    return Game;
}());
exports.Game = Game;
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Game;
}
//# sourceMappingURL=game.js.map