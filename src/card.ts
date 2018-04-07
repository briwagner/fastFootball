import { Player } from './player';

export class Card {
  public playType: string
  public side: string
  public yards: number
  public imgsrc: string
  public turnover: boolean
  public owner: Player

  constructor(obj) {
    this.playType = obj.playType;
    this.side = obj.side;
    this.yards = obj.yards;
    this.imgsrc = obj.imgsrc;
    this.turnover = obj.turnover ? obj.turnover : false;
  }
  
  public showCard = function() {
    return '<div class="' + this.playType + '"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>';
  } 
}
