let pug   = require('pug'),
    fs    = require('fs'),
    Timer = require('../helpers/timer'),
    utils = require('../helpers/utils');

let service = module.exports = {
    init (settings) { 
        let error = msg => { throw `/services/html init() error. ${msg}. Please see readme for how to setup /server/settings.json` };

        if (!utils.isObj   (settings))                 { error('No settings were passed in'); }
        if (!utils.isObj   (settings.html))            { error('"settings.html" is required'); }
        if (!utils.isString(settings.html.outputdir)) { error('"settings.html.outputdir" is required'); }
        if (!utils.isString(settings.html.inputdir))  { error('"settings.html.inputdir" is required'); }
        if (!utils.isString(settings.outputdir))     { error('"settings.outputdir" is required'); }

        // setup localsettings
        this.settings = {
            outputPath: `${utils.ensureDir(settings.outputdir)}${utils.ensureDir(settings.html.outputdir)}`,
            inputDir:   utils.ensureDir(settings.html.inputdir),
            inputFiles: this.getInputFilenames(settings.html.inputdir)
        }
    },

    getOutputFilename (filename, minified) {
        return `${this.settings.outputPath}${filename.split('.')[0]}${minified ? '' : '.unminified'}.html`;
    },

    getInputFilenames (path) {

        // only include file names that aren't scss partials
        return fs
            .readdirSync(path || this.settings.inputDir)
            .filter(file => file.length && file[0] != '_' && file.includes('.pug'));
    },

    build ({ minified, unminified }) {

        console.log('Compiling html files.');

        let results = null,
            data    = {},   // TODO: html input data
            timer   = Timer.startNew(),
            build, result;

        this.settings.inputFiles.forEach(file => {

            if (unminified) {

                data.minified = false;
                build         = pug.compileFile(`${this.settings.inputDir}${file}`, { pretty: true });
                result        = build(data);

                fs.writeFileSync(this.getOutputFilename(file, false), result);
            }

            if (minified) {

                data.minified = true;
                build         = pug.compileFile(`${this.settings.inputDir}${file}`);
                result        = build(data);

                fs.writeFileSync(this.getOutputFilename(file, true), result);
            }
        });

        console.log(`Finished compiling html files in ${timer.finish()} ms`);
    },

    run ({ minified, unminified, watch }) {

        let newInputFiles, name;

        this.build({ minified, unminified });

        if (watch) {

            // TODO: this only watches the current directory and not subfolders.
            fs.watch(this.settings.inputDir, (eventType, filename) => {

                console.log(`htmlService: Change noticed from file: ${filename}, eventType: ${eventType}`);

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