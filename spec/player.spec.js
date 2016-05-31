describe("Player", function() {
    var Player = require("../player");
    var player;
    
    beforeEach(function() {
        player = new Player("ralph");
    })
    
    it("returns a player's name", function() {
        expect(player.name).toEqual("ralph");
    })
    it("must receive a name", function() {
        var notPlayer = new Player();
        expect(notPlayer).toThrowError("Player must have a name");
    })
})