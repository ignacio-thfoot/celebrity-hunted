const config = require('./config/config.js');
const entries = require('./config/config.entries.js');
const path = require('path');
// const webpack = require('webpack');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// entry & output
module.exports = env => {

    console.log('mode: ', env.mode); // 'local'

    // Loaders vars for DEV-BUILD
    var cssLoader, sassLoader, imageDestination, imageBasePath, fontDestination, fontBasePath, publicPathCustom, filename_output, pluginsToUse = null;

    if (env.mode == "development") { //DEV

        cssLoader  = ['style-loader', 'css-loader','postcss-loader'];
        sassLoader = ['style-loader', 'css-loader','postcss-loader', 'sass-loader'];
        imageDestination = '';
        imageBasePath = '';
        fontDestination = '';
        fontBasePath = '';
        filename_output = '[name].bundle.js';
        filename_output_chunks = '[name].bundle.js';
        publicPathCustom = config.public_paths.virtual;

        pluginsToUse = [
            new BrowserSyncPlugin(
                // BrowserSync options
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: config.url,
                    files: "./**/*.php"
                },
                // plugin options
                {
                    reload: false
                }
            ),
            new VueLoaderPlugin()
        ]
        
    } else { // production or stage

        cssLoader  = [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
        sassLoader = [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'];
        imageDestination = './../../img/';
        imageBasePath = '../../img/';
        fontDestination = './../../css/fonts/';
        fontBasePath = './fonts/';
        filename_output = '[name].js';
        filename_output_chunks = '[name].js';
        
        switch (env.ppath) {
            case 'local':
                publicPathCustom = config.public_paths.local;
                break;
            case 'stage':
                publicPathCustom = config.public_paths.stage;
                break;
            case 'production':
                publicPathCustom = config.public_paths.production;
                break;
        }

        pluginsToUse = [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                // tomo las cosas del output general
                filename: '../../css/[name].css',
                // chunkFilename: '../../css/[id].css',
                ignoreOrder: false,
            }),
            new VueLoaderPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static', //will only generate on build
                openAnalyzer: false,
            }),
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, './public/js/frontend/app_backend.*.js'),
                    to: path.resolve(__dirname, './public/js/backend/')
                },
            ]),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    //images does not have to be deleted.
                    path.resolve(__dirname, './public/css/'),
                    path.resolve(__dirname, './public/js/frontend')
                ],
                cleanAfterEveryBuildPatterns: [
                    path.resolve(__dirname, './public/js/frontend/app_common.*.js'),
                    path.resolve(__dirname, './public/js/frontend/app_backend.*.js')
                ]
            })
        ]
    }

    return {
        mode: env.mode,
        entry: entries,
        output: {
            path: path.resolve(__dirname, './public/js/frontend/'),
            filename: filename_output,
            chunkFilename: filename_output,
            publicPath: publicPathCustom,
            chunkFilename: filename_output_chunks,
        },
        externals: {
            jquery: 'jQuery'
        },
        devServer: {
            port: 9000,
            hot: true,
            inline: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            proxy: {
                '*': {
                    target: config.url,
                    changeOrigin: true,
                },
                '/': {
                    target: config.url,
                    changeOrigin: true,
                }
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use:'babel-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: sassLoader
                },
                {
                    test: /\.css$/i,
                    use: cssLoader,
                },
                { 
                    test: /\.(png|svg|jpg|gif)$/,
                    exclude: [path.resolve(__dirname, './src/scss/fonts')],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: imageDestination, // path donde guarda la img
                                publicPath: imageBasePath // path para encontrar la img
                            }
                        }
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    exclude: [path.resolve(__dirname, './src/img/')],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                limit: 4096,
                                mimetype: "application/font-woff",
                                outputPath: fontDestination,
                                publicPath: fontBasePath,
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    exclude: /(node_modules)/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader',
                            css: 'vue-style-loader!css-loader',
                        },
                    },
                }
            ]
        },
        plugins: pluginsToUse
    }

};