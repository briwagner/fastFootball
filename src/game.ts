import { Player } from './player';
import { Card } from './card';

export class Game {
    public player1: Player;
    public player2: Player;
    private playsLeft: number;
    constructor(public playerOneName: string, public playerTwoName: string) {
        this.player1 = new Player(playerOneName)
        this.player2 = new Player(playerTwoName)
        this.playsLeft = 32
    }
}
