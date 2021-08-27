"use strict"

// メモリ使用率表示
function showMemory(permiliseconds) {
    if (frameCount % permiliseconds !== 0) { return;}
    let memory = performance.memory;
    console.log(memory);
    let x = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    console.log(`メモリ使用率: ${x * 100} %`);
    console.log(`----稼働時間: ${frameCount / 60}秒----`)
}

function myShuffle(ary) {
    let len = ary.length;
    for (let i = len - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * i);
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }
}

let player;
let bg;

function preload() {
    Background.loadBGMS();
    Pattern.setDesign(); //ブロック用の画像読み込み
}

function setup() {
    let screen = createCanvas(1280, 800);
    screen.parent("screen");
    bg = new Background();

    player = new Player(490, 50);

}

function draw() {
    background(0);
    bg.loopBGM();
    // showMemory(180);
    player.draw();
    // if (frameCount % 120 == 0) {
    //     console.log(Background.BLOCK_DESTROY);
    // }
}
