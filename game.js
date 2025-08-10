export class Ship {
  constructor(length) {
    if (length <= 0) {
      throw new Error("Ship length must be greater than zero");
    }
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedShots = [];
  }

  placeShip(ship, y, x, horizontal = true) {
    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + 1][x] = ship;
      }
    }
  }

  receiveAttack(y, x) {
    const cell = this.board[y][x];

    if (cell && cell !== "hit") {
      cell.hit();
      this.board[y][x] = "hit";
    } else if (!cell) {
      this.board[y][x] = "miss";
      this.missedShots.push([y, x]);
    }
  }

  allSunk() {
    const ships = new Set();

    for (let row in this.board) {
      for (let cell in row) {
        if (cell && cell !== "hit" && cell !== "miss") {
          ships.add(cell);
        }
      }
    }

    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }
}

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.attackHistory = new Set();
  }

  attack(opponent, y, x) {
    opponent.gameboard.receiveAttack(y, x)
    this.attackHistory.add(`${y}, ${x}`);
  }

  randomAttack(opponent) {
    if (!this.isComputer) return;

    let y, x
    do {
      y = Math.floor(Math.random() * opponent.gameboard.size);
      x = Math.floor(Math.random() * opponent.gameboard.size);
    } while (this.attackHistory.has(`${y},${x}`));

    this.attack(opponent, y, x)
  }
}
