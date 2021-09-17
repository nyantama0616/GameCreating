let gulp = require("gulp"),
    watch = require("gulp-watch"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    browserify = require("gulp-browserify"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass")(require("node-sass")),
    browserSync = require("browser-sync"),
    exec = require('child_process').exec
    fs = require("fs"),
    path = require("path");
    log = console.log.bind(console);
 
// jsファイルを結合、圧縮
function compressJS(pathname) {
    let dir = path.dirname(pathname);
    let dirname = path.basename(dir);
    let files = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());
    gulp.src(files.map(file => `${dir}/${file}`))
    .pipe(concat(`${dirname}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
}

// jsxファイルを結合、トランスパイル、圧縮
function compileAndCompressJSX(pathname) {
    let dir = path.dirname(pathname);
    let dirname = path.basename(dir);
    let files = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());

    // "App.jsxを最後尾にもってくる"
    let len = files.length;
    let i = files.indexOf("App.jsx");
    [files[i], files[len - 1]] = [files[len - 1], files[i]];
    //

    gulp.src(files.map(file => `${dir}/${file}`))
        .pipe(concat(`${dirname}.min.js`))
        .pipe(babel())
        .on('error', console.error.bind(console))
        // .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest("dest/"));
}

//scssファイルを結合、コンパイル
function compileSass(pathname) {
    let style = path.dirname(pathname);
    let dir = path.dirname(style);
    let dirname = path.basename(dir);
    let files = fs.readdirSync(style);
    gulp.src(files.map(file => `${style}/${file}`))
        .pipe(concat(`${dirname}.min.css`))
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(gulp.dest("dest/"));
}

gulp.task("watch", (done) => {

    watch("src", (info) => {
        pathname = info.history[0];
        ex = path.extname(pathname).slice(1);

        log(`"${path.basename(pathname)}" has been changed.`);

        switch (ex) {
            case "js":
                compressJS(pathname);
                break;
            case "jsx":
                compileAndCompressJSX(pathname);
                break;
            case "scss":
                compileSass(pathname);
                break;
        }
    });

    //リロード用(一旦止めとく)
    // browserSync.init({
    //     server: {
    //         baseDir: './',
    //         index: 'public/chat.html',
    //     },
    // });

    // watch("dest", (info) => {
    //         browserSync.reload();
    // });
    //

    done();
});

gulp.task("default", (done) => {
    exec("npm rebuild node-sass");
    done();
});
