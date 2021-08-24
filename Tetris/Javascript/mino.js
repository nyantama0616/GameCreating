class Mino {
    static NUM = 4;
    constructor(isActive, color) {
        this.blocks = new Array(Mino.NUM);
        this.isActive = isActive;
    }

    static createMino(x, y, isActive, color) {
        let mino = new Mino1(x, y, isActive);
        return mino;
    }

    judgeLeft(field) {
        return this.blocks.some(m => field[m[1]][m[0] - 1].getIsLocked());
    }
    
    judgeRight(field) {
        return this.blocks.some(m => field[m[1]][m[0] + 1].getIsLocked());
    }

    judgeBottom(field) {
        return this.blocks.some(m => field[m[1] + 1][m[0]].getIsLocked());
    }

    moveLeft(field) {
        if (this.judgeLeft(field)) { return;}
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[0] -= 1;
        }
    }
    
    moveRight(field) {
        if (this.judgeRight(field)) { return;}
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[0] += 1;
        }
    }

    moveDown(field) {
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[1] += 1;
        }
        
        if (this.judgeBottom(field)) {
            this.lock(field);
        }
    }

    rotateLeft(field) {
        let [x, y] = this.blocks[1];
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i];
            field[m[1]][m[0]].setLit(false);
            console.log(m);
            [m[0], m[1]] = [-m[1] + x, m[0] + y];
            console.log(m);
        }
    }

    lock(field) {
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i];
            field[m[1]][m[0]].setLit(true);
            field[m[1]][m[0]].setIsLocked(true);
        }
        this.isActive = false;
    }
    
    draw(field) {
        if (!this.isActive) { return; }
        if (this.judgeBottom(field)) {
            this.lock(field);
        }
        
        // キーボード ["j", "k", "l"] でミノを操作
        if (keyIsPressed && frameCount % 3 == 0) {
            switch (key) {
                case "j":
                    this.moveLeft(field);
                    break
                    case "k":
                        this.moveDown(field);
                        if (!this.isActive) { return;}
                    break;
                case "l":
                    this.moveRight(field);
                    break
                case "a":
                    this.rotateLeft(field);
                    break;
            }
        }

        //1秒おきに下に移動
        if (frameCount % 10 === 0) {
            this.moveDown(field);
        }

        
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(true);
        }
    }
}


class Mino1 extends Mino {
    constructor(x, y, isActive, color) {
        super(isActive, color);
        this.blocks[0] = [x, y];
        this.blocks[1] = [x + 1, y - 1];
        this.blocks[2] = [x + 1, y];
        this.blocks[3] = [x + 2, y];
    }
}
