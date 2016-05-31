describe("Card", function() {
    var Card = require("../models");
    var rush5;
    
    beforeEach(function() {
       rush5 = new Card("Rush", "offense", 5, "rush.jpg"); 
    });
    
    it('should be a card', function() {
        expect(rush5).toEqual(jasmine.any(Card));    
    })
    
    it('should show the play type', function() {
        expect(rush5.playType).toEqual("Rush");
    })
    
    it('should show the play side offense/defense', function() {
        expect(rush5.side).toEqual("offense");
    })
    
    it('should show the yard value', function() {
        expect(rush5.yards).toEqual(5);
    })
    
    it('should return a number for yards', function() {
        expect(rush5.yards).toEqual(jasmine.any(Number));
    })
    
    it('should have an image link', function() {
        expect(rush5.imgsrc).toEqual('rush.jpg');
    })
    
});

describe("showCard function", function() {
    var Card = require("../models");
    var rush5;
    
    beforeEach(function() {
       rush5 = new Card("Rush", "offense", 5, "rush.jpg"); 
    });
    
    it('should have a showCard function that returns a string', function() {
        expect(rush5.showCard()).toEqual(jasmine.any(String));
    })
    
    it('should return the yards', function() {
        expect(rush5.showCard()).toContain("Rush");
    })
    
    it('should not return the play side', function() {
        expect(rush5.showCard()).not.toContain("offense");
    })
})