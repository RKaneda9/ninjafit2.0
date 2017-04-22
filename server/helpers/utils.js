let fs    = require('fs');
let utils = module.exports = {

    isObj:    val => val && typeof val == 'object' && !(val instanceof Array),
    isArray:  val => val && typeof val == 'object' && val instanceof Array,
    isString: val => typeof val == 'string',
    isFunc:   val => typeof val == 'function',

    ensureDir: path => {

        if (!utils.isString(path)) { 
            path = ""; 
        }

        if (!path.length || path[path.length - 1] == '/') { 
            return path; 
        }

        return `${path}/`;
    },

    appendVersion: (fileName, version) => {
        return fileName + '?v=' + version;
    },

    createFolder: (path) => {
        if (!fs.existsSync(path)) {

            console.log('Creating folder: ', path);

            let pieces   = path.split('/');
            let location = "";

            utils.foreach(pieces, function (piece) {

                // if piece is empty, we've reached the end of the path
                // return early and break out of loop
                if (!piece) { return false; }

                location += location ? `/${piece}` : piece;

                if (!fs.existsSync(location)) {
                    fs.mkdirSync(location); 
                }
            });
        }
    },

    deleteFile: name => {
        if (fs.existsSync(name)) {
            fs.unlinkSync(name);
        }
    },

    removeFolder: (path) => {

        if (fs.existsSync(path)) {

            console.log('Removing folder: ', path);

            fs.readdirSync(path).forEach(function (file,index) {
                let curPath = path + "/" + file;

                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    utils.removeFolder(curPath);
                } 
                else { // delete file
                    fs.unlinkSync(curPath);
                }

            });

            fs.rmdirSync(path);
        }
        else {
            console.log("DIRECTORY DOES NOT EXIST: " + path);
        }
    },

    foreach: (array, callback) => {

        if (typeof array != 'object') { return; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        }
    },

    first: (array, func, defVal) => {

        if (typeof array != 'object') { return defVal; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map: (array, func) => {

        if (typeof array != 'object') { return []; }

        var mapped, keys, val;

        mapped = [];
        keys   = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var val = func(array[keys[i]], i, keys[i]);
            if (val) { mapped.push(val); }
        }

        return mapped;
    },

    mapObject: (obj, func) => {

        var mapped = {};

        if (typeof array != 'object') { return mapped; }

        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    }
};