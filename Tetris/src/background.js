class Background {
    static BGM_NUM = 4;
    static INTERVAL_OF_BGM = 11400; //約3分10秒
    static loadBGMS() {
        Background.BGMS = new Array(Background.BGM_NUM);
        for (let i = 0; i < Background.BGM_NUM; i++) {
            Background.BGMS[i] = loadSound(`assets/sound/bgm${i}.mp3`);
        }
        Background.BLOCK_DESTROY = loadSound("assets/sound/block_destroy.mp3");
    }
    
    constructor() {
        this.indexOfBGM = 3;
        this.playingCount = 10**9;
        myShuffle(Background.BGMS);
    }

    loopBGM() {
        if (this.playingCount > Background.INTERVAL_OF_BGM && keyIsPressed) {
            // Background.BGMS[this.indexOfBGM].pause();pauseいらない？
            this.indexOfBGM = (this.indexOfBGM + 1) % Background.BGM_NUM;
            this.playingCount = 0;
            Background.BGMS[this.indexOfBGM].play();
        } else {
            this.playingCount++;
        }
    }
}
