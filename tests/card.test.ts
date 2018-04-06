import { Card } from '../src/card';
import { expect } from 'chai';
import 'mocha';

describe('Offense Card', () => {
  var card = new Card('rush', 'offense', 10, 'rush10.jpg');
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
    expect(card).to.have.ownProperty('turnOver');
  });
  it('should have FALSE as turnover by default', () => {
    expect(card.turnOver).to.equal(false);
  });
  it('should return an HTML element with its values', () => {
    expect(card.showCard()).to.have.string('<div class=');
  });
});

describe('Defense Card', () => {
  it('should have TRUE as turnover when passed as parameter', () => {
    let card = new Card('rush', 'defense', 0, 'fumble.jpg', true);
    expect(card.turnOver).to.equal(true);
  })
});