export class Game {
    constructor(selectorId, cols, rows, liveCells) {
        this.cols = cols;
        this.rows = rows;
        this.prevLiveCells = {};
        this.liveCells = liveCells;
        this.nodeCanvas = document.getElementById(selectorId);
        this.sizeCell = 20;

        if (!this.nodeCanvas) {
            return;
        }

        this.ctx = this.nodeCanvas.getContext('2d');

        this.getRandomLive = this.getRandomLive.bind(this);

        this.init();
    }

    getRandomLive() {
        const cells = {};
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (Math.random() > 0.7) {
                    cells[`${x}:${y}`] = true;
                }
            }
        }
        this.liveCells = cells;
    }

    checkLiveCell(x, y) {
        let dx = x;
        let dy = y;
        if (x < 0) {
            dx = this.cols - 1;
        }
        if (x === this.cols) {
            dx = 0;
        }
        if (y < 0) {
            dy = this.rows - 1;
        }
        if (y === this.rows) {
            dy = 0;
        }
        const strCell = dx + ':' + dy;

        if (this.liveCells[strCell]) {
            return true;
        } 
        return false;
    }

    countNeighbours(x, y) {
        let count = 0;
        
        if (this.checkLiveCell(x + 1, y)) {
            count++;
        }
        if (this.checkLiveCell(x - 1, y)) {
            count++;
        }
        if (this.checkLiveCell(x, y + 1)) {
            count++;
        }
        if (this.checkLiveCell(x, y - 1)) {
            count++;
        }
        if (this.checkLiveCell(x - 1, y - 1)) {
            count++;
        }
        if (this.checkLiveCell(x + 1, y - 1)) {
            count++;
        }
        if (this.checkLiveCell(x - 1, y + 1)) {
            count++;
        }
        if (this.checkLiveCell(x + 1, y + 1)) {
            count++;
        }

        return count;
    }

    calcNextGeneration() {
        const nextGeneration = {};
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const count = this.countNeighbours(x, y);
                const strCell = x + ':' + y;

                // console.log(strCell, count);
                if (this.liveCells[strCell] && (count === 2 || count === 3)) {
                    nextGeneration[strCell] = true;
                } 
                if (!this.liveCells[strCell] && count === 3) {
                    nextGeneration[strCell] = true;
                }
            }
        }
        console.log('prev', this.liveCells);
        console.log('next', nextGeneration);
        this.prevLiveCells = {...this.liveCells};
        this.liveCells = {...nextGeneration};
        console.log('current', this.liveCells);
    }

    drawStage() {
        
        // this.ctx.clearRect(0,0, width, height);
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const isPrevLive = this.prevLiveCells[`${x}:${y}`] ? true : false;
                const isCurrentLive = this.checkLiveCell(x, y);
                if (isPrevLive !== isCurrentLive) {
                    if (isCurrentLive) {
                        this.ctx.fillStyle = '#000';
                        
                    } else {
                        this.ctx.fillStyle = '#fff';
                    }
                    this.ctx.fillRect(x * this.sizeCell + 1, y * this.sizeCell + 1, this.sizeCell - 2, this.sizeCell - 2);
                }
                // if (this.checkLiveCell(x, y)) {
                //     this.ctx.fillRect(x * this.sizeCell, y * this.sizeCell, this.sizeCell, this.sizeCell);
                // } else {
                //     this.ctx.strokeRect(x * this.sizeCell, y * this.sizeCell, this.sizeCell, this.sizeCell);
                // }
            }
        }
    }

    drawGrid() {
        for (let x = 0; x <= this.cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.sizeCell, 0);
            this.ctx.lineTo(x * this.sizeCell, this.rows * this.sizeCell);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.sizeCell);
            this.ctx.lineTo(this.cols * this.sizeCell, y * this.sizeCell);
            this.ctx.stroke();
        }
    }

    init() {
        const width = this.sizeCell * this.cols;
        const height = this.sizeCell * this.rows;
        this.nodeCanvas.width = width;
        this.nodeCanvas.height = height;
        this.drawGrid();
    }

}