class Loading {
    constructor(p, x, y) {
        // let block = new Block(p, this.x + j * Block.L + 2 * j, this.y + i * Block.L + 2 * i, Pattern.NUM);
        this.p = p;
        this.x = x;
        this.y = y;
        this.pos = 0;
        this.field = new Array(12);
        for (let i = 0; i < 3; i++) {
            this.field[i] = new Block(p, x + i * Block.L + 2 * i, y, Pattern.NUM);
        }
        
        for (let i = 0; i < 3; i++) {
            this.field[i + 3] = new Block(p, x + 3 * Block.L + 2 * 3, y + i * Block.L + 2 * i, Pattern.NUM);
        }
        
        let x_ = x + 3 * Block.L + 2 * 3;
        for (let i = 0; i < 3; i++) {
            this.field[i + 6] = new Block(p, x_ - (i * Block.L + 2 * i), y + 3 * Block.L + 2 * 3, Pattern.NUM);
        }
        
        let y_ = y + 3 * Block.L + 2 * 3;
        for (let i = 0; i < 3; i++) {
            this.field[i + 9] = new Block(p, x, y_ - (i * Block.L + 2 * i), Pattern.NUM);
        }

        for (let i = 0; i < 4; i++) {
            this.field[i].setLit(true);
        }

        Manager.loadingID1 = setInterval(() => {
            this.field[this.pos % 12].setLit(false);
            this.field[(this.pos + 4) % 12].setLit(true);
            this.pos++;
        }, 200);
        
        Manager.loadingID2 = setInterval(() => {
            let design = Mylib.rand(0, Pattern.NUM + 1)
            for (let i = 0; i < 12; i++) {
                this.field[i].setDesign(design);
            }
        }, 1000);

    };

    draw() {
        if (Manager.gameStart) return;

        this.p.push();

        //メッセージ
        this.p.fill(this.p.color(50, 68, 226));
        this.p.textAlign(this.p.CENTER);
        this.p.text("対戦相手を待っています。。。", this.x + 70, this.y - 60);

        for (let i = 0; i < 12; i++) {
            this.field[i].draw();
        }
        this.p.pop();
    }
}
