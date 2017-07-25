export class Player {
    public score: number;
    constructor(public name: string) {
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
