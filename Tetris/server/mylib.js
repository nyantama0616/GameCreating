class Mylib {
    // s ~ tまでの整数をランダム生成
    static rand(s, t) {
        return s + Math.floor(Math.random() * t)
    }
    
    static generateID(usedID) {
        let result;
        {
            result = Mylib.rand(0, Number.MAX_SAFE_INTEGER);
        } while (usedID[result]);
        usedID[result] = true;
        return result;
    }
}

module.exports = Mylib;
