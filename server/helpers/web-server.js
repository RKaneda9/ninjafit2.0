let fs = require('fs'),
    ws = require("local-web-server");

module.exports = {
    start: function (port, config) {

        try {
            ws(config).listen(port);
            console.log(`Started web server on port: ${port}`);
        }
        catch (ex) { 
            console.log('Could not start web server: ', ex.message);
        }
    }
};