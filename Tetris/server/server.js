"use strict";

let app = require("http").createServer(routeSetting),
    fs = require("fs"),
    url = require("url"),
    path = require("path"),
    settings = require("./settings");

app.listen(settings.PORT);

function routeSetting(req, res) {
    const pathname = url.parse(req.url).pathname;
    const  filename = path.basename(pathname);
    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fs.readFileSync(`${settings.ROOT}/${settings.TOP_PAGE}`, "utf-8"));
        res.end();
        return;
    }
    switch (path.extname(pathname)) {
        case ".html":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(fs.readFileSync(`${settings.ROOT}/${filename}`, "utf-8"));
            break;
        case ".css":
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(fs.readFileSync(`${settings.ROOT}/${filename}`, "utf-8"));
            break;
        case ".js":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(fs.readFileSync(`${settings.ROOT}/src/${filename}`, "utf-8"));
            break;
        case ".png":
            // res.writeHead(200, { "Content-Type": "image/png" });
            res.writeHead(200, { "Content-Type": `image/png; charset=utf-8` });
            res.write(fs.readFileSync(`${settings.ROOT}/assets/img/${filename}`, "binary"), "binary");
            break;
        case ".mp3":
            res.writeHead(200, { "Content-Type": "sound/mp3" });
            res.write(fs.readFileSync(`${settings.ROOT}/assets/sound/${filename}`, "binary"), "binary");
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
    }
    res.end();
}
