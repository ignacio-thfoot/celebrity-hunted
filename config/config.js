var wordpress_folder = 'http://localhost/celebrity-hunted/public';
var theme_name = 'webpack-wp-theme';

module.exports = {
    url: wordpress_folder,
    public_paths: {
        virtual: 'http://localhost:9000/',
        local: wordpress_folder + '/js/frontend/',
        //stage: '//webpackdev.wpengine.com/'+ 'wp-content/themes/' + theme_name + '/theme/js/frontend/', // Define it later
        // production: 'production/placeholder' // Define it later
    }
}