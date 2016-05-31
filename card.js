"use strict";
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
exports.Card = Card;
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Card;
}
//# sourceMappingURL=card.js.map