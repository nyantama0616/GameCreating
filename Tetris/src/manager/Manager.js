let io = require("socket.io-client");

class Manager {
    static socket = io("localhost:5000");
    static user = null;
    // static socket = io("https://tetris-panda.herokuapp.com/");

    static init(filename) {
        Manager.createUser();
    }

    static joinUserToRoom() {
        if (Manager.user) {
            Manager.socket.emit("joinUserToRoomRequest", Manager.user.keyWord);
        }
    }

    static getUser() {
        return Manager.user;
    }

    static createUser(user) {
        if (!user) {
            let user = JSON.parse(sessionStorage.getItem("user"));
            if (user) {
                Manager.user = user;
                Manager.joinUserToRoom();
                return true;
            } else {
                return false;
            }
        } else {
            sessionStorage.setItem("user", JSON.stringify(user));
            Manager.user = user;
            Manager.joinUserToRoom();
            return true
        }
    }
}

module.exports = Manager;
