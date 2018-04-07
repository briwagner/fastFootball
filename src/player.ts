import { Card } from './card';

export class Player {
  public score: number
  public name: string
  public cards: Array<Card>
  public inPossession: boolean
  public hand: Array<Card>

  constructor(name: string) {
    if (name === undefined) {
      throw "Player must have a name"
    } else {
      this.name = name
      this.score = 0
      this.hand = [];
    }
  }
    
  public makesScore(x: number) {
    this.score += x
    return this.score
  } 

  public getCards(cards: Array<Card>) {
    cards.forEach(obj => {
      obj.owner = this;
      return obj;
    });
    this.cards = cards;
  }

  public drawCard() {
    if (this.cards.length ==0) {
      throw 'No more cards in the pile'
    } else {
      let topCard = this.cards.shift();
      this.hand.push(topCard);
    }
  }

  public playCard(card: Card) {
    if (this.cards.indexOf(card) != -1) {
      return this.cards.splice( this.cards.indexOf(card) )[0];
    }
    return false;
  }

  public shuffleCards() {
    let array = this.cards;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.cards = array;
  }
}