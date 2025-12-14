import Player from './player.js';

export default function Game() {
  const human = Player(false);
  const computer = Player(true);

  let currentPlayer = human;
  let gameOver = false;

  // Check game is ready
  const isReady = () => {
    return human.board.ships.length > 0;
  };

  const playTurn = (x, y) => {
    if (gameOver || currentPlayer !== human) return;

    // Check not attacking same area
    if (computer.board.attackedCoordinates.some(
      ([ax, ay]) => ax === x & ay === y
    )) {
      // console.log("Choose unattacked square")
      return "Choose unattacked square";
    }

    human.attack(computer.board, x, y);

    if (computer.board.allShipsSunk()) {
      gameOver = true;
      // console.log("Human wins")
      return "Human wins!";
    }

    currentPlayer = computer;
    computerTurn();

    if (human.board.allShipsSunk()) {
      gameOver = true;
      // console.log("Computer wins")
      return "Computer wins!";
    }

    currentPlayer = human;
    return ""
  };

  const computerTurn = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      human.board.attackedCoordinates.some(
        ([ax, ay]) => ax === x && ay === y
      )
    );

    computer.attack(human.board, x, y);
  };

  return {
    human,
    computer,
    playTurn,
    isGameOver: () => gameOver,
    isReady,
  };
}
