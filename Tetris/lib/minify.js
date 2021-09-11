let chokidar = require("chokidar"),
    gulp = require("gulp"),
    concat = require("gulp-concat"),
    Path = require("path"),
    fs = require("fs")
    exec = require('child_process').exec;
    
const path = require("path");


const src = Path.dirname(__dirname) + "/src";
const dest = Path.dirname(__dirname) + "/dest";
const temp = Path.dirname(__dirname) + "/temp";

const log = console.log.bind(console);

function myDirname(pathToDir) {
    let result = "";
    for (let i = pathToDir.length - 1; i >= 0; i--) {
        if (pathToDir[i] === "/") { break; }
        result = pathToDir[i] + result;
    }
    return result;
}

function myConcat(files, dir, outname) {
    gulp.src(files.map(file => `${dir}/${file}`))
        .pipe(concat(outname))
        .pipe(gulp.dest(temp));
}

function minify(dir) {
    const files = fs.readdirSync(dir).filter(file => fs.statSync(dir + "/" + file).isFile());
    if (!files.length) { return; }
    
    const dirname = myDirname(dir);

        
    switch (path.extname(files[0]).slice(1)) {
        case "js":
            const outname = `${dirname}.min.js`;
            myConcat(files, dir, "_" + outname);
            
            const input = temp + "/_" + outname;
            const output = dest + "/" + outname;

            exec(`npx terser -c -m -o ${output} -- ${input}`);

            console.log(`${output} was updated!`);
        case "scss":
            break;
    }


}

let watcher = chokidar.watch(src, {
    ignored: /[\/\\]\./,
    persistent: true
});

watcher.on("ready", () => {
    log(`${src} is ready to change.`);
    
    watcher.on("add", (path, stats) => {
        minify(Path.dirname(path));
    });
    
    watcher.on("change", (path, stats) => {
        minify(Path.dirname(path));
    });
    
    watcher.on("unlink", (path, stats) => {
        minify(Path.dirname(path));
    });
    
    watcher.on("addDir", (path, stats) => {
        
    });
    
    watcher.on("unlinkDir", (path, stats) => {

    });
});
