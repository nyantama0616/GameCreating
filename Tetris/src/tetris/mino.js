class Mino {
    static NUM = 4;
    
    constructor(p, x, y, pattern, isActive) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.pattern = pattern; //デザイン
        this.blocks = new Array(Mino.NUM); //ミノはブロックの塊である
        for (let i = 0; i < Mino.NUM; i++) {
            this.blocks[i] = [x + Pattern.SHAPES[pattern][i][0], y + Pattern.SHAPES[pattern][i][1]];
        }
        this.isActive = isActive; //現在操作中のミノ
    }

    // ランダムな種類のミノを一つ生成
    static createMino(p, x, y, isActive, game) {
        let pattern = Math.floor(Math.random() * Pattern.NUM);
        let mino = new Mino(p, x, y, pattern, isActive);
        if (mino.blocks.some(m => game.getBlock(m[1], m[0]).getIsLocked())) {
            mino = null;
        }
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

    /* 
    回転時のバグ対策用に、
    ２次元配列をコピーする関数を簡易的に作った。
    */
    static myCopy(ary) {
        let result = new Array(Mino.NUM);
        for (let i = 0; i < Mino.NUM; i++) {
            result[i] = [ary[i][0], ary[i][1]];
        }
        return result;
    }

    /*
        回転には行列の考え方を利用した。
        コードは長くなったが、
        要は回転後にミノが他のブロックとぶつかったりする場合、
        回転をなかったことにする。(データベースのトランザクション的な)
    */
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
                    overBottom = this.p.max(overBottom, temp);
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
                    overBottom = this.p.max(overBottom, temp);
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

    // 着地したブロックを固定
    lock(game) {
        let field = game.field;
        let top = 10 ** 9;;
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i];
            field[m[1]][m[0]].setLit(true);
            field[m[1]][m[0]].setIsLocked(true);
            top = this.p.min(top, m[1]);
        }
        this.isActive = false;
        game.top = this.p.min(game.top, top);
    }
    
    draw(game) {
        let field = game.field;
        if (!this.isActive) {
            return;
        }
        if (this.judgeBottom(field) && this.p.frameCount % 30 == 0) {
            this.lock(game);
            game.breakOut();
            return;
        }
        
        // キーボード ["j", "k", "l", "a", "d"] でミノを操作
        if (this.p.keyIsPressed && this.p.frameCount % 6 == 0) {
            switch (this.p.key) {
                case "j": //左に1マス移動
                    this.moveLeft(field);
                    break
                    case "k": //下に2マス移動
                        this.moveDown(field);
                        this.moveDown(field);
                        this.moveDown(field);
                    break;
                case "l": //右に1マス移動
                    this.moveRight(field);
                    break
                case "a": //左に90度回転
                    this.rotateLeft(field);
                    break;
                case "d": //右に90度回転
                    this.rotateRight(field);
                    break;
            }
        }

        //game.fallSpeedミリ秒おきに下に移動
        if (this.p.frameCount % game.fallSpeed === 0) {
            this.moveDown(field);
        }

        // ここでミノを表示
        for (let i = 0; i < Mino.NUM; i++) {
            let m = this.blocks[i]
            let block = field[m[1]][m[0]]
            block.setDesign(this.pattern);
            block.setLit(true);
        }
    }
}
