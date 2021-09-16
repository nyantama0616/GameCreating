"use strict";

const http = require("http"),
    router = require("./router"),
    socket = require("socket.io"),
    Mylib = require("./mylib");

let app = http.createServer(router.routeSetting),
    settings = require("./settings"),
    io = socket(app);

require("./socket");
io.sockets.on("connection", socket => {
    socket.on("addCommentRequest", data => { io.sockets.emit("addCommentResponse", data); });
    // socket.on("generateIDRequest", data => { io.sockets.emit("generateIDResponse", { id: Mylib.generateID(data.usedID) }) });
});

app.listen(settings.PORT);
