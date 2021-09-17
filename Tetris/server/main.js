"use strict";

const http = require("http"),
    router = require("./router"),
    Socket = require("./socket");

let app = http.createServer(router.routeSetting),
    settings = require("./settings");

    
app.listen(settings.PORT);
Socket.run(app);
