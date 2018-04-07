import { Game } from './game';
import { Play } from './play';
import { Player } from './player';
import { Card } from './card';
import { deckOffense, deckDefense } from './cards.default';

let home = new Player('home player');
let visitor = new Player('visitor');

let game = new Game(home, visitor);

let deckO = [];
let deckD = [];

deckOffense.forEach(obj => {
  let card = new Card(obj);
  deckO.push(card);
});
deckDefense.forEach(obj => {
  let card = new Card(obj);
  deckD.push(card);
})

home.getCards(deckO);
home.shuffleCards();

visitor.getCards(deckD);
visitor.shuffleCards();

home.drawCard();
visitor.drawCard();

console.log(home.hand);
console.log(visitor.hand);