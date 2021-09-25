class Title {
    constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;
        
        let title = new Array(69);

        // テ
        [x, y] = [88, 114];
        for (let i = 0; i < 8; i++) {
            title[i] = new Block(p, x + (Block.L + 2) * i, y, 7);
        }
        [x, y] = [66, 180]
        for (let i = 0; i < 10; i++) {
           title[i + 8] = new Block(p, x + (Block.L + 2) * i, y, 7);
        };
        title[18] = new Block(p, 176, 202, 7);
        title[19] = new Block(p, 176, 224, 7);
        title[20] = new Block(p, 176, 246, 7);
        title[21] = new Block(p, 154, 268, 7);
        title[22] = new Block(p, 128, 280.5, 7);
        
        // ト
        [x, y] = [436, 114];
        for (let i = 0; i < 9; i++) {
            title[i + 23] = new Block(p, x, y + (Block.L + 2) * i, 7);
        }
        title[32] = new Block(p, 458, 202, 7);
        title[33] = new Block(p, 480, 213, 7);
        title[34] = new Block(p, 502, 224, 7);
        title[35] = new Block(p, 502, 224, 7);
        
        // リ
        [x, y] = [694, 114];
        for (let i = 0; i < 4; i++) {
            title[i + 36] = new Block(p, x, y + (Block.L + 2) * i, 7);
        }
        [x, y] = [772, 114];
        for (let i = 0; i < 6; i++) {
            title[i + 40] = new Block(p, x, y + (Block.L + 2) * i, 7);
        }
        title[46] = new Block(p, 760, 249.5, 7);
        title[47] = new Block(p, 741, 273.5, 7);
        title[48] = new Block(p, 716, 292.5, 7);
        
        // ス
        [x, y] = [1008, 114];
        for (let i = 0; i < 7; i++) {
            title[i + 49] = new Block(p, x + (Block.L + 2) * i, y, 7);
        }        
        title[56] = new Block(p, 1131, 137.5, 7);
        title[57] = new Block(p, 1119, 159.5, 7);
        title[58] = new Block(p, 1108, 184.5, 7);
        title[59] = new Block(p, 1091, 208.5, 7);
        title[60] = new Block(p, 1071, 233.5, 7);
        title[61] = new Block(p, 1047, 250.5, 7);
        title[62] = new Block(p, 1024, 268.5, 7);
        title[63] = new Block(p, 999, 278.5, 7);
        title[64] = new Block(p, 977, 285.5, 7);
        title[65] = new Block(p, 1114, 214.5, 7);
        title[66] = new Block(p, 1135, 230.5, 7);
        title[67] = new Block(p, 1155, 251.5, 7);
        title[68] = new Block(p, 1162, 277.5, 7);
        title[69] = new Block(p, 1170, 302.5, 7);
        
        this.title = title;

        let pos = 0;
        let intervalID = setInterval(() => {
            if (pos > 69) {
                clearInterval(intervalID);
                return;
            }
            this.title[pos++].setLit(true);
            if (pos % 4 === 0)
            Background.BLOCK_DESTROY.play();
        }, 25);
    }

    draw() {
        for (let i = 0; i < 69; i++) {
            this.title[i].draw();
        }
    }
}
