let webpack          = require('webpack'),
    path             = require('path'),
    utils            = require('../helpers/utils'),
    UnminifiedPlugin = require('unminified-webpack-plugin'),
    Webpack2Polyfill = require('webpack2-polyfill-plugin');

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
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.json'],
                alias: {
                    'components': path.resolve(__dirname, '../../src/components'),
                    'containers': path.resolve(__dirname, '../../src/containers'),
                    'helpers':    path.resolve(__dirname, '../../src/helpers'),
                    'pages':      path.resolve(__dirname, '../../src/pages'),
                    'services':   path.resolve(__dirname, '../../src/services'),
                    'support':    path.resolve(__dirname, '../../src/support'),
                    'settings':   path.resolve(__dirname, '../../settings.json')
                }
            },
            output: {
                path: path.resolve(__dirname, '../../' + this.settings.outputPath),
                filename: `[name]${minified ? '.min' : ''}.js`
            },
            plugins: [new Webpack2Polyfill()]
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