import Ship from './ship.js';

export default function Gameboard() {
  const ships = [];
  const hitAttacks = [];
  const missedAttacks = [];
  const attackedCoordinates = [];

  const clearBoard = () => {
    ships.length = 0;
    missedAttacks.length = 0;
    hitAttacks.length = 0;
    attackedCoordinates.length = 0;
  };

  const isValidPlacement = (coordinates) => {
  return coordinates.every(([x, y]) =>
    x >= 0 &&
    x < 10 &&
    y >= 0 &&
    y < 10 &&
    !ships.some(({ coordinates: existing }) =>
      existing.some(([ex, ey]) => ex === x && ey === y)
    )
  );
};

  const placeShip = (x, y, length, direction = 'horizontal') => {
    const ship = Ship(length);
    const coordinates = [];

    for (let i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        coordinates.push([x + i, y]);
      } else {
        coordinates.push([x, y + i]);
      }
    }

    if (!isValidPlacement(coordinates)) return false;

    ships.push({
      ship,
      coordinates,
    });
    return true;
  };

  const placeShipsRandomly = (shipLengths) => {
    clearBoard();

    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        placed = placeShip(x, y, length, direction);
      }
    });

    console.log(ships);
  };


  const receiveAttack = (x, y) => {
    // Prevent duplicate attacks
    if (
      attackedCoordinates.some(
        ([ax, ay]) => ax === x && ay === y
      )
    ) {
      return false;
    }

    attackedCoordinates.push([x, y]);
    
    for (let shipObject of ships) {
      const hit = shipObject.coordinates.some(
        ([sx, sy]) => sx === x && sy === y
      );

      if (hit) {
        shipObject.ship.hit();
        hitAttacks.push([x, y]);
        return true;
      }
    }

    missedAttacks.push([x, y]);
    return false;
  };

  const allShipsSunk = () => {
    return ships.every(({ ship }) => ship.isSunk());
  };

  return {
    ships,
    hitAttacks,
    missedAttacks,
    attackedCoordinates,
    placeShip,
    receiveAttack,
    allShipsSunk,
    placeShipsRandomly
  };
}
