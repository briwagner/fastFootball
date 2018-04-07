import { Card } from '../src/card';
import { Play } from '../src/play';
import { expect } from 'chai';
import 'mocha';

describe('Play', () => {
  let cardOne = new Card({playType: 'rush', side: 'offense', yards: 10, imgsrc: 'rush10.jpg'});
  let cardTwo = new Card({playType: 'rush', side: 'defense', yards: 10, imgsrc: 'fumble.jpg', turnover: true});
  let play = new Play(cardOne, cardTwo, 25);
  it('should have one card', () => {
    expect(play.cardOne).to.be.an.instanceof(Card);
  });
  it('should have another card', () => {
    expect(play.cardTwo).to.be.an.instanceof(Card);
  });
  it('should have a card type offense', () => {
    expect(play.cardOne.side).to.equal('offense');
  });
  it('should have a card type defense', () => {
    expect(play.cardTwo.side).to.equal('defense');
  });
  it('should have a property turnover is false at init', () => {
    expect(play.turnover).to.equal(false);
  });
});

describe('Play method getResult', () => {
  let cardOne = new Card({playType: 'rush', side: 'offense', yards: 10, imgsrc: 'rush10.jpg'});
  let cardTwo = new Card({playType: 'rush', side: 'defense', yards: 10, imgsrc: 'fumble.jpg', turnover: true});
  let play = new Play(cardOne, cardTwo, 25);
  let playResult = play.getResult();

  it('should return the Play', () => {
    expect(playResult).to.be.instanceof(Play);
  });
  it('should record the yardage result', () => {
    expect(playResult.yardage).to.equal(0);
  });
  it('should know if it is a scoring play', () => {
    expect(play.isScoring()).to.equal(false);
  })
});