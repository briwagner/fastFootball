import { Player } from '../src/player';
import { Card } from '../src/card';
import { expect } from 'chai';
import 'mocha';

describe('Player One', () => {
  let player = new Player('brian');
  it('should be a player', () => {
    expect(player).to.be.an.instanceof(Player);
  });
  it('should have a name property', () => {
    expect(player).to.have.ownProperty('name');
  });
  it('should have the name passed at construct', () => {
    expect(player.name).to.equal('brian');
  });
  it('should have a score property', () => {
    expect(player).to.have.ownProperty('score');
  });
  it('should have score Zero at init', () => {
    expect(player.score).to.equal(0);
  });
});

describe('Player card methods', () => {
  let player = new Player('brian');
  let card = new Card({playType: 'rush', side: 'offense', yards: 10, imgsrc: 'rush10.jpg'})
  let cardTwo = new Card({playType: 'pass', side: 'offense', yards: 10, imgsrc: 'pass5.jpg'})
  let cardThree = new Card({playType: 'rush', side: 'offense', yards: 15, imgsrc: 'rush15.jpg'});
  let cardFour = new Card({playType: 'pass', side: 'offense', yards: 10, imgsrc: 'pass10.jpg'});
  let cardFive = new Card({playType: 'rush', side: 'offense', yards: 5, imgsrc: 'rush5.jpg'});

  player.getCards([card]);

  it('should change score with the makesScore method', () => {
    player.makesScore(6);
    expect(player.score).to.equal(6);
  });
  it('should give player new cards', () => {
    expect(player.cards.length).to.equal(1);
  });
  xit('should play a card from the players hand', () => {
    let playedCard = player.playCard(cardTwo);
    expect(playedCard).to.equal(cardTwo);
    expect(player.cards.length).to.equal(1);
  });
  xit('should only play cards in the players hand', () => {
    let illegalPlay = player.playCard(cardThree);
    expect(illegalPlay).to.equal(false);
  });
  it('should move cards to hand when drawn', () => {
    player.drawCard();
    expect(player.hand.length).to.equal(1);
  });
  it('should remove cards from the deck when drawn', () => {
    expect(player.cards.length).to.equal(0);
  });
  it('should throw an error if the player deck is empty when drawing', () => {
    // This seems to need to be wrapped in an anonymous function.
    expect(function() {player.drawCard()}).to.throw();
  })
  it('should shuffle the order of cards', () => {
    let deck = [card, cardTwo, cardThree, cardFour, cardFive];
    player.getCards(deck);
    player.shuffleCards();
    // This will not always work, based on race conditions,
    expect(card).to.not.equal(player.cards[0]);
  })
});