import { Game } from "./Game.js";

const game = new Game('canvas', 5, 5, {});

game.getRandomLive();

console.log(game);