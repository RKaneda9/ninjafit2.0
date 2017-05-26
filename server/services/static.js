let pug   = require('pug'),
    fs    = require('fs'),
    Timer = require('../helpers/timer'),
    utils = require('../helpers/utils');

let service = module.exports = {
    init (settings) { 
        if (!settings.hasOwnProperty("static")) return console.log('settings file does not contain a section for "static". skipping...'); 

        let error = msg => { throw `/services/static init() error. ${msg}. Please see readme for how to setup /server/settings.json` };

        if (!utils.isArray(settings.static)) error('"settings.static" is required as an array');

        utils.foreach(settings.static, (props, i) => {

            if (!utils.isObj   (props))           error(`"settings.static[${i}]" is not an object`);
            if (!utils.isString(props.outputdir)) error(`"settings.static[${i}].outputdir" is required as a string`);
            if (!utils.isString(props.inputdir))  error(`"settings.static[${i}].inputdir" is required as a string`);
        }));

        // TODO:
    },

    build ({ minified, unminified }) {

        
    },

    run ({ minified, unminified, watch }) {

        
    }
};

//service.init(require('../settings.json'));