import Player from '../src/player.js';

describe('Player', () => {
  test('creates a real player with a gameboard', () => {
    const player = Player();

    expect(player.board).toBeDefined();
    expect(player.isComputer).toBe(false);
  });

  test('creates a computer player with a gameboard', () => {
    const computer = Player(true);

    expect(computer.board).toBeDefined();
    expect(computer.isComputer).toBe(true);
  });

  test('player can attack enemy gameboard', () => {
    const player = Player();
    const enemy = Player();

    enemy.board.placeShip(0, 0, 1);
    player.attack(enemy.board, 0, 0);

    expect(enemy.board.allShipsSunk()).toBe(true);
  });
});
