class Opponent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.field = new Array(Game.H);
        for (let i = 0; i < Game.H; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < Game.W; j++) {
                let block = new Block(this.x + j * Block.L + 2 * j, this.y + i * Block.L + 2 * i, Pattern.NUM);
                if (i == Game.H - 1 || j == 0 || j == Game.W - 1) {
                    block.setLit(true);
                    block.setIsLocked(true);
                }
                this.field[i].push(block);
            }
        }
    }

    draw() {
        // ここでブロック表示
        for (let i = 0; i < Game.H; i++) {
            for (let j = 0; j < Game.W; j++) {
                this.field[i][j].draw();
            }
        }
    }
}
