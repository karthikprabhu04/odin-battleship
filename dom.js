
export function renderBoard(board, container, showShips = false) {
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(10, 30px)"
  container.style.gap = "2px";

   board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const coordinate = document.createElement("button");
      coordinate.style.width = "30px";
      coordinate.style.height = "30px";

      if (cell === "hit") {  // hit marker
        coordinate.style.backgroundColor = "red";
      } else if (cell === "miss") {  // miss marker
        coordinate.style.backgroundColor = "lightblue";
      } else if (showShips && cell instanceof Object && cell.length) {
        // Show ship only if showShips is true
        coordinate.style.backgroundColor = "gray";
      } else {
        coordinate.style.backgroundColor = "lightgray";
      }

      container.appendChild(coordinate);
    });
  });
}
