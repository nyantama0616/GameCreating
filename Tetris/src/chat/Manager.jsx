import { io } from "socket.io-client";

class Manager {
    static socket = io("localhost:5000");
    // static socket = io("https://tetris-panda.herokuapp.com/");

    static getCookie() {
        if (!Manager.cookie) {
            let data = document.cookie.split(";");
            let cookie = {};
            for (let keyValue of data) {
                let [key, value] = keyValue.trim().split("=");
                cookie[key] = value;
            }
            Manager.cookie = cookie;
        }
        return Manager.cookie
    }
}
