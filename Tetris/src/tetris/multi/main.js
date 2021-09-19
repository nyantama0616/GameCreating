"use strict"

let p5 = require("p5");

let sketch = (s) => {

    let player;
    let opponent;
    s.preload = () => {
        Background.loadBGMS(); //BGM用の音楽読み込み
        Pattern.setDesign(); //ブロック用の画像読み込み
    }

    s.setup = () => {
        let screen = createCanvas(1280, 800);
        Background.set();
        screen.parent("screen");
        screen.position(displayWidth / 2 - 640, displayHeight / 2 - 450);
        player = new Player(220, 50);
        opponent = new Opponent(750, 50);
    }

    s.draw = () => {
        background(50);
        Background.loopBGM();
        player.draw();
        opponent.draw();
        // MyFunctions.showMemory(180);
    }
}

let multi = new p5(sketch);

// let player;
// let opponent;

// function preload() {
//     Background.loadBGMS(); //BGM用の音楽読み込み
//     Pattern.setDesign(); //ブロック用の画像読み込み
// }

// function setup() {
//     let screen = createCanvas(1280, 800);
//     Background.set();
//     screen.parent("screen");
//     screen.position(displayWidth / 2 - 640, displayHeight / 2 - 450);
//     player = new Player(220, 50);
//     opponent = new Opponent(750, 50);
// }


// function draw() {
//     background(50);
//     Background.loopBGM();
//     player.draw();
//     opponent.draw();
//     // MyFunctions.showMemory(180);
// }
