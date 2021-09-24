let socket = require("socket.io"),
    UserManager = require("./UserManager"),
    GameManager = require("./GameManager");


class Socket {
    static run(app) {
        let io = socket(app);
        
        UserManager.run(io);
        GameManager.run(io);

        io.sockets.on("connection", socket => {
            socket.on("addCommentRequest", data => {
                io.to(data.user.keyWord).emit("addCommentResponse", data);
            });

            socket.on("joinUserToRoomRequest", keyWord => {
                socket.join(keyWord);
            });
        });
    }
}

module.exports = Socket;
