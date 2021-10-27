const mix = require('laravel-mix');
const del = require('del');
require('laravel-mix-serve');


mix.setPublicPath('./public');
del('public/css/*.css');
del('public/js/*.js');
mix.js('resources/js/home.js', 'public/js').vue();
mix.js('resources/js/post.js', 'public/js').vue();
mix.sass('resources/scss/entries/common.scss', 'public/css');

mix.browserSync({
    'port': 8000,
	files: [
		'resources/views',
		'resources/assets',
		'app',
        'resources/css',
        'resources/js'
	],
});

mix.browserSync('127.0.0.1:8000');

mix.serve();