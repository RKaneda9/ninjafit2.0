let sass  = require('node-sass'),
    fs    = require('fs'),
    utils = require('../helpers/utils'),
    Timer = require('../helpers/timer');

let service = module.exports = {
    init (settings) { 
        if (!settings.hasOwnProperty("css")) return console.log('settings file does not contain a section for "css". skipping...'); 
        
        let error = msg => { throw `/services/css init() error. ${msg}. Please see readme for how to setup /server/settings.json` };

        if (!utils.isObj   (settings.css))           error('"settings.css" is required as an object');
        if (!utils.isString(settings.css.outputdir)) error('"settings.css.outputdir" is required');
        if (!utils.isString(settings.css.inputdir))  error('"settings.css.inputdir" is required');
        if (!utils.isString(settings.outputdir))     error('"settings.outputdir" is required');

        let inputFiles = utils.map(settings.css.inputfiles, file => {
            if (!utils.isString(file)) return null;

            if (!file.includes('.scss')) file += '.scss';

            return file;
        });

        // setup local settings
        this.settings = {
            outputPath: `${utils.ensureDir(settings.outputdir)}${utils.ensureDir(settings.css.outputdir)}`,
            inputDir:   utils.ensureDir(settings.css.inputdir),
            inputFiles: inputFiles
        };

        // create output folder
        utils.createFolder(this.settings.outputPath);
    },

    getOutputFilename (filename, minified) {
        return `${this.settings.outputPath}${filename.split('.')[0]}${minified ? '.min' : ''}.css`;
    },

    getInputFilenames (path) {

        // only include file names that aren't scss partials
        return fs
            .readdirSync(path || this.settings.inputDir)
            .filter(file => file.length && file[0] != '_' && file.includes('.scss'));
    },

    build ({ minified, unminified }) {

        if (!this.settings) return;

        console.log('Compiling css.');

        let results = null, 
            timer   = Timer.startNew();
            
        try {
            this.settings.inputFiles.forEach(file => {

                if (unminified) {
                    
                    result = sass.renderSync({
                        file:        `${this.settings.inputDir}${file}`,
                        outFile:     this.settings.outputPath,
                        outputStyle: "nested",
                        sourceMap:   false
                    }, (error, result) => {
                        if (err) { console.log(err); }
                    });

                    fs.writeFileSync(this.getOutputFilename(file), result.css);
                }

                if (minified) {

                    result = sass.renderSync({
                        file:        `${this.settings.inputDir}${file}`,
                        outFile:     this.settings.outputPath,
                        outputStyle: "compressed",
                        sourceMap:   false
                    }, (error, result) => {
                        if (err) { console.log(err); }
                    });

                    fs.writeFileSync(this.getOutputFilename(file, true), result.css);
                }
            });

            console.log(`Finished compiling css in ${timer.finish()} ms`);
        }
        catch (ex) { console.error(ex); }
    },

    run ({ minified, unminified, watch }) { 

        if (!this.settings) return;

        let newInputFiles, name;

        this.build({ minified, unminified });

        if (watch) {

            fs.watch(this.settings.inputDir, { recursive: true, }, (eventType, filename) => {

                console.log(`Change noticed from file: ${filename}, eventType: ${eventType}`);

                switch (eventType) {
                    case 'rename':
                        newInputFiles = this.getInputFilenames();

                        // if a file was deleted
                        if (newInputFiles.length < this.settings.inputFiles.length) {

                            // finding the deleted file(s) and removing them from the output folder
                            this.settings.inputFiles
                                .filter (file => !newInputFiles.includes(file))
                                .forEach(file => {

                                    // deleting the compiles files in the output folder
                                    if (unminified) { utils.deleteFile(this.getOutputFilename(file, false)); }
                                    if (minified)   { utils.deleteFile(this.getOutputFilename(file,  true)); }
                                });
                        }

                        this.settings.inputFiles = newInputFiles;
                        // no break so that "rename" events build as well.

                    case 'change':
                        this.build({ minified, unminified });
                        break;
                }
            });
        }
    }
};

//service.init(require('../settings.json'));