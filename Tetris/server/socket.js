let socket = require("socket.io"),
    UserManager = require("./userManager");

class Socket {
    static run(app) {
        let io = socket(app);
        
        UserManager.run(io);

        io.sockets.on("connection", socket => {
            socket.on("addCommentRequest", data => {
                io.sockets.emit("addCommentResponse", data);
            });

        });
    }
}

module.exports = Socket;
