class Player {
    public string: name
    constructor(name) {
        if (name === undefined) {
            throw "Player must have a name"            
        } else {
            this.name = name
            this.score = 0
        }
    }
    
    public scores(x) {
        this.score += x        
    } 
}

// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
//     module.exports = Player;
// }