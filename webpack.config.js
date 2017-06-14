const banner = `
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Files
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

`;

const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const OfflinePlugin = require('offline-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

const htmlOptions = {
    inject: true,
    cache: true,
    hash: true,
    showErrors: true,
    minify: {
        html5: true,
        removeComments: true,
        sortClassName: true,
        preserveLineBreaks: true,
        collapseWhitespace: true,
        decodeEntities: true
    }
}

module.exports = {

    context: path.resolve(__dirname),
    // devtool: 'eval',
    cache: true,
    entry: {
        // APPCACHE ( ESSENTIALS + CORE )
        'app_cache': './_src/templates/webpack/essentials/cache.js',
        // FORMS
        'forms_basic': ['./_src/templates/webpack/forms/forms_basic.js'],
        'forms_advanced': ['./_src/templates/webpack/forms/forms_advanced.js'],
        //VUE
        // 'vue_loader': ['./_src/templates/webpack/essentials/vue_loader.js'],
        // went to cache
        //APP VIEWS
        'view_charts': ['./_src/templates/webpack/views/view_charts.js'],
        'view_datatables': ['./_src/templates/webpack/views/view_datatables.js'],
        'view_brand_settings': ['./_src/templates/webpack/views/view_brand_settings.js'],
        'view_gridstack': ['./_src/templates/webpack/views/view_gridstack.js'],
        'view_widget_files': ['./_src/templates/webpack/views/view_widget_files.js'],
        'view_widget_comments': ['./_src/templates/webpack/views/view_widget_comments.js'],
        'view_acl': ['./_src/templates/webpack/views/view_acl.js'],
        'translations_requirements': ['./_src/js/components/translations/translations_webpack_requirements.js'],
        'view_translations': ['./_src/templates/webpack/views/view_translations.js'],
        'view_devtests': ['./_src/templates/webpack/views/view_devtests.js'],
        'view_notification_templates': ['./_src/templates/webpack/views/view_notification_templates.js'],
        'view_clients_details_gridstack': ['./_src/templates/webpack/views/view_clients_details_gridstack.js'],
        'view_widgets_html': ['./_src/templates/webpack/views/view_widgets_html.js']
        
        // 'view_widget_tabs': ['./_src/templates/webpack/views/view_widget_tabs.js'],
        // 'view_router': ['./_src/templates/webpack/views/view_router.js'],
        //CSS
        // 'css': ['./_src/templates/webpack/essentials/css.js']

    },
    devServer: {
        contentBase: path.join(__dirname, '_dist/'), // boolean | string | array, static file location
        compress: true,
        port: 9000,
        host: 'localhost',
        // noInfo: true,
        // hot: true,
        // quiet: true,

    },
    output: {
        path: path.join(__dirname, '_dist/'),
        filename: "js/[name].js",
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                // options: {
                //   presets: ['env']
                // }
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.ejs/,
            loader: "template-html-loader"
        }, {
            test: /\.css$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('postcss-cssnext')({
                    warnForDuplicates: false
                })]
            }
        }, {
            // images
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            exclude: [/fonts/],
            use: [
                'file?hash=sha512&digest=hex&name=img/webpack/[name].[ext]',
                'image-webpack'
            ]
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            exclude: [/img/],
            loader: 'file-loader?&name=fonts/webpack/[name].[ext]',
        }]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    externals: {
        'jquery': '$'
    },

    devServer: {
        contentBase: path.join(__dirname, "_dist/"),
        compress: true,
        port: 9000,
        host: '0.0.0.0'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.EnvironmentPlugin([
        //     "NODE_ENV"
        // ]),
        // new webpack.DefinePlugin({
        //     BROWSER_SUPPORTS_HTML5: true,
        //     PRODUCTION: JSON.stringify(process.env.NODE_ENV) === 'production',
        //     ENV: JSON.stringify(process.env.NODE_ENV),
        //     VERSION: JSON.stringify(require("./package.json").version),
        //     "typeof window": JSON.stringify("object")
        // }),
        new webpack.BannerPlugin(banner),
        // new DashboardPlugin(),
        new ProgressBarPlugin(),
        // new HappyPack({
        //     loaders: ['babel'],
        // }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new ExtractTextPlugin("./css/app.css"),
        // new BabiliPlugin({}, require("babel-preset-babili"))
        // new UglifyJSPlugin({
        //     mangle: true,
        //     sourceMap: false,
        //     compress: {
        //         warnings: false
        //     }
        // })
        new CopyWebpackPlugin([{
            from: '_src/img/',
            to: 'img/'
        }, {
            from: '_src/fonts/',
            to: 'fonts/'
        },{
            from: '_src/api/',
            to: 'api/'
        }, ]),

        // Components
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Component Button',
            template: '_src/templates/pages/component_button.ejs',
            filename: 'component_button.html',
            chunks: ['app_cache', 'forms_basic',]
        })),

        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Component Button Link',
            template: '_src/templates/pages/component_button_link.ejs',
            filename: 'component_button_link.html',
            chunks: ['app_cache', 'forms_basic',]
        })),

        // Pages
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Dashboard',
            template: '_src/templates/pages/dashboard.ejs',
            filename: 'index.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_charts']

        })),

        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Dashboard HTML',
            template: '_src/templates/pages/widgets_html.ejs',
            filename: 'widgets_html.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_widgets_html', 'view_charts']

        })),

        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Table',
            template: '_src/templates/pages/clients_list.ejs',
            filename: 'clients_list.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']

        })),

        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Table Dev',
            template: '_src/templates/pages/clients_list_dev.ejs',
            filename: 'clients_list_dev.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']

        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Settings',
            template: '_src/templates/pages/general_settings.ejs',
            filename: 'general_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Email Settings',
            template: '_src/templates/pages/email_settings.ejs',
            filename: 'email_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Brand Settings',
            template: '_src/templates/pages/brand_settings.ejs',
            filename: 'brand_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Brand List',
            template: '_src/templates/pages/brand_list.ejs',
            filename: 'brand_list.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Clients Details',
            template: '_src/templates/pages/clients_details.ejs',
            filename: 'clients_details.html',
            chunks: ['app_cache', 'forms_basic', 'view_datatables']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Clients Details - Gridstack Ver.',
            template: '_src/templates/pages/clients_details_gridstack.ejs',
            filename: 'clients_details_gridstack.html',
            chunks: ['app_cache', 'forms_basic', 'view_datatables', 'view_gridstack']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Antares Zero Data',
            template: '_src/templates/pages/zero_data.ejs',
            filename: 'zero_data.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Forms',
            template: '_src/templates/pages/forms.ejs',
            filename: 'forms.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Forms',
            template: '_src/templates/pages/forms_horizontal.ejs',
            filename: 'forms_hor.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: '400',
            template: '_src/templates/pages/error_400.ejs',
            filename: 'error_400.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: '500',
            template: '_src/templates/pages/error_500.ejs',
            filename: 'error_500.html'
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: '404',
            template: '_src/templates/pages/error_404.ejs',
            filename: 'error_404.html'
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Create',
            template: '_src/templates/pages/steps.ejs',
            filename: 'steps.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Create',
            template: '_src/templates/pages/installator.ejs',
            filename: 'installator.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Login',
            template: '_src/templates/pages/login.ejs',
            filename: 'login_page.html',
            chunks: ['app_cache', 'forms_basic']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Table Filter',
            template: '_src/templates/pages/table_filter.ejs',
            filename: 'table_filter.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'acl',
            template: '_src/templates/pages/acl.ejs',
            filename: 'acl.html',
            chunks: ['app_cache',  'forms_advanced', 'view_acl']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'translations',
            template: '_src/templates/pages/translations.ejs',
            filename: 'translations.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings', 'translations_requirements', 'view_translations']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'widget_tabs',
            template: '_src/templates/pages/widget_tabs.ejs',
            filename: 'widget_tabs.html',
            chunks: ['app_cache',  'forms_basic', 'view_gridstack', 'view_charts', 'view_widget_tabs']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'devtests',
            template: '_src/templates/pages/devtests.ejs',
            filename: 'devtests.html',
            chunks: ['app_cache', 'forms_advanced', 'view_gridstack',  'view_devtests']
        })),
        new HtmlWebpackPlugin(Object.assign(htmlOptions, {
            title: 'Notification templates',
            template: '_src/templates/pages/notification_templates.ejs',
            filename: 'notification_templates.html',
            chunks: ['app_cache', 'forms_advanced', 'view_notification_templates', 'view_brand_settings']
        })),
        // new CleanWebpackPlugin(['_dist'], {
        //     verbose: false,
        //     dry: false,
        // }),
        // new BundleAnalyzerPlugin({
            // reportFilename: './reports/webpack/report.html',
            // analyzerMode: 'static',
            // generateStatsFile: true,
            // statsFilename: 'stats.json',
        // }),
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.(js|html)$/,
        //     threshold: 10240,
        //     minRatio: 0.8,
        //     deleteOriginalAssets: true
        // }),
        // new FaviconsWebpackPlugin({
        //     title: 'Antares',
        //     // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        //     icons: {
        //       android: true,
        //       appleIcon: true,
        //       appleStartup: true,
        //       coast: false,
        //       favicons: true,
        //       firefox: true,
        //       opengraph: false,
        //       twitter: false,
        //       yandex: false,
        //       windows: false
        //     },
        //     logo: './webpack/img/theme/antares/logo/Logo.png',
        // }),
        // new OfflinePlugin({
        //     caches: {
        //         // main:['webpack.app_cache.js'],
        //         // main:['js/app_cache.js', 'js/css.js'],
        //         main:['js/app_cache.js', 'js/forms_basic.js', 'js/view_gridstack.js'],
        //         // main:['./webpack/webpack.app_cache.js'],
        //         // additional: ['webpack.CV_dashboard.js', 'webpack.CV_brand_settings.js', 'webpack.CV_datatables.js']
        //     }, 
        //     // caches: 'all',
        //     // relativePaths: false,
        //     // publicPath: '../js/',
        //     AppCache: false,
        //     // AppCache:{
        //     //     directory:'appcache',
        //     //     disableInstall: true,
        //     //     // cache',
        //     //     // publicPath:'../js'
        //     // },
        //     // publicPath:'webpack/',
        //     ServiceWorker: {
        //         events: true,
        //         output: './js/asset_listener.js',
        //         // scope:'scriptURL',
        //     }
        //     // ServiceWorker: false,
        // }),
        // new ServiceWorkerWebpackPlugin({
        //   entry: './sw.js',
        // }),
    ],
};

// console.log('ENV: ' + process.env.NODE_ENV);