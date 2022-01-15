// ROCK: 0 | PAPER: 1 | SCISSORS: 2
// No enum here because Math is easier and I don't know enough JS.

const GameResult = Object.freeze({
    DRAW: 0,
    WIN: 1,
    LOSE: 2
});

const GameWinner = Object.freeze({
    DRAW: 0,
    HUMAN: 1,
    COMPUTER: 2
});

class Player {
    constructor() {
        this.winCount = 0;
        this.previousGameWon = undefined;
        this.previousMove = undefined;
    }
}

class RockPaperScissor {
    constructor() {
        this.gameId = 0;

        this.human = new Player();
        this.computer = new Player();
    }

    playRandom() {
        return Math.floor(Math.random() * 3);
    }

    getComputerMove() {
        if (Math.abs(this.human.winCount - this.computer.winCount) > 4) {
            // The *AI* has been figured out
            // Or vice versa 😱
            return this.playRandom();
        }
        switch (this.computer.previousGameWon) {
            case GameResult.DRAW:
                return this.playRandom();
            case GameResult.WIN:
                return this.human.previousMove;
            case GameResult.LOSE:
                return 3 - this.human.previousMove - this.computer.previousMove;
            default:
                // First game
                return this.playRandom();
        }
    }

    getWinner(humanMove, computerMove) {
        if (humanMove == computerMove) {
            return GameWinner.DRAW;
        } else {
            if (humanMove == 0 && computerMove == 1) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 0 && computerMove == 2) {
                return GameWinner.HUMAN;
            } else if (humanMove == 1 && computerMove == 0) {
                return GameWinner.HUMAN;
            } else if (humanMove == 1 && computerMove == 2) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 2 && computerMove == 0) {
                return GameWinner.COMPUTER;
            } else if (humanMove == 2 && computerMove == 1) {
                return GameWinner.HUMAN;
            }
        }
    }

    play(humanMove) {
        this.gameId++;

        let computerMove = this.getComputerMove();
        let winner = this.getWinner(humanMove, computerMove);

        this.computer.previousMove = computerMove;
        this.human.previousMove = humanMove;

        switch (winner) {
            case GameWinner.DRAW:
                this.computer.previousGameWon = GameResult.DRAW;
                break;
            case GameWinner.HUMAN:
                this.computer.previousGameWon = GameResult.LOSE;
                this.human.winCount += 1;
                break;
            case GameWinner.COMPUTER:
                this.computer.previousGameWon = GameResult.WIN;
                this.computer.winCount += 1;
                break;
            default:
                break;
        }

        // Update UI
        // Should probably return this value and move the updates outside the class.
        updateComputerMove(computerMove);

        return winner;
    }
};

let game = new RockPaperScissor();

function updateComputerMove(computerMove) {
    let computerMoveString = "The computer chose ";
    switch (computerMove) {
        case 0:
            computerMoveString += "✊ ROCK"
            break;
        case 1:
            computerMoveString += "🖐 PAPER"
            break;
        case 2:
            computerMoveString += "✌ SCISSORS"
            break;
        default:
            break;
    }
    document.getElementById("computerMove").innerHTML = computerMoveString;
}

function updateUI(winner) {
    // Update game number
    document.getElementById("gameNum").innerHTML = game.gameId;

    // Update winner
    let winString = "";
    switch (winner) {
        case 0:
            winString = "The Game Was Drawn ⚔";
            break;
        case 1:
            winString = "You Beat the Machines 🥇";
            break;
        case 2:
            winString = "The Machines Beat You 🤖";
            break;
        default:
            winString = "Inconsistent State, Ranveer needs Coffee. ☕";
            break;
    }
    document.getElementById("result").innerHTML = winString;

    // Update scores
    document.getElementById("humanScore").innerHTML = game.human.winCount.toString();
    document.getElementById("humanScore").innerHTML += game.human.winCount > game.computer.winCount ? " 👑" : "";
    document.getElementById("computerScore").innerHTML = game.computer.winCount.toString();
    document.getElementById("computerScore").innerHTML += game.human.winCount < game.computer.winCount ? " 👑" : "";
}

document.getElementById("rock").addEventListener("click", () => updateUI(game.play(0)));
document.getElementById("paper").addEventListener("click", () => updateUI(game.play(1)));
document.getElementById("scissors").addEventListener("click", () => updateUI(game.play(2)));