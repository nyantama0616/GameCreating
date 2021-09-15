// 半角なら１文字、全角なら２文字としてカウント
class Mylib {
    static charCount(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            // if (str.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
            if (str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) {
                count += 2
            } else {
                count += 1
            }
        }
        return count;
    }

    // 区切り文字を残してsplitする
    static split(str, char) {
        let result = [];
        let temp = "";
        for (let i = 0; i < str.length; i++) {
            temp += str[i];
            if (str[i] === char) {
                result.push(temp);
                temp = "";
            }
        }
        if (temp) result.push(temp);
        return result;
    }

    // s ~ tまでの整数をランダム生成
    static rand(s, t) {
        return s + Math.floor(Math.random() * t)
    }
}
