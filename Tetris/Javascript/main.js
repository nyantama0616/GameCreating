"use strict"

let player;
function setup() {
    let screen = createCanvas(1280, 800);
    screen.parent("screen");
    player = new Player();
}

function draw() {
    background(0);
    player.draw();
}
