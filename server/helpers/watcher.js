// TODO:

// let utils = require('./utils'),
//     fs    = require('fs');

// class Watcher {
//     constructor (params) {
//         if (!utils.isObj(params)) { params = {}; }

//         this.settings = {
//             timeout: params.timeout || 300
//         };

//         this.changedFiles = [];
//     }

//     trigger () {
//         if (this.timeoutId) { 

//             this.clearTimeout(this.timeoutId);
//             this.timeoutId = null;
//         }

//         this.callback(this.changedFiles);
//     }

//     watch (directory, callback) {

//     }

//     static watch() {
//         let directory = arguments[0];
//         let params    = utils.isObj(arguments[1]) ? arguments[1] : {};
//         let callback  = arguments[arguments.length - 1];

//         let instance = new Watcher(params);
//         instance.watch(directory, callback);
//         return instance;
//     }
// }

// module.exports = Watcher;