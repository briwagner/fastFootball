var Card = (function () {
    function Card(playType, side, yards, imgsrc) {
        this.turnOver = false;
        this.showCard = function () {
            return '<div class="' + this.playType + '"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>';
        };
        this.playType = playType;
        this.side = side;
        this.yards = yards;
        this.imgsrc = imgsrc;
    }
    return Card;
}());
// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
//     module.exports = Card;
// } 
var Game = (function () {
    function Game(playerOneName, playerTwoName) {
        this.player1 = new Player(playerOneName);
        this.player2 = new Player(playerTwoName);
        this.playsLeft = 32;
    }
    return Game;
}());
// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
//     module.exports = Game;
// } 
var Player = (function () {
    function Player(name) {
        if (name === undefined) {
            throw "Player must have a name";
        }
        else {
            this.name = name;
            this.score = 0;
        }
    }
    Player.prototype.scores = function (x) {
        this.score += x;
    };
    return Player;
}());
// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
//     module.exports = Player;
// } 
//# sourceMappingURL=app.js.map