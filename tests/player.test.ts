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
  let card = new Card('rush', 'offense', 10, 'rush10.jpg')
  let cardTwo = new Card('pass', 'offense', 10, 'pass5.jpg')
  let cardThree = new Card('rush', 'offense', 15, 'rush15.jpg');
  let cardFour = new Card('pass', 'offense', 10, 'pass10.jpg');
  let cardFive = new Card('rush', 'offense', 5, 'rush5.jpg');

  player.getCards([card, cardTwo]);

  it('should change score with the makesScore method', () => {
    player.makesScore(6);
    expect(player.score).to.equal(6);
  });
  it('should give player new cards', () => {
    expect(player.cards.length).to.equal(2);
  });
  it('should play a card from the players hand', () => {
    let playedCard = player.playCard(cardTwo);
    expect(playedCard).to.equal(cardTwo);
    expect(player.cards.length).to.equal(1);
  });
  it('should only play cards in the players hand', () => {
    let illegalPlay = player.playCard(cardThree);
    expect(illegalPlay).to.equal(false);
  });
  it('should shuffle the order of cards', () => {
    let deck = [card, cardTwo, cardThree, cardFour, cardFive];
    player.getCards(deck);
    player.shuffleCards();
    // This will not always work, based on race conditions,
    expect(card).to.not.equal(player.cards[0]);
  })
});