function Gameboard() {
    this.board = new Array(9).fill(0);
    
    Gameboard.prototype.clear = function () {
        for (let i = 0; i < 9; i++) {
            this.board[i] = 0;
        }
    };

    Gameboard.prototype.input = function(i, x) {
        if (i > 9 || i < 0) {
            return false;
        }
        if (x > 2 || x <= 0) {
            return false;
        }
        if (this.board[i] != 0) {
            return false;
        }
        this.board[i] = x;
        return true;

    };

    Gameboard.prototype.checkWinner = function() {
        // check vertical
        for (let i = 0; i < 3; i++) {
            const target = this.board[i];
            if (target != 0 && this.board[i+3] == target && this.board[i+6] == target) {
                return target;
            }
        }
        // check horizontal
        for (let i = 0; i < 9; i += 3) {
            const target = this.board[i];
            if (target != 0 && this.board[i+1] == target && this.board[i+2] == target) {
                return target;
            }
        }
        // check diagonal
        let target = this.board[0];
        if (target != 0 && this.board[4] == target && this.board[8] == target) {
            return target;
        }
        target = this.board[2];
        if (target != 0 && this.board[4] == target && this.board[6] == target) {
            return target;
        }
        return 0;
    };
};

function Player(x) {
    this.id = x;
    Player.prototype.getId = function () {
        return this.id;
    };

    Player.prototype.getMove = function () {
        return prompt("Player " + this.getId() + " input move:");
    };
};

function Game() {
    this.gb = new Gameboard();
    this.players = [new Player(1), new Player(2)];
    this.turn_num = 0

    Game.prototype.turn = function () {
        const currPlayer = this.players[this.turn_num % 2];
        let move, valid;
        do {
            move = currPlayer.getMove();
            valid = this.gb.input(move, currPlayer.getId());
            if (!valid) {
                console.log("move " + move + " not valid");
            }
        } while (!valid);
        console.log("Player " + currPlayer.getId() + ": " + move);
        const res = this.gb.checkWinner();
        this.turn_num++;
        return res;
    };

    Game.prototype.play = function () {
        let state = false;
        while (!state && this.turn_num < 9) {
            state = this.turn();
        }
        if (this.turn_num >= 9) {
            console.log("Draw");
        } else {
            console.log("Winner is " + state);
        }
    }
}

const gm = new Game();
gm.play();