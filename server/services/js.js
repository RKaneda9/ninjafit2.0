let webpack          = require('webpack'),
    path             = require('path'),
    utils            = require('../helpers/utils'),
    UnminifiedPlugin = require('unminified-webpack-plugin');

let service = module.exports = {
    init (settings) {
        let error = msg => { throw `/services/js init() error. ${msg}. Please see readme for how to setup /server/settings.json` };

        if (!utils.isObj   (settings))               { error('No settings were passed in'); }
        if (!utils.isObj   (settings.js))            { error('"settings.js" is required'); }
        if (!utils.isString(settings.outputdir))     { error('"settings.outputdir" is required'); }
        if (!utils.isString(settings.js.outputdir))  { error('"settings.js.outputdir" is required'); }
        if (!utils.isString(settings.js.inputdir))   { error('"settings.js.inputdir" is required'); }
        if (!utils.isArray (settings.js.inputfiles)) { error('"settings.js.inputfiles" is required'); }

        // setup local settings
        this.settings = {
            outputPath: `${utils.ensureDir(settings.outputdir)}${utils.ensureDir(settings.js.outputdir)}`,
            inputDir:   utils.ensureDir(settings.js.inputdir),
            inputFiles: settings.js.inputfiles
        };

        // create output folder
        utils.createFolder(this.settings.outputPath);
    },

    getConfig ({ minified, unminified }) {
        let config = {
            entry: {},
            module: {
                loaders: [
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.js$/,
                        exclude: ["node_modules", "server"],
                        loader: 'babel-loader'
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx', '.json'],
                alias: {}
            },
            output: {
                path: this.settings.outputPath,
                filename: `[name]${minified ? '.min' : ''}.js`
            },
            plugins: []
        };

        utils.foreach(this.settings.inputFiles, file => {
            config.entry[file] = `${this.settings.inputDir}${file}`;
        });

        if (minified) {
            config.plugins.push(new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compressor: { warnings: false }
            }))

            if (unminified) {
                config.plugins.push(new UnminifiedPlugin());
            }

            config.plugins.push(new webpack.DefinePlugin({
                "process.env": { 
                    NODE_ENV: JSON.stringify("production") 
                }
            }));
        }

        return config;
    },

    run ({ minified, unminified, watch }, callback) {

        console.log('Compiling js');

        let config   = this.getConfig({ minified, unminified });
        let compiler = webpack(config)
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