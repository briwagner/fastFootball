export class Card {
    constructor(
        public playType: string,
        public side: string,
        public yards: number,
        public imgsrc: string,
        public turnOver: boolean
    ) {
        this.playType = playType;
        this.side = side;
        this.yards = yards;
        this.imgsrc = imgsrc;
        this.turnOver = false;
    }
    public showCard = function() {
        return '<div class="' + this.playType + '"><img class="cardImg" src="pics/' + this.imgsrc + '" /> <p class="playType">' + this.playType + '</p> <p class="yards">' + this.yards + ' yards</p></div>';
    } 
}
