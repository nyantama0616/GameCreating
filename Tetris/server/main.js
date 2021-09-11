"use strict";

const http = require("http"),
    router = require("./router");

let app = http.createServer(router.routeSetting),
    settings = require("./settings");

app.listen(settings.PORT);
