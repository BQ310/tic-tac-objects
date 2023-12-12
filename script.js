function Gameboard() {
    // properties
    this.board = new Array(9).fill(0);
    // methods
    Gameboard.prototype.clear = function() {
        for (let i = 0; i < 9; i++) {
            this.board[i] = 0;
        }
    }
    Gameboard.prototype.input = function(idx, val) {
        if (idx >= 0 && idx <= 8 && val < 3 && val > 0) {
            this.board[idx] = val;
            return true;
        } else {
            return false;
        }
    }
    Gameboard.prototype.check = function() {
        const threeSame = (id1, id2, id3) => {
            const target = this.board[id1];
            if (target != 0 && this.board[id2] == target && this.board[id3] == target) {
                return target;
            }
        }
        let temp = 0;
        // horizontal check
        for (let i = 0; i < 9; i += 3) {
            temp = threeSame(i, i+1, i+2);
            if (temp) {
                return temp;
            }
        }
        // vertical check
        for (let i = 0; i < 3; i++) {
            temp = threeSame(i, i+3, i+6)
            if (temp) {
                return temp;
            }
        }
        // diagonal check
        temp = threeSame(2,4,6);
        if (temp) {
            return temp;
        }
        temp = threeSame(0,4,8);
        if (temp) {
            return temp;
        }
        return 0;
    }
}

function Player(n) {
    // properties
    this.id = n;
}

function Game() {
    // properties
    this.gb = new Gameboard();
    this.players = [new Player(1), new Player(2)];
    this.turn_num = 0;

    // methods
    Game.prototype.start = function() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener('click', this.getMove);
        });
    }

    Game.prototype.getMove = (event) => {
        const move = event.target.getAttribute("data-idx");
        this.turn(move);
    }

    Game.prototype.turn = function(move) {
        const currPlayer = this.players[this.turn_num % 2];
        this.gb.input(move, currPlayer.id);
        const res = this.gb.check();
        this.turn_num++;
        console.log("turn " + this.turn_num + " Player " + currPlayer.id + ": move on " + move);
        if (res) {
            this.end(res);
        }
    }

    Game.prototype.end = function(winner) {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.removeEventListener('click', this.getMove);
        });
        this.gb.clear();
        console.log("The winner is Player " + winner);
    }

}

const game = new Game();
game.start();