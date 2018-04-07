// var Game = require("../game.js");

describe("Game", function() {
    var Game = require("../src/game.ts");
    var game;
    
    beforeEach(function() {
        game = new Game("ralph", "david");
    });
    
    it("is a game object", function() {
        expect(game).toEqual(jasmine.any(Game));
    })
    it("has a player one", function() {
        expect(game.player1).not.toBeNull();
    })
    it("has a player two", function() {
        expect(game.player2).not.toBeNull();
    })
    it("returns name for player 1", function() {
        expect(game.player1.name).toEqual("ralph");
    })
    it("returns score for player 1", function() {
        expect(game.player1.score).toEqual(0);
    })
    it("returns the number of plays left", function() {
        expect(game.playsLeft).toEqual(32);
    })
})

describe("Game methods", function() {
    var Game = require("../game");
    var game;
    
    beforeEach(function() {
        game = new Game("ralph", "david");
    });
    
    xit("changes the score for a player", function() {
        game.scores(player1, 7);
        expect(game.player1.score).toEqual(7);
    })
})