class Mylib {
    // メモリ使用率表示
    static showMemory(p, permiliseconds) {
        if (p.frameCount % permiliseconds !== 0) { return; }
        let memory = performance.memory;
        console.log(memory);
        let x = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        console.log(`メモリ使用率: ${x * 100} %`);
        console.log(`----稼働時間: ${frameCount / 60}秒----`)
    }
    
    // 配列をシャッフル
    static shuffle(ary) {
        let len = ary.length;
        for (let i = len - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * i);
            [ary[i], ary[j]] = [ary[j], ary[i]];
        }
    }

    // s ~ tまでの整数をランダム生成
    static rand(s, t) {
        return s + Math.floor(Math.random() * t)
    }

    static removeExtname(filename) {
        let result = "";
        for (let i = 0; i < filename.length; i++) {
            if (filename[i] === ".") break;
            result += filename[i];
        }
        return result;
    }
}
