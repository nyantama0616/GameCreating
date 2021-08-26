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

let player;
let player2;
let mino;
// let player2;
function setup() {
    let screen = createCanvas(1280, 800);
    screen.parent("screen");
    Pattern.setDesign();
    player = new Player(490, 50);
    // player2 = new Player(790, 50);
    // mino = new Mino(6, 1, 0, true);

}

function draw() {
    background(0);
    // showMemory(180);
    player.draw();
    // player2.draw();
    // mino.draw(player.game);
}
