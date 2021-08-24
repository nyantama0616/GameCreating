class Mino {
    static NUM = 4;
    static SHAPES = [
        [[-1, 0], [0, -1], [0, 0], [1, 0]], //凸
        [[0, 0], [0, 1], [1, 1], [2, 1]], //「
        [[0, 0], [1, 0], [2, 0], [2, -1]],　// 「の反対
        [[0, 0], [1, 0], [1, 1], [0, 1]], //口
        [[0, -1], [0, 0], [0, 1], [0, 2]], //|
        [[-1, 0], [0, 0], [0, 1], [1, 1]], //乙
        [[-1, 0], [0, 0], [0, -1], [1, -1]], //乙の反対
    ];
    constructor(x, y, shape, isActive, color) {
        this.x = x;
        this.y = y;
        this.blocks = new Array(Mino.NUM);
        for (let i = 0; i < Mino.NUM; i++) {
            this.blocks[i] = [x + Mino.SHAPES[shape][i][0], y + Mino.SHAPES[shape][i][1]];
        }
        this.isActive = isActive;
    }

    static createMino(x, y, isActive) {
        let shape = Math.floor(Math.random() * Mino.SHAPES.length);
        let mino = new Mino(x, y, shape, isActive);
        return mino;
    }

    // 画面左の衝突判定
    judgeLeft(field) {
        return this.blocks.some(m => field[m[1]][m[0] - 1].getIsLocked());
    }
    
    // 画面右の衝突判定
    judgeRight(field) {
        return this.blocks.some(m => field[m[1]][m[0] + 1].getIsLocked());
    }
    
    // 画面下の衝突判定
    judgeBottom(field) {
        return this.blocks.some(m => field[m[1] + 1][m[0]].getIsLocked());
    }

    // 左に1マス移動
    moveLeft(field) {
        if (this.judgeLeft(field)) { return; }
        this.x -= 1;
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[0] -= 1;
        }
    }
    
    // 右に1マス移動
    moveRight(field) {
        if (this.judgeRight(field)) { return;}
        this.x += 1;
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[0] += 1;
        }
    }

    // 下に1マス移動
    moveDown(field) {
        if (this.judgeBottom(field)) {
            // this.isActive = false;
            return;
        }
        this.y += 1;
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(false);
            m[1] += 1;
        }
        
    }

    static myCopy(ary) {
        let result = new Array(Mino.NUM);
        for (let i = 0; i < Mino.NUM; i++) {
            result[i] = [ary[i][0], ary[i][1]];
        }
        return result;
    }

    // 左に90度回転
    rotateLeft(field) {
        let ary = Mino.myCopy(this.blocks);
        try {
            let overBottom = 0;
            for (let i = 0; i < Mino.NUM; i++) {
                let m = this.blocks[i];
                field[m[1]][m[0]].setLit(false);
                let x = m[0] - this.x;
                let y = m[1] - this.y;
                [x, y] = [-y, x];
                [m[0], m[1]] = [this.x + x, this.y + y];

                if (m[1] >= Game.h || field[m[1]][m[0]]) {
                    let temp = 0;
                    let d = m[1];
                    while (d >= Game.h || field[d][m[0]].getIsLocked()) {
                        d--;
                        temp++;
                    }
                    overBottom = max(overBottom, temp);
                }

            }

            for (let i = 0; i < Mino.NUM; i++) {
                this.y -= overBottom;
                this.blocks[i][1] -= overBottom;
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.blocks = ary;
            } else {
                console.error(e);
            }
        }
    }
    
    // 右に90度回転
    rotateRight(field) {
        let ary = Mino.myCopy(this.blocks);
        try {
            let overBottom = 0;
            for (let i = 0; i < Mino.NUM; i++) {
                let m = this.blocks[i];
                field[m[1]][m[0]].setLit(false);
                let x = m[0] - this.x;
                let y = m[1] - this.y;
                [x, y] = [y, -x];
                [m[0], m[1]] = [this.x + x, this.y + y];

                if (m[1] >= Game.h || field[m[1]][m[0]]) {
                    let temp = 0;
                    let d = m[1];
                    while (d >= Game.h || field[d][m[0]].getIsLocked()) {
                        d--;
                        temp++;
                    }
                    overBottom = max(overBottom, temp);
                }
            }

            for (let i = 0; i < Mino.NUM; i++) {
                this.y -= overBottom;
                this.blocks[i][1] -= overBottom;
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.blocks = ary;
            } else {
                console.error(e);
            }
                
        }
    }

    // ブロックを固定
    lock(field) {
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i];
            field[m[1]][m[0]].setLit(true);
            field[m[1]][m[0]].setIsLocked(true);
        }
        this.isActive = false;
    }
    
    draw(field) {
        if (!this.isActive) {
            return;
        }
        if (this.judgeBottom(field) && frameCount % 30 == 0) {
            this.lock(field);
            return;
        }
        
        // キーボード ["j", "k", "l"] でミノを操作
        if (keyIsPressed && frameCount % 6 == 0) {
            switch (key) {
                case "j":
                    this.moveLeft(field);
                    break
                    case "k":
                        this.moveDown(field);
                    break;
                case "l":
                    this.moveRight(field);
                    break
                case "a":
                    this.rotateLeft(field);
                    break;
                case "d":
                    this.rotateRight(field);
                    break;
            }
        }

        //1秒おきに下に移動
        if (frameCount % 30 === 0) {
            this.moveDown(field);
        }

        
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            field[m[1]][m[0]].setLit(true);
        }
    }
}
