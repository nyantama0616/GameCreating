class Game {
    static w = 15;
    static h = 32;
    static startX = 6;
    static startY = 1;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.field = new Array(Game.h);
        this.activeMino = Mino.createMino(Game.startX, Game.startY, true);
        for (let i = 0; i < Game.h; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < Game.w; j++) {
                let block = new Block(this.x + j * Block.l + 2 * j, this.y + i * Block.l + 2 * i);
                if (i == Game.h - 1 || j == 0 || j == Game.w - 1) {
                    block.setLit(true);
                    block.setIsLocked(true);
                }
                this.field[i].push(block);
            }
        }
        Object.seal(this);
    }

    getBlock(i, j) {
        return this.field[i][j];
    }

    draw() {
        for (let i = 0; i < Game.h; i++) {
            for (let j = 0; j < Game.w; j++) {
                this.field[i][j].draw();
            }
        }

        if (!this.activeMino.isActive) {
            this.activeMino = Mino.createMino(Game.startX, Game.startY, true);
        }

        this.activeMino.draw(this.field);
    }

    showField() {
        for (let i = 0; i < Game.h; i++) {
            let temp = this.field[i].map((block) => {
                return Number(block.getLit());
            });
            console.log(temp.toString());
        }
    }
}
