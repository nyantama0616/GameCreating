let io = require("socket.io-client");

class Manager {
    static socket = io("localhost:5000");
}
