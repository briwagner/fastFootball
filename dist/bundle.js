/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(1);
var player_1 = __webpack_require__(3);
var card_1 = __webpack_require__(4);
var cards_default_1 = __webpack_require__(5);
var home = new player_1.Player('home player');
var visitor = new player_1.Player('visitor');
var game = new game_1.Game(home, visitor);
var deckO = [];
var deckD = [];
cards_default_1.deckOffense.forEach(function (obj) {
    var card = new card_1.Card(obj);
    deckO.push(card);
});
cards_default_1.deckDefense.forEach(function (obj) {
    var card = new card_1.Card(obj);
    deckD.push(card);
});
home.getCards(deckO);
home.shuffleCards();
visitor.getCards(deckD);
visitor.shuffleCards();
home.drawCard();
visitor.drawCard();
console.log(home.hand);
console.log(visitor.hand);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var play_1 = __webpack_require__(2);
var Game = (function () {
    function Game(homeName, visitorName) {
        this.homeName = homeName;
        this.visitorName = visitorName;
        this.home = homeName;
        this.visitor = visitorName;
    }
    Game.prototype.startGame = function () {
        this.playsLeft = 32;
        this.ballSpot = 20;
        this.currentDown = 1;
        this.plays = [];
    };
    Game.prototype.playDown = function (cardOne, cardTwo) {
        if (this.playsLeft == 0) {
            return;
        }
        this.playsLeft -= 1;
        var nextPlay = new play_1.Play(cardOne, cardTwo, this.ballSpot);
        this.plays.push(nextPlay);
        // Do something.
        var playResult = nextPlay.getResult();
        // Set ballSpot.
        this.setBallSpot(playResult);
        return nextPlay;
    };
    Game.prototype.setBallSpot = function (playResult) {
        if (playResult.scoring) {
            // Touchdown puts ball at goalline.
            this.ballSpot = 0;
        }
        else if (playResult.turnover) {
            // Ball spot is unchanged.
            var nothingHappens = void 0;
            this.switchSides();
        }
        else {
            // Typical play.
            this.ballSpot = playResult.yardStart - playResult.yardage;
        }
    };
    Game.prototype.playerOffense = function () {
        if (this.home.inPossession) {
            return this.home;
        }
        else {
            return this.visitor;
        }
    };
    Game.prototype.switchSides = function () {
        if (this.playerOffense() == this.home) {
            this.home.inPossession = false;
            this.visitor.inPossession = true;
        }
        else {
            this.home.inPossession = true;
            this.visitor.inPossession = false;
        }
    };
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Play = (function () {
    function Play(cardOne, cardTwo, yardStart) {
        this.cardOne = cardOne;
        this.cardTwo = cardTwo;
        this.yardStart = yardStart;
        this.turnover = false;
        this.scoring = false;
    }
    Play.prototype.getResult = function () {
        // Defense wins.
        if (this.cardOne.playType == this.cardTwo.playType) {
            this.playType = this.cardTwo.playType;
            if (this.cardTwo.turnover) {
                this.turnover == true;
                this.yardage = 0;
            }
            else {
                // Offense wins
                var yardDiff = this.cardOne.yards - this.cardTwo.yards;
                // Yardage is never negative.
                this.yardage = yardDiff < 0 ? 0 : yardDiff;
            }
        }
        else {
            // Offense wins.
            this.playType = this.cardOne.playType;
            this.yardage = this.cardOne.yards;
            this.isScoring();
        }
        return this;
    };
    Play.prototype.isScoring = function () {
        if (this.yardage > this.yardStart) {
            this.scoring = true;
        }
        return this.scoring;
    };
    return Play;
}());
exports.Play = Play;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(name) {
        if (name === undefined) {
            throw "Player must have a name";
        }
        else {
            this.name = name;
            this.score = 0;
            this.hand = [];
        }
    }
    Player.prototype.makesScore = function (x) {
        this.score += x;
        return this.score;
    };
    Player.prototype.getCards = function (cards) {
        var _this = this;
        cards.forEach(function (obj) {
            obj.owner = _this;
            return obj;
        });
        this.cards = cards;
    };
    Player.prototype.drawCard = function () {
        try {
            var topCard = this.cards.shift();
            this.hand.push(topCard);
        }
        catch (e) {
            throw 'No more cards in the pile';
        }
    };
    Player.prototype.playCard = function (card) {
        if (this.cards.indexOf(card) != -1) {
            return this.cards.splice(this.cards.indexOf(card))[0];
        }
        return false;
    };
    Player.prototype.shuffleCards = function () {
        var array = this.cards;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.cards = array;
    };
    return Player;
}());
exports.Player = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card = (function () {
    function Card(obj) {
        this.showCard = function () {
            return '<div class="' + this.playType + '"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>';
        };
        this.playType = obj.playType;
        this.side = obj.side;
        this.yards = obj.yards;
        this.imgsrc = obj.imgsrc;
        this.turnover = obj.turnover ? obj.turnover : false;
    }
    return Card;
}());
exports.Card = Card;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// OFFENSE  
var rush5 = { playType: "rush", side: "offense", yards: 5, imgsrc: "rush.jpg" };
var rush10 = { playType: "rush", side: "offense", yards: 10, imgsrc: "rush.jpg" };
var rush15 = { playType: "rush", side: "offense", yards: 15, imgsrc: "rush.jpg" };
var rush30 = { playType: "rush", side: "offense", yards: 30, imgsrc: "rush.jpg" };
var pass5 = { playType: "pass", side: "offense", yards: 5, imgsrc: "pass.jpg" };
var pass10 = { playType: "pass", side: "offense", yards: 10, imgsrc: "pass.jpg" };
var pass15 = { playType: "pass", side: "offense", yards: 15, imgsrc: "pass.jpg" };
var pass30 = { playType: "pass", side: "offense", yards: 30, imgsrc: "pass.jpg" };
var punt40 = { playType: "punt", side: "offense", yards: 40, imgsrc: "punt.jpg" };
var kick40 = { playType: "kick", side: "offense", yards: 40, imgsrc: "kick.jpg" };
var bombPass = { playType: "bomb", side: "offense", yards: 100, imgsrc: "pass.jpg" };
// DEFENSE
var tackle0 = { playType: "rush", side: "defense", yards: 0, imgsrc: "tackle.jpg" };
var tackle5 = { playType: "rush", side: "defense", yards: 5, imgsrc: "tackle.jpg" };
var tackle10 = { playType: "rush", side: "defense", yards: 10, imgsrc: "tackle.jpg" };
var fumble = { playType: "rush", side: "defense", yards: 0, imgsrc: "fumble.jpg", turnover: true };
var interception = { playType: "pass", side: "defense", yards: 0, imgsrc: "interception.jpg", turnover: true };
var bombBlock = { playType: "bomb", side: "defense", yards: 0, imgsrc: "passblock.jpg" };
var kickBlock = { playType: "kick", side: "defense", yards: 0, imgsrc: "kickblock.jpg", turnover: true };
var puntBlock = { playType: "punt", side: "defense", yards: 0, imgsrc: "puntblock.jpg" };
var incompletePass = { playType: "pass", side: "defense", yards: 0, imgsrc: "passblock.jpg" };
var deckOffense = [
    rush5, rush5, rush5, rush5,
    rush10, rush10,
    rush15, rush15,
    rush30,
    pass5, pass5, pass5, pass5,
    pass10, pass10,
    pass15, pass15,
    bombPass,
    punt40, punt40,
    kick40, kick40
];
exports.deckOffense = deckOffense;
var deckDefense = [
    tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle0,
    tackle5, tackle5, tackle5, tackle5,
    tackle10, tackle10,
    fumble,
    interception,
    bombBlock,
    kickBlock,
    puntBlock,
    incompletePass, incompletePass, incompletePass, incompletePass, incompletePass, incompletePass
];
exports.deckDefense = deckDefense;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map