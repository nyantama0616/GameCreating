class Game {
    static W = 15; //座標の横幅
    static H = 32; //座標の縦幅
    static START_X = 6; //ミノ生成時の座標X
    static START_Y = 1; //ミノ生成時の座標Y
    static DEFAULT_FALL_SPEED = 30; //ミノが落下するスピード
    
    constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.field = new Array(Game.H);
        this.fallSpeed = Game.DEFAULT_FALL_SPEED;
        this.top = Game.H - 1;
        this.score = 0;
        this.combo = 0;
        this.scoreX = x - 312;
        this.scoreY = y - 2;
        this.timerX = x + 456;
        this.timerY = y + 100;
        this.timeLimit = 180; //タイムリミット３分
        this.variablesForGameOver = {
            isGameOver: false,
            red: 0
        };

        // スコア用のテキスト設定
        this.p.textSize(35);
        this.p.textAlign(this.p.RIGHT);
        this.p.fill(255);

        for (let i = 0; i < Game.H; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < Game.W; j++) {
                let block = new Block(p, this.x + j * Block.L + 2 * j, this.y + i * Block.L + 2 * i, Pattern.NUM);
                if (i == Game.H - 1 || j == 0 || j == Game.W - 1) {
                    block.setLit(true);
                    block.setIsLocked(true);
                }
                this.field[i].push(block);
            }
        }
        this.activeMino = Mino.createMino(p, Game.START_X, Game.START_Y, true, this); //色々あってコンストラクタの最後にミノ作成

        // ミノ操作時意図しないスクロール禁止
        addEventListener("keydown", (e) => {
            e.preventDefault();
        });
    }

    getBlock(i, j) {
        return this.field[i][j];
    }

    // i行目のブロックを全てd個ずらす
    shift(i, d) {
        if (i - d > 0) {
            let line1 = this.field[i - d];
            let line2 = this.field[i];
            for (let j = 1; j < Game.W - 1; j++) {
                line2[j].clone(line1[j]);
            }
        } else {
            let line = this.field[i];
            for (let j = 1; j < Game.W - 1; j++) {
                line[j].setLit(false);
                line[j].setIsLocked(false);
            }
        };
    }

    // ブロック破壊
    breakOut() {
        let i;
        for (i = Game.H - 2; i >= this.top; i--) {
            if (this.field[i].every(block => block.getLit())) {
                i;
                break;
            }
        }
        let start = i;
        for (i = start; i >= this.top; i--) {
            if (this.field[i].some(block => !block.getLit())) {
                break;
            }
        }
        
        let count = start - i;
        if (count == 0) {
            this.combo = 0;
            this.updateCombo();
            return;
        }
        for (let i = start; i >= this.top; i--) {
            this.shift(i, count);
        }
        this.top += count;
        this.combo++;
        this.score += this.combo * (Game.W - 2) * count * 100;
        this.updateScore();
        this.updateCombo();
        Background.BLOCK_DESTROY.play();
    }
    
    updateScore() { }; //マルチ用
    updateCombo() { }; //マルチ用
    
    // 画面上の制限時間を更新
    updateTimer() {
        if (this.p.frameCount % 60 === 0) {
            this.timeLimit--;
        }
    }

    showScoreBoad() {
        this.p.image(Pattern.scoreBoad, this.scoreX, this.scoreY);
        this.p.text(this.score, this.scoreX + 300, this.scoreY + 50);
        this.p.text(this.combo, this.scoreX + 300, this.scoreY + 118);
    }

    showTimer() {
        this.p.push();
        this.p.textSize(60);
        this.p.fill(this.p.color(61, 61, 243));
        this.p.text(this.timeLimit, this.timerX, this.timerY);
        this.p.pop();
    }

    setGameOver() {
        this.variablesForGameOver.isGameOver = true;
        Background.pause();
        Background.GAMEOVER.play();
    }

    //ゲームオーバー画面を表示
    gameOver() {
        this.p.push();
        this.p.textSize(50);
        this.p.textAlign(this.p.LEFT);
        this.p.fill(this.variablesForGameOver.red, 0, 0);
        this.variablesForGameOver.red++;
        this.p.text("Game Over", this.x + 26, this.y + 350);
        this.p.pop();
        for (let i = 0; i < Game.H; i++) {
            this.field[i][0].draw();
        }
        
        for (let i = 0; i < Game.H; i++) {
            this.field[i][Game.W - 1].draw();
        }
        
        for (let i = 1; i < Game.W - 1; i++) {
            this.field[Game.H - 1][i].draw();
        }
    }


    draw() {
        this.showScoreBoad();
        this.showTimer();

        if (this.variablesForGameOver.isGameOver) {
            this.gameOver();
            return;
        }
       
        // ここでブロック表示
        for (let i = 0; i < Game.H; i++) {
            for (let j = 0; j < Game.W; j++) {
                this.field[i][j].draw();
            }
        }

        this.updateTimer();

        // タイムオーバー
        if (this.timeLimit <= 0) {
            this.setGameOver();
            return;
        }

        // ここで不要になったactiveMinoの中身は開放されてるはず。。。
        if (!this.activeMino.isActive) {
            this.activeMino = Mino.createMino(this.p, Game.START_X, Game.START_Y, true, this);
            if (this.activeMino === null) {
                this.setGameOver();
                return;
            }
        }

        this.activeMino.draw(this);
    }
}
