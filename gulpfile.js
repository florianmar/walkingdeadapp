var gulp = require('gulp'); // j'appelle le module gulp
var browserSync = require('browser-sync');
// rafraichissement du browser
var reload      = browserSync.reload;
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
//var uncss = require('gulp-uncss');
var sourcemaps = require('gulp-sourcemaps');
// pour lancer la commande gulp malgrÃ© l'erreur avec autoprefixer

// task Browser Sync qui permet de configurer au lancement Browser Sync
// et lancer le serveur ds le Browser
gulp.task('browser-sync', function() {
    browserSync({
        port: 3500,
        server: {
            baseDir: "./", //base directory:
            index: "index.html" // fichier Ã  lancer par dÃ©faut
        }
    });
});
// tache lancÃ©e par dÃ©faut avec la ligne de commande gulp
gulp.task('default', ['browser-sync', 'css', 'sass', 'js'], function() {
    gulp.watch(['./js/*.js'], ['js']);
    gulp.watch(['./css/*.css'], ['css']);
    gulp.watch(['./sass/**/*.scss'], ['sass']);
    // watch permet de "watcher", observer les changements de fichiers
    // CSS du dossier CSS et relancer la tÃ¢che "css"

    console.log("Ma tÃ¢che par default...");
});

// crÃ©e une tÃ¢che CSS
gulp.task('css', function() {
    console.log("Ma tÃ¢che pour la CSS");
    //1 gulp.src () => chercher un ou plusieurs fichiers sources
    return gulp.src('./css/style.css') //src = source de fichier(s)
    .pipe(minifyCss()) // compresser ma CSS par le module gulp-minify-css
    .pipe(concat('bundle.css'))
    .pipe(size())
    // .pipe(uncss({
    //   html: ['./index.html']
    // }))
    // gulp dest +> sert Ã  prÃ©ciser le rÃ©pertoire de destination
    .pipe(gulp.dest('dist/css/')) // permet d'envoyer le fichier minimifiÃ© dans le rÃ©pertoire dist/css
    .pipe(notify("CSS compressÃ©e, et concatenÃ©e!"))

    .pipe(reload({stream:true, once: true})); // je relance mon naviguateur quand ma tache css est accomplie: permet de rafraichir mon naviguateur

});

// crÃ©e une tache SASS
gulp.task('sass', function() {
    return gulp.src('sass/style.scss') //src = source de fichier(s)
    .pipe(sass().on('error', sass.logError)) // compiler du SASS en CSS
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    // .pipe(minifyCss()) // compresser ma CSS par le module gulp-minify-css
    .pipe(concat('bundle-sass.css'))
    .pipe(size())
    // .pipe(uncss({
    //   html: ['index.html']
    // }))
    .pipe(gulp.dest('dist/css/')) // permet d'envoyer le fichier minimifier dans le rÃ©pertoire dist/css
    .pipe(notify("SASS compilÃ©e compressÃ©e, et concatenÃ©e!"))
    .pipe(reload({stream:true, once: true}));
});

// crÃ©e une tÃ¢che js js
gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('app.min.js'))
    // .pipe(uglify()) //minify js
    .pipe(size())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify("JS ModifiÃ©"))
    .pipe(reload({stream:true}));
});
