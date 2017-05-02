class Game {

    constructor() {
        this.history = [{
            move: 0,
            squares: new Array(9).fill(null)
        }];
    }

    addNewState(newState) {
        const nextMove = this.history.length;
        this.history = this.history.concat({
            move: nextMove,
            squares: newState
        });
    }

    calculateWinner(){
        const squares = this.history[this.history.length - 1].squares;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

export default Game;