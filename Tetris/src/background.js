class Background {
    static BGM_NUM = 4;
    static INTERVAL_OF_BGM = 11400; //約3分10秒
    static loadBGMS() {
        Background.BGMS = new Array(Background.BGM_NUM);
        for (let i = 0; i < Background.BGM_NUM; i++) {
            Background.BGMS[i] = loadSound(`assets/sound/bgm${i}.mp3`);
        }
        Background.BLOCK_DESTROY = loadSound("assets/sound/block_destroy.mp3");
        Background.GAMEOVER = loadSound("assets/sound/game_over.mp3");
    }
    
    static set() {
        Background.indexOfBGM = 3;
        Background.playingCount = 10**9;
        myShuffle(Background.BGMS);
    }

    static pause() {
        Background.BGMS[Background.indexOfBGM].pause();
        Background.playingCount = 0;
    }

    static loopBGM() {
        if (Background.playingCount > Background.INTERVAL_OF_BGM && keyIsPressed) {
            Background.indexOfBGM = (Background.indexOfBGM + 1) % Background.BGM_NUM;
            Background.playingCount = 0;
            Background.BGMS[Background.indexOfBGM].play();
        } else {
            Background.playingCount++;
        }
    }
}
