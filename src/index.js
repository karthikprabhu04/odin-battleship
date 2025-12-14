import Game from './game.js';
import DOMController from './dom.js';

const game = Game();
const dom = DOMController(game);

dom.render();