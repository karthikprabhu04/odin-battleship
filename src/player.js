import Gameboard from './gameboard.js';

export default function Player(isComputer = false) {
  const board = Gameboard();

  const attack = (enemyBoard, x, y) => {
    enemyBoard.receiveAttack(x, y);
  };

  return {
    board,
    isComputer,
    attack,
  };
}
