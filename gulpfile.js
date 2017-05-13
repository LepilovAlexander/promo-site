/*
Структура
dev - файлы разработки
--inc - файлы шаблонов, которые подключаю
build - собираю проект тут
 */
var gulp = require('gulp');
var csso = require('gulp-csso');
var includer = require('gulp-htmlincluder'),
    connect = require('gulp-connect');
//Создаю задачу по запуску сервера
gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('htmlIncluder', function() {
    gulp.src('dev/**/*.html')
        .pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload()); //после выполнения задачи перзагрузить сервер
});

gulp.task('mincss', function () {
    return gulp.src('dev/css/**/*.css')
        .pipe(csso())
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload()); //после выполнения задачи перзагрузить сервер
});

//Добавляю наблюдателя за файлами
gulp.task('watch', function () {
    gulp.watch(['dev/**/*.html'], ['htmlIncluder']); //при изменении html файлов, запускаю htmlIncluder
    gulp.watch(['dev/img/**/*.*'], ['move']); //при изменении html файлов, запускаю htmlIncluder
    gulp.watch(['dev/js/**/*.js'], ['move']); //при изменении html файлов, запускаю htmlIncluder
});


gulp.task('move', function () {
    gulp.src('dev/img/**/*.*')
        .pipe(gulp.dest('build/img/'))
        .pipe(connect.reload()); //после выполнения задачи перзагрузить сервер
    gulp.src('dev/js/**/*.*')
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload()); //после выполнения задачи перзагрузить сервер
});


gulp.task('default', ['connect', 'watch', 'htmlIncluder', 'mincss', 'move']); // Задача для команды "gulp", которая запустит сервер и запустит наблюдателя