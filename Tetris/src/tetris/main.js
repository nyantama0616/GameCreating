"use strict"

let player;

window.addEventListener("click", () => {
    console.log(document.cookie);
});

function preload() {
    // Background.loadBGMS(); //BGM用の音楽読み込み
    Pattern.setDesign(); //ブロック用の画像読み込み
}

function setup() {
    let screen = createCanvas(1280, 800);
    // Background.set();
    screen.parent("screen");
    player = new Player(490, 50);
}

function draw() {
    background(0);
    // Background.loopBGM();
    player.draw();
    // MyFunctions.showMemory(180);
}
