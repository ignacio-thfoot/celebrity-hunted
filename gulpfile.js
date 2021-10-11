var gulp = require('gulp');
const deploy = require('./config/config.deploy');
const argv = require('yargs').argv;
var sftp = require('gulp-sftp-up4');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var miniCss = require('gulp-cssmin');


/**
 * 
 * Generate Symbols using task ( gulp symbols )
 * (Path | Font Name | Sketch File) are configured from config.font.js
 * 
 **/

const serverCredentialsProduction = sftp(deploy.production.serverCredentials);
const serverCredentialsStage = sftp(deploy.stage.serverCredentials);

/**
 * This is needed for mapping glyphs and codepoints.
 */

function mapGlyphs (glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}

/**
 *  
 *  Gulp Deploy
 * 
 **/

/* Uploads PHP files to server */
function deployPHP(done) {
  return gulp.src([
    deploy.filesToWatch.php.exclude.local_folder,
    deploy.filesToWatch.php.exclude.hash_defined,
    deploy.filesToWatch.php.include.php,
    deploy.filesToWatch.php.include.functions.ajax_calls,
    deploy.filesToWatch.php.include.functions.api,
    deploy.filesToWatch.php.include.functions.custom,
    deploy.filesToWatch.php.include.functions.default,
    deploy.filesToWatch.php.include.functions.enqueues,
    deploy.filesToWatch.php.include.functions.navbar,
    deploy.filesToWatch.php.include.functions.seo,
    deploy.filesToWatch.php.include.functions.tpc,
    deploy.filesToWatch.php.include.functions.utilities
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-php', gulp.series(deployPHP))
exports.dpassets = deployPHP;

/* Uploads CSS files to server */
function deployCSS(done) {
  return gulp.src([
    deploy.filesToWatch.css
  ], { base: deploy.base })
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-css', gulp.series(deployCSS))
exports.dpassets = deployCSS;

/* Uploads FONT-SYMBOLS files to server */
function deployFonts(done) {
  return gulp.src([
    deploy.filesToWatch.fontSymbol
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-font', gulp.series(deployFonts))
exports.dpassets = deployFonts;

/* Uploads IMG and SVG files to server */
function deployIMG(done) {
  return gulp.src([
    deploy.filesToWatch.img
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-img', gulp.series(deployIMG))
exports.dpassets = deployIMG;

/* Uploads JS files to server */
function deployJS(done) {
  return gulp.src([
    deploy.filesToWatch.js
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-js', gulp.series(deployJS))
exports.dpassets = deployJS;

/* Uploads ALL main files to server */
function deployALL(done) {
  return gulp.src([
    deploy.filesToWatch.all.exclude.node_modules,
    deploy.filesToWatch.all.exclude.node_modules_all,
    deploy.filesToWatch.all.exclude.gulpfile,
    deploy.filesToWatch.all.exclude.package_lock,
    deploy.filesToWatch.all.exclude.package,
    deploy.filesToWatch.all.exclude.webpack,
    deploy.filesToWatch.all.exclude.postcss,
    deploy.filesToWatch.all.exclude.src,
    deploy.filesToWatch.all.exclude.src_all,
    deploy.filesToWatch.all.exclude.config,
    deploy.filesToWatch.all.exclude.config_all,
    deploy.filesToWatch.php.exclude.local_folder,
    deploy.filesToWatch.php.exclude.hash_defined,
    deploy.filesToWatch.php.include.php,
    deploy.filesToWatch.php.include.functions.ajax_calls,
    deploy.filesToWatch.php.include.functions.api,
    deploy.filesToWatch.php.include.functions.custom,
    deploy.filesToWatch.php.include.functions.default,
    deploy.filesToWatch.php.include.functions.enqueues,
    deploy.filesToWatch.php.include.functions.navbar,
    deploy.filesToWatch.php.include.functions.seo,
    deploy.filesToWatch.php.include.functions.tpc,
    deploy.filesToWatch.php.include.functions.utilities,
    deploy.filesToWatch.css,
    deploy.filesToWatch.js,
    deploy.filesToWatch.fontSymbol,
    deploy.filesToWatch.img
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('deploy', gulp.series(deployALL))
exports.dpassets = deployALL;

/* Uploads Hash Defined PHP files to server */
function deployHashDefined(done) {
  return gulp.src([
    deploy.filesToWatch.php.hash_defined
  ], { base: deploy.base })
    .pipe(gulpif(argv.stage, serverCredentialsStage))
    .pipe(gulpif(argv.production, serverCredentialsProduction))
  done()
}
gulp.task('dp-hash', gulp.series(deployHashDefined))
exports.dpassets = deployHashDefined;