import { Game } from "./Game.js";

const game = new Game('canvas', 10, 10, {
    '1:0': true,
    '1:1': true,
    '1:2': true
});
window.game = game;

game.getRandomLive();
game.drawStage();
console.log(game);

const next = document.getElementById('next');
next.addEventListener('click', () => {
    const timeStart = new Date().getTime();
    game.calcNextGeneration();
    game.drawStage();
    const timeEnd = new Date().getTime();
    console.log(game);
    const timeCreate = timeEnd - timeStart;
    console.log('Время создания: ', timeCreate, 'ms');
});