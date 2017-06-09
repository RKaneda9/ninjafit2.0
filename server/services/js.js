let webpack           = require('webpack'),
    path              = require('path'),
    fs                = require('fs'),
    utils             = require('../helpers/utils'),
    UnminifiedPlugin  = require('unminified-webpack-plugin'),
    Webpack2Polyfill  = require('webpack2-polyfill-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let service = module.exports = {
    init (settings) {
        if (!settings.hasOwnProperty("js")) return console.log('settings file does not contain a section for "js". skipping...'); 

        let error = msg => { throw `/services/js init() error. ${msg}. Please see readme for how to setup /server/settings.json` };

        if (!utils.isObj   (settings.js))            error('"settings.js" is required as an object');
        if (!utils.isString(settings.outputdir))     error('"settings.outputdir" is required as a string');
        if (!utils.isString(settings.js.outputdir))  error('"settings.js.outputdir" is required as a string');
        if (!utils.isString(settings.js.inputdir))   error('"settings.js.inputdir" is required as a string');
        if (!utils.isArray (settings.js.inputfiles)) error('"settings.js.inputfiles" is required as a string');

        let buildDir = utils.ensureDir(settings   .outputdir),
               jsDir = utils.ensureDir(settings.js.outputdir);

        // setup local settings
        this.settings = {
            outputDir:   buildDir,
            jsDir:       jsDir,
            inputDir:    utils.ensureDir(settings.js.inputdir),
            inputFiles:  settings.js.inputfiles
        };

        // create output folder
        utils.createFolder(buildDir + jsDir);
    },

    getInputSubFolders (path) {
        return fs
            .readdirSync(path || this.settings.inputDir)
            .filter(file => fs.lstatSync(this.settings.inputDir + file).isDirectory());
    },

    // getConfig ({ minified, unminified }) {
    getConfig (minified) {
        let config = {
            entry: {},
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.pug/,
                        use: [
                            { loader: 'raw-loader'      },
                            { loader: 'pug-html-loader' }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            fallback: "style-loader", 
                            use: "css-loader",
                            publicPath: './lib/scss'
                        })
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: 'style-loader' },
                            { loader: 'css-loader' },
                            {
                                loader: 'sass-loader', 
                                options: { includePaths: ['./lib/scss'] }
                            }
                        ]
                    },
                    { test: /\.(woff2?|ttf|otf|eot|svg)$/, use: 'file-loader?name=fonts/[name].[ext]' }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.json'],
                alias: { 
                    'styles':   path.resolve(__dirname, '../../lib/scss'),
                    'settings': path.resolve(__dirname, '../../settings.json') 
                }
            },
            output: {
                path: path.resolve(__dirname, '../../' + this.settings.outputDir),
                filename: `${this.settings.jsDir}[name]${minified ? '.min' : ''}.js`,
                chunkFilename: `${this.settings.jsDir}[name]${minified ? '.min' : ''}.js`,
                //chunkFilename: '[name][ext]',
                jsonpFunction: '___nfg'
            },
            plugins: [
                new Webpack2Polyfill(),
                new ExtractTextPlugin({
                    filename: `[name]${minified ? '.min' : ''}.css`,
                    disable: false,
                    allChunks: true 
                })
            ]
        };

        let subFolders = this.getInputSubFolders();

        utils.foreach(subFolders, file => {
            config.resolve.alias[file] = path.resolve(__dirname, '../../' + this.settings.inputDir + file);
        });

        utils.foreach(this.settings.inputFiles, file => {
            config.entry[file] = `${this.settings.inputDir}${file}`;
        });

        if (minified) {
            config.plugins.push(new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compressor: { warnings: false }
            }))

            // if (unminified) {
            //     config.plugins.push(new UnminifiedPlugin());
            // }

            config.plugins.push(new webpack.DefinePlugin({
                "process.env": { 
                    NODE_ENV: JSON.stringify("production") 
                }
            }));
        }

        return config;
    },

    getConfigs ({ unminified, minified }) {
        let configs = [];

        if (unminified)              configs.push(this.getConfig(false));
        if (minified || !unminified) configs.push(this.getConfig(true));

        return configs;
    },

    run ({ minified, unminified, watch }, callback) {

        // process.traceDeprecation = true;

        console.log('Compiling js');

        // let config   = this.getConfig({ minified, unminified });
        // let compiler = webpack(config)
        let configs = this.getConfigs({ minified, unminified });
        let compiler = webpack(configs);
        let cbFunc   = (err, stats) => { 

            console.log(stats.toString({ colors: true }) + "\n");

            if (err) { return console.error('Error building js', err); }

            if (utils.isFunc(callback)) { callback(); }
        };

        return watch 
             ? compiler.watch({ aggregateTimeout: 300 }, cbFunc)
             : compiler.run(cbFunc);
    }
};