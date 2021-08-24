class Block {
    static l = 20;

    constructor(x, y, color = 255) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.lit = false;
        this.isLocked = false;
        Object.seal(this);
    }

    getLit() {
        return this.lit;
    }
    
    setLit(lit) {
        this.lit = lit;
    }

    getIsLocked() {
        return this.isLocked;
    }
    
    setIsLocked(isLocked) {
        this.isLocked = isLocked;
    }

    draw() {
        if (!this.lit) { return; }
        fill(this.color);
        noStroke();
        rect(this.x, this.y, Block.l, Block.l);
    }
}
