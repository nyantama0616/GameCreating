let getPagename = require("./mylib").getPagename;

class Game {
    constructor(keyWord) {
        this.keyWord = keyWord;
        this.timeLimit = 180; //ここで制限時間変えれる
        this.available = true;
        this.isGameOver = false;
    }

    getUserCount(socket) {
        return socket.adapter.rooms.get(this.keyWord).size;
    }

    start(io) {
        io.sockets.to(this.keyWord).emit("start");
        this.setTimerID = setInterval(() => {
            io.sockets.to(this.keyWord).emit("updateTimer", --this.timeLimit);
            if (this.timeLimit <= 0) {
                clearInterval(this.setTimerID);
            }
        }, 1000);
    }

    setGameOver(socket) {
        socket.broadcast.to(this.keyWord).emit("gameOverResponse");
        this.isGameOver = true;
        this.available = false;
    }

    handleJoin(io, socket) {
        if (!this.available) {
            socket.emit("joinUserToGameResponse", "disavailable");
            return;
        }

        if (this.getUserCount(socket) === 2) {
            this.start(io);
        } else {
            socket.emit("joinUserToGameResponse", "overCapacity");
        }
    }

    handleDisconnect(socket) {
        switch (this.getUserCount(socket)) {
            case 1:
                clearInterval(this.setTimerID);
                delete GameManager.games[this.keyWord];
                break;
            case 2:
                if (this.isGameOver) return;
                socket.broadcast.to(this.keyWord).emit("opponentDisconnected");
                this.setGameOver(socket);
                this.available = false;
                break;
        }   
    }
}

class GameManager {
    static games = {};
    static run(io) {
        // setInterval(() => {
        //     console.log(GameManager.games["000"]);
        // }, 3000);
        io.sockets.on("connection", socket => {
            socket.on("joinUserToGameRequest", keyWord => {
                let game = GameManager.games[keyWord];
                if (game) {
                    game.handleJoin(io, socket);
                } else {
                    GameManager.games[keyWord] = new Game(keyWord);
                    socket.emit("joinUserToGameResponse", "wait");
                }
            });

            socket.on("updateScoreRequest", data => {
                socket.broadcast.to(data.keyWord).emit("updateScoreResponse", data.score);
            });

            socket.on("updateComboRequest", data => {
                socket.broadcast.to(data.keyWord).emit("updateComboResponse", data.combo);
            });

            socket.on("updateTimerRequest", data => {
                io.sockets.to(data.keyWord).emit("updateTimerResponse", data.timeLimit);
            });

            socket.on("sendFieldRequest", data => {
                socket.broadcast.to(data.keyWord).emit("sendFieldResponse", data.field);
            });

            socket.on("gameOverRequest", (keyWord) => {
                let game = GameManager.games[keyWord];
                game.setGameOver(socket);
            });

            socket.on("disconnecting", () => {
                let pagename = getPagename(socket);
                if (pagename === "multi") {
                    socket.adapter.rooms.forEach((_, room) => {
                        if (room && room.length <= 12) {
                            GameManager.games[room] && GameManager.games[room].handleDisconnect(socket);
                        }
                    })
                }
            });
        });
    }
}

module.exports = GameManager;
