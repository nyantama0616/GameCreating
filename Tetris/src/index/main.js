let btn = document.getElementsByClassName("btn");

setTimeout(() => {
    btn[0].classList.add("apear");
}, 2000);

setTimeout(() => {
    btn[1].classList.add("apear");
}, 2200);

const sketch = (p) => {
    let title;
    let minos;

    p.preload = () => {
        Background.loadBGMS(p); //BGM用の音楽読み込み
        Pattern.setDesign(p); //ブロック用の画像読み込み
    }

    p.setup = () => {
        p.createCanvas(1240, 680);
        title = new Title(p, 10, 10);
        minos = new Minos(p);
        p.angleMode(p.DEGREES);
        setTimeout(() => {
            let cnt = 0;
            let id = setInterval(() => {
                minos.add();
                if (++cnt > 35) clearInterval(id);
            }, 100);
        }, 1700);
    }

    p.draw = () => {
        p.background(0);
        minos.draw();
        title.draw();
    }
}

const title = new p5(sketch, "screen");
