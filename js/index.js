import { Game } from "./Game.js";

const elCountCols = document.getElementById('count_cols');
const elCountRows = document.getElementById('count_rows');
const btnRandom = document.getElementById('random');
const btnStart = document.getElementById('start');



// const cols = elCountCols.value ? elCountCols.value : 10;
// const rows = elCountRows.value ? elCountRows.value : 10;

const game = new Game('canvas');
window.game = game;

// game.getRandomLive();
game.drawStage();
console.log(game);

elCountCols.addEventListener('change', (e) => {
    // game.cols = +e.target.value;
    game.setCols = +e.target.value;
    game.drawGrid();
});

elCountRows.addEventListener('change', (e) => {
    // game.cols = +e.target.value;
    game.setRows = +e.target.value;
    game.drawGrid();
})

btnStart.addEventListener('click', () => {

    (function gameLoop() {
        game.calcNextGeneration();
        game.drawStage();
        setTimeout(() => window.requestAnimationFrame(gameLoop), 100);
    })()
});

btnRandom.addEventListener('click', () => {
    game.getRandomLive();
    game.drawStage();
});

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