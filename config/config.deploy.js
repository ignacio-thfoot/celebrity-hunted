module.exports = {
    production: {
        serverCredentials: {
            host: "xxxxxx",
            user: "user",
            port: "port",
            pass: "password",
            remotePath: "some-path"
        }
    },
    stage: {
        serverCredentials: {
            host: "webpackdev.sftp.wpengine.com",
            user: "webpackdev-dev",
            port: "2222",
            pass: "4kfKyzF8Bsqe",
            remotePath: "/wp-content/themes/webpack-wp-theme"
        }
    },
    filesToWatch: {
        all: {
            exclude: {
                node_modules: "!./node_modules/",
                node_modules_all: "!./node_modules/**/.*",
                gulpfile: "!./gulpfile.js",
                package_lock: "!./package-lock.json",
                package: "!./package.json",
                webpack: "!./webpack.config.js",
                postcss: "!./postcss.config.js",
                src: "!./src/",
                src_all: "!./src/**/.*",
                config: "!./config/",
                config_all: "!./config/.*"
            }
        },
        php: {
            exclude: {
                local_folder: "!functions/local/*.*",
                hash_defined : "functions/enqueues/hash-defined.php"
            },
            include: {
                php: "./*.php",
                functions: {
                    ajax_calls: "functions/ajax-calls/*.*",
                    api: "functions/api/**/*.*",
                    custom: "functions/custom/**/*.*",
                    default: "functions/default/*.*",
                    enqueues: "functions/enqueues/*/*.*",
                    navbar: "functions/navbar/*.*",
                    seo: "functions/seo/*.*",
                    tpc: "functions/tpc/*.*",
                    utilities: "functions/utilities/**/*.*"
                },
                modules :{
                    cards: "modules/cards/*.*",
                    common: "modules/common/*.*",
                    framework: "modules/framework/**/*.*",
                    pages: "modules/pages/**/*.*",
                    hero: "modules/hero/**/*.*"
                }
            },
            hash_defined : "functions/enqueues/hash-defined.php"
        },
        css: "./theme/css/*.*",
        js: "./theme/js/*/*.*",
        fontSymbol: "./theme/symbols/*.*",
        img: "./theme/img/*.*"
    },
    base: "./"
}