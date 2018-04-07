import { Game } from '../src/game';
import { Player } from '../src/player';
import { Card } from '../src/card';
import { expect } from 'chai';
import 'mocha';

describe('Game', () => {
  let home = new Player('home player');
  let visitor = new Player('visiting player');
  let game = new Game(home, visitor);
  game.startGame();

  it('should have a home player', () => {
    expect(game.home).to.be.an.instanceof(Player);
  });
  it('should have a visitor player', () => {
    expect(game.visitor).to.be.an.instanceof(Player);
  });
  it('should start with no plays', () => {
    expect(game.plays).to.be.empty;
  });
  it('should start with 32 plays left', () => {
    expect(game.playsLeft).to.equal(32);
  });
})

describe('Game play', () => {
  let home = new Player('home player');
  let cardOff = new Card({playType: "rush", side: "offense", yards: 5, imgsrc: "rush.jpg"});
  home.getCards([cardOff]);

  let visitor = new Player('visiting player');
  let cardDef = new Card({playType: "rush", side: "defense", yards: 0, imgsrc: "tackle.jpg"});
  visitor.getCards([cardDef]);
  
  let game = new Game(home, visitor);
  game.startGame();
  let playCount = game.playsLeft;

  game.playDown(cardOff, cardDef);

  it('should store a play after a down is played', () => {
    expect(game.plays.length).to.equal(1);
  });
  it('should change the playsLeft when a down is played', () => {
    expect(game.playsLeft).to.not.equal(playCount);
  });
})