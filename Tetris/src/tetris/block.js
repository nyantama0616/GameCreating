class Block {
    static L = 20;

    constructor(p, x, y, pattern = 0, lit = false) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.design = pattern; //ブロックを装飾する画像
        this.lit = lit; //ブロックを表示させるかどうか
        this.isLocked = false; //ブロックが固定されるかどうか(アクティブなミノ以外のブロックは全て固定されている。)
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

    // 編集用
    editMode() {
        if (this.p.isKeyPressed && this.p.key === "z") {
            this.x = this.p.mouseX;
            this.y = this.p.mouseY;
            console.log(`${this.x}, ${this.y}`);
        }
    }

    draw() {
        if (!this.lit) { return; }
        this.p.image(Pattern.DESINGS[this.design], this.x, this.y, Block.L, Block.L);
    }
}
