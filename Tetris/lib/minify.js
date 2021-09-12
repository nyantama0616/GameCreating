let chokidar = require("chokidar"),
    gulp = require("gulp"),
    concat = require("gulp-concat"),
    Path = require("path"),
    fs = require("fs");
const path = require("path");
    exec = require('child_process').exec
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

function myConcat(files, dir, outname, to) {
    gulp.src(files.map(file => `${dir}/${file}`))
        .pipe(concat(outname))
        .pipe(gulp.dest(to));
}

function minify(dir) {
    const files = fs.readdirSync(dir).filter(file => fs.statSync(dir + "/" + file).isFile());
    if (!files.length) { return; }
    
    let dirname = myDirname(dir);

    let outname;
    let input;
    let output;
    switch (Path.extname(files[0]).slice(1)) {
        case "js":
            outname = `${dirname}.min.js`;
            myConcat(files, dir, "_" + outname, min);
            
            input = temp + "/_" + outname;
            output = dest + "/" + outname;
            
            case "jsx":
                outname = `${dirname}.js`;
                myConcat(files, dir, "_" + outname, temp);
            
            // コンパイル
            input = `${temp}/_${outname}`;
            output = `${temp}/min/_${outname}`;
            exec(`npx babel ${input} --out-file ${output}`);
            break;
        
        case "scss":
            dirname = myDirname(Path.dirname(dir));
            myConcat(files, dir, `_${dirname}.scss`, temp);

            // コンパイル
            input = `${temp}/_${dirname}.scss`;
            output = `${dest}/${dirname}.css`;

            exec(`node-sass ${input} ${output} --output-style compressed`);
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
    
    // watcher.on("addDir", (path, stats) => {
        
    // });
    
    // watcher.on("unlinkDir", (path, stats) => {

    // });
});

function getFilename(path) {
    let result = "";
    let flag = false;
    for (let i = path.length - 1; i >= 0; i--) {
        if (flag) {
            if (path[i] === "/") break;
            result = path[i] + result;
        } else {
            if (path[i] === ".") flag = true;
        }
    }
    return result;
}

function out(path) {
    // 圧縮
    const filename = getFilename(path).slice(1);
    const ex = Path.extname(path);
    const output = `${dest}/${filename}.min${ex}`;
    exec(`npx terser -c -m -o ${output} -- ${path}`);
    log(`npx terser -c -m -o ${output} -- ${path}`);
}

const min = `${Path.dirname(__dirname)}/temp/min`;

let miniWatcher = chokidar.watch(min, {
    ignored: /[\/\\]\./,
    persistent: true
});

miniWatcher.on("ready", () => {
    log(`${min} is ready to change.`);

    miniWatcher.on("add", (path, stats) => {
        out(path);
    });
    
    miniWatcher.on("change", (path, stats) => {
        out(path);
    });
})
