// ユーザー登録していなければ、チャットにリダイレクト
if (!Manager.user) {
    location.href = "chat";
}

// ソケット関連
Manager.socket.emit("joinUserToGameRequest", Manager.user.keyWord);
Manager.socket.on("joinUserToGameResponse", message => {
    switch (message) {
        case "wait":
            console.log("対戦相手を待っています。。。");
            // document.getElementById("waiting").classList.remove("hidden");
            break;
        case "overCapacity":
            alert("店員オーバー");
            setTimeout(() => {
                location.href = "chat";
            }, 2000);
            break;
        case "disavailable":
                alert("対戦は終了しました。");
                setTimeout(() => {
                    location.href = "chat";
                }, 2000);
    }
});

Manager.socket.on("start", () => {
    Manager.gameStart = true;
    
    //loading内のsetIntervalをクリア
    Manager.loadingID1 && clearInterval(Manager.loadingID1); 
    Manager.loadingID2 && clearInterval(Manager.loadingID2);
});

onunload = () => {
    Manager.socket.disconnect();
};
//

// main関数的な
const sketch = (p) => {
    let game;
    let opponent;
    let loading;

    p.preload = () => {
        Background.loadBGMS(p); //BGM用の音楽読み込み
        Pattern.setDesign(p); //ブロック用の画像読み込み
    }

    p.setup = () => {
        let w = 1450;
        let h = 800;
        let screen = p.createCanvas(w, h);
        Background.set();
        screen.position(p.displayWidth/2 - w/2, p.displayHeight/2 - (h/2 + 50));
        // screen.position(p.displayWidth / 2 - 725, p.displayHeight / 2 - 450);
        screen.style("z-index: -1;")
        game = new GameMulti(p, 320, 50);
        opponent = new Opponent(p, 795, 50); w/2
        loading = new Loading(p, w/2 - 46, h/2 - 46);
    }

    p.draw = () => {
        p.background(0);
        loading.draw();
        if (!Manager.gameStart) return;
        Background.loopBGM(p);
        game.draw();
        opponent.draw();
        // Mylib.showMemory(p, 180);
    }
}

const multi = new p5(sketch, "#screen");
