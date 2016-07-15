describe("Player", function() {
    // var Player = require(["./app.js"]);
    var player;
    
    beforeEach(function() {
        player = new Player("ralph");
    })
    
    it("returns a player's name", function() {
        expect(player.name).toEqual("ralph");
    })
    it("must receive a name", function() {
        var notPlayer = function() { new Player() };
        expect(function() { notPlayer(); }).toThrow();
    })
})

// add check if score() is called empty, it turns .score into NaN