describe("Card", function() {
    // var Card = require("./app.js");
    var rush5;
    
    beforeEach(function() {
       rush5 = new Card("Rush", "offense", 5, "rush.jpg"); 
    });
    
    it('is a card', function() {
        expect(rush5).toEqual(jasmine.any(Card));    
    })
    
    it('shows the play type', function() {
        expect(rush5.playType).toEqual("Rush");
    })
    
    it('shows the play side offense/defense', function() {
        expect(rush5.side).toEqual("offense");
    })
    
    it('shows the yard value', function() {
        expect(rush5.yards).toEqual(5);
    })
    
    it('returns a number for yards', function() {
        expect(rush5.yards).toEqual(jasmine.any(Number));
    })
    
    it('has an image link', function() {
        expect(rush5.imgsrc).toEqual('rush.jpg');
    })
    
});

describe("showCard function", function() {
    // var Card = require("./app");
    var rush5;
    
    beforeEach(function() {
       rush5 = new Card("Rush", "offense", 5, "rush.jpg"); 
    });
    
    it('has a showCard function that returns a string', function() {
        expect(rush5.showCard()).toEqual(jasmine.any(String));
    })
    
    it('returns the yards', function() {
        expect(rush5.showCard()).toContain("Rush");
    })
    
    it('doesnt return the play side', function() {
        expect(rush5.showCard()).not.toContain("offense");
    })
})