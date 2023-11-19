export class Game {
    constructor(selectorId, cols, rows, liveCells) {
        this.cols = cols;
        this.rows = rows;
        this.liveCells = liveCells;
        this.node = document.getElementById(selectorId);

        this.sizeCell = 5;

        if (!this.node) {
            return;
        }

        this.ctx = this.node.getContext('2d');

        this.getRandomLive = this.getRandomLive.bind(this);
    }

    getRandomLive() {
        const cells = {};
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (Math.random() > 0.6) {
                    cells[`${x}:${y}`] = true;
                }
            }
        }
        this.liveCells = cells;
    }

    drawStage() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                
            }
        }
    }

}