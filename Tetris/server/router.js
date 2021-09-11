const fs = require("fs"),
    path = require("path")
    settings = require("./settings");

const extensions = {
    "html": {
        contentType: "text/html",
        encoding: "utf-8"
    },
    
    "css": {
        contentType: "text/css",
        encoding: "utf-8"
    },
    
    "js": {
        contentType: "text/plain",
        encoding: "utf-8"
    },
    
    "png": {
        contentType: "image/png",
        encoding: "binary"
    },
    
    "mp3": {
        contentType: "sound/mp3",
        encoding: "binary"
    },

    "ico": {
        contentType: "image/x-icon",
        encoding: "binary"
    }
}

exports.routeSetting = function (req, res) {
    const pathname = req.url;
    const filename = path.basename(pathname);
    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fs.readFileSync(`${settings.ROOT}/${settings.TOP_PAGE}`, "utf-8"));
        res.end();
        return;
    }

    const ex = extensions[path.extname(pathname).slice(1)];
    res.writeHead(200, { "Content-Type": ex.contentType });
    res.write(fs.readFileSync(settings.ROOT + pathname, ex.encoding), ex.encoding);
    res.end();
}
