describe("Deck", function() {

    let rush5;
    let rush10;
    let deck;
    
    beforeEach(function() {
        rush5 = new Card("Rush", "offense", 5, "rush.jpg");
        rush10 = new Card("Rush", "offense", 10, "rush.jpg"); 
        deck = new Deck([rush5, rush10]);
    });
    
    it('is a deck object', function() {
        expect(deck).toEqual(jasmine.any(Deck));
    });
    it('has an array of objects', function() {
        expect(deck.cards).toEqual(jasmine.any(Array));
    });
    it('has an array of card objects', function() {
        expect(deck.cards[0]).toEqual(jasmine.any(Card));
    });
})

describe("deal method", function() {
    let rush5;
    let rush10;
    let deck;
    
    beforeEach(function() {
        rush5 = new Card("Rush", "offense", 5, "rush.jpg");
        rush10 = new Card("Rush", "offense", 10, "rush.jpg"); 
        deck = new Deck([rush5, rush10]);
    });
    
    it('returns the first card in the deck', function() {
       expect(deck.deal()).toEqual(rush5); 
    });
    it('removes the dealt card from the deck', function() {
       deck.deal();
       expect(deck.cards.length).toEqual(1); 
    });
    it('returns false if the deck is empty', function() {
        for (var i = 0; i <= deck.cards.length; i++){
            deck.deal();
        }
        expect(deck.deal()).toBe(false);
    })
})

describe("shuffle method", function() {
    let rush5; 
    let rush10; 
    let tackle0; 
    let tackle5;
    let deck;
    
    beforeEach(function() {
        rush5 = new Card("Rush", "offense", 5, "rush.jpg");
        rush10 = new Card("Rush", "offense", 10, "rush.jpg");
        tackle0 = new Card("Rush", "defense", 0, "tackle.jpg");
        tackle5 = new Card("Rush", "defense", 5, "tackle.jpg");
        deck = new Deck([rush5, rush10, tackle0, tackle5]);
    });
    
    it("returns a card arr", function() {
        expect(deck.shuffle()).toEqual(jasmine.any(Array));
    });
    xit("changes the first card", function() {
       let ogDeck = deck.shuffle();
       expect(ogDeck[0]).not.toEqual(rush5); 
    });
    it("modifies sort of whole deck", function() {
        let origDeck = [];
        for (var i = 0; i < deck.cards.length; i++) {
            origDeck.push(deck.cards[i]);
        }
        let shuffledDeck = deck.shuffle();
        expect(origDeck).not.toEqual(deck.shuffle());
    });
});

describe("deck is empty method", function() {
    let deck, rush5, rush10;

    beforeEach(function() {
        rush5 = new Card("Rush", "offense", 5, "rush.jpg");
        rush10 = new Card("Rush", "offense", 10, "rush.jpg");
        deck = new Deck([rush5]);
    }); 
    
    it("returns false when the deck is not empty", function() {
        expect(deck.isEmpty()).toBe(false);
    });   
    it("returns true when the deck is empty", function() {
        deck.deal();
        expect(deck.isEmpty()).toBe(true); 
    });
});