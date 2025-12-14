import Gameboard from '../src/gameboard.js';

describe('Gameboard', () => {
  test('can place a ship at specific coordinates', () => {
    const board = Gameboard();
    board.placeShip(0, 0, 3);

    expect(board.ships.length).toBe(1);
  });

  test('receiveAttack hits a ship when coordinates match', () => {
    const board = Gameboard();
    board.placeShip(0, 0, 2);

    board.receiveAttack(0, 0);

    expect(board.ships[0].ship.hits).toBe(1);
  });

  test('receiveAttack records missed attacks', () => {
    const board = Gameboard();

    board.receiveAttack(5, 5);

    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test('allShipsSunk returns false if ships are not sunk', () => {
    const board = Gameboard();
    board.placeShip(0, 0, 2);

    board.receiveAttack(0, 0);

    expect(board.allShipsSunk()).toBe(false);
  });

  test('allShipsSunk returns true when all ships are sunk', () => {
    const board = Gameboard();
    board.placeShip(0, 0, 1);

    board.receiveAttack(0, 0);

    expect(board.allShipsSunk()).toBe(true);
  });
});
