class Pattern {
    static NUM = 7;

    static SHAPES = [
        [[-1, 0], [0, -1], [0, 0], [1, 0]], //凸
        [[0, 0], [0, 1], [1, 1], [2, 1]], //「
        [[0, 0], [1, 0], [2, 0], [2, -1]],　// 「の反対
        [[0, 0], [1, 0], [1, 1], [0, 1]], //口
        [[0, -1], [0, 0], [0, 1], [0, 2]], //|
        [[-1, 0], [0, 0], [0, 1], [1, 1]], //乙
        [[-1, 0], [0, 0], [0, -1], [1, -1]], //乙の反対
    ];

    static DESINGS = new Array(Pattern.NUM + 1);
    static setDesign() {
        for (let i = 0; i < Pattern.NUM + 1; i++) {
            Pattern.DESINGS[i] = loadImage(`assets/img/pattern${i}.png`);
        }
    }

}
