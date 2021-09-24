class GameMulti extends Game {
    constructor(p, x, y) {
        super(p, x, y);

        Manager.socket.on("updateTimer", timeLimit => {
            this.timeLimit = timeLimit;
        });
        
        Manager.socket.on("opponentDisconnected", () => {
            alert("対戦相手の接続が切れました。あなたの勝ちです。");
            alert("チャットルームに戻ります。");
            setTimeout(() => {
                location.href = "chat";
            }, 5000);
        });
    }

    // lit と designのみ抜き出したfieldを返す
    getSimpleField() {
        let field = new Array(Game.H);
        for (let i = 0; i < Game.H; i++) {
            field[i] = [];
            for (let j = 0; j < Game.W; j++) {
                let block = this.field[i][j];
                field[i].push([block.getLit(), block.getDesign()]);
            }
        }
        return field;
    }

    updateScore() {
        Manager.socket.emit("updateScoreRequest", {
            score: this.score,
            keyWord: Manager.user.keyWord
        });
    }

    // 画面上のコンボを更新
    updateCombo() {
        Manager.socket.emit("updateComboRequest", {
            combo: this.combo,
            keyWord: Manager.user.keyWord
        });
    }

    updateTimer() { } //空
    
    setGameOver() {
        super.setGameOver();
        Manager.socket.emit("gameOverRequest", Manager.user.keyWord);
    }

    sendField() {
        Manager.socket.emit("sendFieldRequest", {
            field: this.getSimpleField(),
            keyWord: Manager.user.keyWord
        });
    }

    draw() {
        super.draw();
        this.sendField();
    }
}
