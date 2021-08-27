class Block {
    static L = 20;

    constructor(x, y, pattern = 0) {
        this.x = x;
        this.y = y;
        this.design = Pattern.DESINGS[pattern]; //ブロックを装飾する画像
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

    getDesign() {
        return this.design;
    }

    setDesign(design) {
        this.design = design;
    }

    clone(block) {
        this.design = block.design;
        this.lit = block.lit;
        this.isLocked = block.isLocked;
    }

    draw() {
        if (!this.lit) { return; }
        image(this.design, this.x, this.y, Block.L, Block.L);
    }
}
