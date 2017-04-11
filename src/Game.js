import React from "react";
import "./Game.css";

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    renderRow(start) {
        return (
            <div className="board-row">
                {this.renderSquare(start)}
                {this.renderSquare(start + 1)}
                {this.renderSquare(start + 2)}
            </div>)
    }

    render() {
        return (
            <div className="grid-item 1/2">
                <div className="board">
                    {this.renderRow(0)}
                    {this.renderRow(3)}
                    {this.renderRow(6)}
                </div>
            </div>
        );
    }

}

class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            stepNumber: 0,
            history: [{
                squares: new Array(9).fill(null)
            }],
            xIsNext: true
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        return (
            <div className="game grid">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <div className="game-info grid-item 1/2">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            stepNumber: history.length,
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        //noinspection RedundantConditionalExpressionJS
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });

    }
}

export default Game;

function calculateWinner(squares) {
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
