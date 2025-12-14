import Ship from '../src/ship.js';

describe('Ship', () => {
  test('creates a ship with a given length', () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
  });

  test('ship starts with 0 hits', () => {
    const ship = Ship(3);
    expect(ship.hits).toBe(0);
  });

  test('hit() increases number of hits', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() returns false if hits < length', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() returns true if hits === length', () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
