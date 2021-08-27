"use strict";

// let app = require("http").createServer(handler),
let app = require("http").createServer(routeSetting),
    fs = require("fs"),
    url = require("url"),
    path = require("path"),
    settings = require("./settings");

function handler(req, res) {
    console.log("handler??");
    fs.readFile(settings.ROOT + "index.html", "utf-8", function (err, data) {
        console.log("connecting....utf-8");
        if (err) {
            res.writeHead(500);
            return res.end("Error");
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        console.log("connected!!!....");
        res.end();
    });
}

function routeSetting(req, res) {
    const pathname = url.parse(req.url).pathname;
    const filename = path.basename(pathname);
    console.log(pathname, filename, path.extname(pathname));
    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fs.readFileSync(`${settings.ROOT}/index.html`, "utf-8"));
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
            console.log(`${settings.ROOT}/assets/img/${filename}`);
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

app.listen(settings.PORT);
