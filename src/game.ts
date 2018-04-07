import { Player } from './player';
import { Card } from './card';
import { Play } from './play';

export class Game {
  public home: Player
  public visitor: Player
  public playsLeft: number
  public ballSpot: number
  public currentDown: number
  public plays: Array<Play>

  constructor(public homeName: Player, public visitorName: Player) {
    this.home = homeName
    this.visitor = visitorName
  }

  startGame() {
    this.playsLeft = 32;
    this.ballSpot = 20;
    this.currentDown = 1;
    this.plays = [];
  }

  playDown(cardOne: Card, cardTwo: Card) {
    if (this.playsLeft == 0) {
      return;
    }
    this.playsLeft -= 1;
    let nextPlay = new Play(cardOne, cardTwo, this.ballSpot);
    this.plays.push(nextPlay);
    // Do something.
    let playResult = nextPlay.getResult();
    // Set ballSpot.
    this.setBallSpot(playResult);
    return nextPlay;
  }

  setBallSpot(playResult: Play) {
    if (playResult.scoring) {
      // Touchdown puts ball at goalline.
      this.ballSpot = 0;
    }
    else if (playResult.turnover) {
      // Ball spot is unchanged.
      let nothingHappens;
      this.switchSides();
    } else {
      // Typical play.
      this.ballSpot = playResult.yardStart - playResult.yardage;
    }
  }

  playerOffense() {
    if (this.home.inPossession) {
      return this.home;
    } else {
      return this.visitor;
    }
  }

  switchSides() {
    if (this.playerOffense() == this.home) {
      this.home.inPossession = false;
      this.visitor.inPossession = true;
    } else {
      this.home.inPossession = true;
      this.visitor.inPossession = false;
    }
  }
}
