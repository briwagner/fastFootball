import { Player } from './player';
import { Card } from './card';
import { Play } from './play';

export class Game {
  public home: Player
  public visitor: Player
  private playsLeft: number
  public plays: Array<Play>
  public ballSpot: number

  constructor(public playerOneName: string, public playerTwoName: string) {
    this.home = new Player(playerOneName)
    this.visitor = new Player(playerTwoName)
    this.playsLeft = 32
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
    } else () {
      // Typical play.
      this.ballSpot = playResult.yardStart - playResult.yardage;
    }
  }
}
