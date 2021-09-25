class Minos {
    constructor(p) {
        this.p = p;
        this.minos = [];
    }
    
    add() {
        let x = Mylib.rand(100, this.p.width - 100);
        let y = Mylib.rand(100, this.p.height - 100);
        let dx = Mylib.rand(1, 7) * Mylib.plusMinus();
        let dy = Mylib.rand(1, 7) * Mylib.plusMinus();
        let da = Mylib.rand(1, 7) * Mylib.plusMinus();
        let pattern = Mylib.rand(0, Pattern.NUM);
        this.minos.push(new Mino(this.p, x, y, dx, dy, da, pattern));
    }

    draw() {
        for (let i = 0; i < this.minos.length; i++) {
            this.minos[i].draw();
        }
    }
}
