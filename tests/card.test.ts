import { Card } from '../src/card';
import { expect } from 'chai';
import 'mocha';

describe('Offense Card', () => {
  var card = new Card({playType: 'rush', side: 'offense', yards: 10, imgsrc: 'rush10.jpg'});
  it('should be a card', () => {
    expect(card).to.be.an.instanceof(Card);
  });
  it('should have a playtype property', () => {
    expect(card).to.have.ownProperty('playType');
  });
  it('should have a play side property', () => {
    expect(card).to.have.ownProperty('side');
  });
  it('should have a yards property', () => {
    expect(card).to.have.ownProperty('yards');
  });
  it('should have a yards property that is an integer', () => {
    expect(card.yards).to.be.a('number');
  })
  it('should have an image file associated', () => {
    expect(card).to.have.ownProperty('imgsrc');
  });
  it('should have a turnover property', () => {
    expect(card).to.have.ownProperty('turnover');
  });
  it('should have FALSE as turnover by default', () => {
    expect(card.turnover).to.equal(false);
  });
  it('should return an HTML element with its values', () => {
    expect(card.showCard()).to.have.string('<div class=');
  });
});

describe('Defense Card', () => {
  it('should have TRUE as turnover when passed as parameter', () => {
    let card = new Card({playType: 'rush', side: 'defense', yards: 0, imgsrc: 'fumble.jpg', turnover: true});
    expect(card.turnover).to.equal(true);
  })
});