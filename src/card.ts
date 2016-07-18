class Card {
    public string: playType
    public string: side
    public number: yards
    public string: imgsrc
    public boolean: turnOver = false
    constructor(playType, side, yards, imgsrc) {
        this.playType = playType
        this.side = side
        this.yards = yards
        this.imgsrc = imgsrc
    }
    public showCard = function() {
        return '<div class="' + 
               this.playType + 
               '"><img class="cardImg" src="pics/' + 
               this.imgsrc + 
               '" /> <p class="playType">' + 
               this.playType + 
               '</p> <p class="yards">' + 
               this.yards + 
               ' yards</p></div>'
    } 
}

// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
//     module.exports = Card;
// }