"use strict";
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
exports.Player = Player;
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Player;
}
//# sourceMappingURL=player.js.map