export default function DOMController(game) {
  const playerBoardEl = document.querySelector('#player-board');
  const enemyBoardEl = document.querySelector('#enemy-board');
  const statusEl = document.querySelector('#status');

  const randomBtn = document.querySelector('#randomise');

  randomBtn.addEventListener('click', () => {
    game.human.board.placeShipsRandomly([5, 4, 3, 3, 2]);
    game.computer.board.placeShipsRandomly([5, 4, 3, 3, 2]);
    render();
  });

  const renderStatus = (message) => {
    if (message) {
      statusEl.textContent = message;
    } else {
      statusEl.textContent = ""
    }

  };


  const renderBoard = (board, element, isEnemy = false) => {
    element.innerHTML = '';

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (
        board.missedAttacks.some(
          ([mx, my]) => mx === x && my === y
        )
        ) {
          cell.classList.add('miss');
        }

        if (
        board.hitAttacks.some(
          ([hx, hy]) => hx === x && hy === y
        )
      ) {
          cell.classList.add('hit');
        }

        if (isEnemy && !game.isGameOver()) {
          cell.addEventListener('click', () => {
            if (!game.isReady()) {
              renderStatus("Game not ready")
              return;
            }
            
            const message = game.playTurn(x, y);
            render();
            renderStatus(message);
          });
        }

        element.appendChild(cell);
      }
    }
  };

  const render = () => {
    renderBoard(game.human.board, playerBoardEl);
    renderBoard(game.computer.board, enemyBoardEl, true);
  };

  return { render };
}
