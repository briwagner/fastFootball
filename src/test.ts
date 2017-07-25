import { Card } from './card';
import { expect } from 'chai';
import 'mocha';

describe('Card', () => {
  it('should be a card', () => {
    let card = new Card('rush', 'offense', 10, 'rush10.jpg', false);
    expect(card).to.be.an.instanceof(Card);
  })
}
);