class Player {
    constructor(x, y) {
        this.game = new Game(x, y);
        Object.seal(this);
    }

    draw() {
        this.game.draw();
    }
}
