class Deck {
    public cards = []
    constructor(cardArr) {
        this.cards = cardArr
    }
    
    public deal() {
        if (this.isEmpty()) {
            return false
        } else {
            let newCard = this.cards.shift()
            return newCard
        }
    }
    
    public shuffle() {
        let array = this.cards
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
    }
    
    public isEmpty() {
        if (this.cards.length < 1) {
            return true
        } else {
            return false
        }
    }
}