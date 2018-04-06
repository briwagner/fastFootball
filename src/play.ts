import { Card } from './card';

export class Play {
  public cardOne: Card;
  public cardTwo: Card;
  public turnover: boolean;
  public yardage: number;
  public yardStart: number;
  public playType: string;
  public scoring: boolean;

  constructor(cardOne: Card, cardTwo: Card, yardStart: number) {
    this.cardOne = cardOne
    this.cardTwo = cardTwo
    this.yardStart = yardStart
    this.turnover = false
    this.scoring = false
  }

  getResult() {
    // Defense wins.
    if (this.cardOne.playType == this.cardTwo.playType) {
      this.playType = this.cardTwo.playType;
      if (this.cardTwo.turnOver) {
        this.turnover == true;
        this.yardage = 0;
      } else {
        // Offense wins
        let yardDiff = this.cardOne.yards - this.cardTwo.yards;
        // Yardage is never negative.
        this.yardage = yardDiff < 0 ? 0 : yardDiff;
      }
    } else {
      // Offense wins.
      this.playType = this.cardOne.playType;
      this.yardage = this.cardOne.yards; 
      this.isScoring();
    }
    
    return this;
  }

  isScoring() {
    if (this.yardage > this.yardStart) {
      this.scoring = true;
    }
    return this.scoring;
  }
}