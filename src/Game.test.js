import Game from "./Game";

it('has an initial history', () => {
    const game = new Game();
    expect(game.history.length).toEqual(1);
});

it('has an inital empty board', () => {
    const game = new Game();
    expect(game.history[0].squares.length).toEqual(9);
});

it('should calculate winner', () => {
    const game = new Game();
    const squares = [
        'X', 'X', 'X'
    ];
    game.addNewState(squares);

    expect(game.calculateWinner()).toBeTruthy();
});
