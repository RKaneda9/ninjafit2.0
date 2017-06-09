const 
    settings  = require('helpers/settings'),
    http      = require('helpers/http'),
    constants = require('helpers/constants');

const service = module.exports = {
    send(message) {
        return new Promise(function (resolve, reject) {
            try {
                http.post(settings.api.sendMessage, message)
                    .then(function (res) {
                        if (!res || !(res instanceof Object)) {
                            console.error('Unknown response for send message.', res);
                            res = {};
                        }

                        if (res.isValid) resolve();

                        reject(res);
                    })
                    .catch(function () { reject({}); });
            }
            catch (ex) { reject(ex); }
        });
    }
}