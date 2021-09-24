"use strict"

const sketch = (p) => {
    let game;

    p.preload = () => {
        Background.loadBGMS(p); //BGM用の音楽読み込み
        Pattern.setDesign(p); //ブロック用の画像読み込み
    }

    p.setup = () => {
        let screen = p.createCanvas(1280, 800);
        Background.set();
        screen.position(p.displayWidth / 2 - 640, p.displayHeight / 2 - 450);
        screen.style("z-index: -1;")
        game = new Game(p, 490, 50);
    }

    p.draw = () => {
        p.background(0);
        Background.loopBGM(p);
        game.draw();
        // MyFunctions.showMemory(180);
    }
}

const solo = new p5(sketch, "#screen");
