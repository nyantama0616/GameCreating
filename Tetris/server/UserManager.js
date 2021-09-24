class UserManager {
    static users = {};
    static idCounter = 0;
    
    static createUser(socket) { 
        if (UserManager.users[socket.id]) return;
        let user = {
            id: UserManager.idCounter++,
        }
        UserManager.users[socket.id] = user;
    }
    
    static getUser(socketID) {
        return UserManager.users[socketID] || false;
    }
    
    static run(io) {
        io.sockets.on("connection", socket => {
            socket.on("createUserRequest", () => {
                UserManager.createUser(socket);
                socket.emit("createUserResponse", {id: socket.id,  users: UserManager.users });
            });
        });
    }
}

module.exports = UserManager;
