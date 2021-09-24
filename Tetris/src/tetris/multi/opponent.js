class Opponent {
    constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;

        this.score = 0;
        this.combo = 0;
        this.scoreX = x + 329;
        this.scoreY = y - 2;

        this.variablesForGameOver = {
            isGameOver: false,
            red: 0
        };

        this.field = new Array(Game.H);
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

        // スコア更新
        Manager.socket.on("updateScoreResponse", score => {
            this.score = score;
        });
        
        // コンボ更新
        Manager.socket.on("updateComboResponse", combo => {
            this.combo = combo;
        });

        // field更新
        Manager.socket.on("sendFieldResponse", field => {
            for (let i = 0; i < Game.H; i++) {
                for (let j = 0; j < Game.W; j++) {
                    let block = this.field[i][j];
                    let params = field[i][j];
                    block.setLit(params[0]);
                    block.setDesign(params[1]);
                }
            }
        });
        
        Manager.socket.on("gameOverResponse", () => {
            this.variablesForGameOver.isGameOver = true;
        });
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

    showScoreBoad() {
        this.p.image(Pattern.scoreBoad, this.scoreX, this.scoreY);
        this.p.textSize(35);
        this.p.fill(255);
        this.p.text(this.score, this.scoreX + 300, this.scoreY + 50);
        this.p.text(this.combo, this.scoreX + 300, this.scoreY + 118);
    }

    draw() {
        this.showScoreBoad();

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
    }
}
