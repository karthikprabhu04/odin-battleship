import { Ship, Gameboard, Player } from "./game.js";
import { renderBoard } from "./dom.js";

const playerOne = new Player("Human");
const playerTwo = new Player("Computer");

// --- Predetermined ships for testing ---
playerOne.gameboard.placeShip(new Ship(4), 0, 0, true); // length 4, top-left, horizontal
playerOne.gameboard.placeShip(new Ship(3), 2, 5, false); // length 3, vertical
playerOne.gameboard.placeShip(new Ship(2), 5, 2, true); // length 2

playerTwo.gameboard.placeShip(new Ship(4), 1, 1, true);
playerTwo.gameboard.placeShip(new Ship(3), 4, 4, false);
playerTwo.gameboard.placeShip(new Ship(2), 7, 7, true);

// --- Render initial boards ---
const grid1 = document.getElementById("grid1");
const grid2 = document.getElementById("grid2");

renderBoard(playerOne.gameboard.board, grid1);
renderBoard(playerTwo.gameboard.board, grid2);