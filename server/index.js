let utils    = require('./helpers/utils'),
    server   = require('./helpers/web-server'),
    services = require('./services'),
    settings = require('./settings.json');

utils.foreach(services, service => service.init(settings));

let args = {
    watch: true,
    minified: true,
    unminified: true,
    start: true
};

// let callback = () => { 
//     if (args.start) { 
//         server.start(settings.port || 3500);
//     }
// };

// TODO: 
// 1. args.minified = args.minified || !args.unminified.
// 2. watch only includes the directory it's watching, not any sub directory
// 3. watch triggers on every save, need some kind of timeout.

utils.foreach(services, service => service.run(args));

if (args.start) { server.start(settings.port || 3500); }