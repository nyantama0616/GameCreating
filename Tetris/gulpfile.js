let gulp = require("gulp"),
    watch = require("gulp-watch"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    browserify = require("gulp-browserify"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass")(require("node-sass")),
<<<<<<< HEAD
    browserSync = require("browser-sync"),
=======
>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
    exec = require('child_process').exec
    fs = require("fs"),
    path = require("path");
    log = console.log.bind(console);
<<<<<<< HEAD
 
// jsファイルを結合、圧縮
=======

    
>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
function compressJS(pathname) {
    let dir = path.dirname(pathname);
    let dirname = path.basename(dir);
    let files = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());
    gulp.src(files.map(file => `${dir}/${file}`))
    .pipe(concat(`${dirname}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
}

<<<<<<< HEAD
// jsxファイルを結合、トランスパイル、圧縮
=======
>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
function compileAndCompressJSX(pathname) {
    let dir = path.dirname(pathname);
    let dirname = path.basename(dir);
    let files = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());
    gulp.src(files.map(file => `${dir}/${file}`))
        .pipe(concat(`${dirname}.min.js`))
        .pipe(babel())
        .on('error', console.error.bind(console))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest("dest/"));
}

<<<<<<< HEAD
//scssファイルを結合、コンパイル
=======
>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
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
<<<<<<< HEAD
=======

>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
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
<<<<<<< HEAD

    //リロード用
    browserSync.init({
        server: {
            baseDir: './',
            index: 'public/chat.html',
        },
    });

    watch("dest", (info) => {
            browserSync.reload();
    });
    //

=======
>>>>>>> 2f39905c0b311fb9cfd2555bcc302998d5a7f2ae
    done();
});

gulp.task("default", (done) => {
    exec("npm rebuild node-sass");
    done();
});
