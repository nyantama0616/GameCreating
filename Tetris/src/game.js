class Game {
    static W = 15;
    static H = 32;
    static START_X = 6;
    static START_Y = 1;
    static DEFAULT_FALL_SPEED = 30;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.field = new Array(Game.H);
        this.fallSpeed = Game.DEFAULT_FALL_SPEED;
        this.top = Game.H - 1;
        this.score = 0;
        this.combo = 0;
        this.scoreElement = $("#score");
        this.comboElement = $("#combo");
        this.timerElement = $("#timer");
        this.timeLimit = 180; //タイムリミット３分
        this.variablesForGameOver = {
            isGameOver: false,
            red: 0
        };
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
        this.activeMino = Mino.createMino(Game.START_X, Game.START_Y, true, this); //色々あってコンストラクタの最後にミノ作成
        Object.seal(this);
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
            console.log("i - d <= 0", i, d);
            let line = this.field[i];
            for (let j = 1; j < Game.W - 1; j++) {
                line[j].setLit(false);
                line[j].setIsLocked(false);
            }
        };
    }

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
            this.reloadCombo();
            return;
        }
        for (let i = start; i >= this.top; i--) {
            this.shift(i, count);
        }
        this.top += count;
        this.combo++;
        this.score += this.combo * (Game.W - 2) * count * 100;
        this.reloadCombo();
        this.reloadScore();
        Background.BLOCK_DESTROY.play();
    }

    reloadScore() {
        this.scoreElement.text(this.score);
    }
    
    reloadCombo() {
        this.comboElement.text(this.combo);
    }
    
    reloadTimer() {
        this.timerElement.text(this.timeLimit);
    }

    gameOver() {
        textSize(50);
        fill(this.variablesForGameOver.red, 0, 0);
        this.variablesForGameOver.red++;
        text("Game Over", this.x + 26, this.y + 350);
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
        if (this.variablesForGameOver.isGameOver) {
            this.gameOver();
            return;
        }
        for (let i = 0; i < Game.H; i++) {
            for (let j = 0; j < Game.W; j++) {
                this.field[i][j].draw();
            }
        }
        // return;

        if (frameCount % 60 == 0) {
            this.reloadTimer();
            this.timeLimit--;
        }
        // タイムオーバー
        if (this.timeLimit < 0) {
            this.variablesForGameOver.isGameOver = true;
            Background.pause();
            Background.GAMEOVER.play();
            return;
        }

        // ここで不要になったactiveMinoの中身は開放されてるはず。。。
        if (!this.activeMino.isActive) {
            this.activeMino = Mino.createMino(Game.START_X, Game.START_Y, true, this);
            if (this.activeMino === null) {
                this.variablesForGameOver.isGameOver = true;
                Background.pause();
                Background.GAMEOVER.play();
                return;
            }
        }

        this.activeMino.draw(this);
    }

    // this.fieldを行列の形で表示
    showField() {
        for (let i = 0; i < Game.H; i++) {
            let temp = this.field[i].map((block) => {
                return Number(block.getLit());
            });
            console.log(temp.toString());
        }
    }
}
