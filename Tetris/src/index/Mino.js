class _Block extends Block {
    constructor(p, x, y, pattern, lit) {
        super(p, x, y, pattern, lit);

    }
    draw(x, y) {
        this.p.image(Pattern.DESINGS[this.design], x, y, Block.L, Block.L);
    }
}

class Mino {
    constructor(p, x, y, dx, dy, da, pattern) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.a = 0;
        this.dx = dx;
        this.dy = dy;
        this.da = da;
        this.shape = Pattern.SHAPES[pattern];
        this.blocks = new Array(4);
        for (let i = 0; i < 4; i++) {
            let [bx, by] = this.shape[i];
            this.blocks[i] = new _Block(p, x + (Block.L + 2) * bx, y + (Block.L + 2) * by, pattern, true);
        }
    }
    
    draw() {
        if (this.x < 0 || this.p.width < this.x) this.dx *= -1;
        if (this.y < 0 || this.p.height < this.y) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        this.a += this.da;
        
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.rotate(this.a);
        for (let i = 0; i < 4; i++) {
            let [bx, by] = this.shape[i];
            this.blocks[i].draw((Block.L + 2) * bx, (Block.L + 2) * by);
        }
        this.p.pop();
    }
}
