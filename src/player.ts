import { Card } from './card';

export class Player {
  public score: number
  public name: string
  public cards: Array<Card>

  constructor(name: string) {
    if (name === undefined) {
      throw "Player must have a name"            
    } else {
      this.name = name
      this.score = 0
    }
  }
    
  public makesScore(x: number) {
    this.score += x
    return this.score
  } 

  public getCards(cards: Array<Card>) {
    this.cards = cards;
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
    return this.cards;
  }
}
