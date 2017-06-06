const utils = require('helpers/utils');
const http  = module.exports = {
    request(url, method, data, type) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();

            xhr.open(method.toUpperCase(), url, true);
            xhr.setRequestHeader("Accept", "*/*");

            if (type) xhr.setRequestHeader("Content-Type", type);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                        try {
                            let response = JSON.parse(xhr.response || xhr.responseText);

                            return resolve(response);
                        }
                        catch (ex) {
                            // TODO: log error
                            return reject(ex);
                        }
                    }
                    else return reject(xhr.statusText || xhr.responseText);
                }
            };

            xhr.send(data);
        });
    },

    get(url, data) {

        if (data) { url = url + http.toQueryString(data); }

        return http.request(url, "get", null);//, 'application/json;charset=UTF-8');
    },

    post(url, data) { 

        return http.request(url, 'post', JSON.stringify(data), 'application/json;charset=UTF-8');
    },

    toQueryString(obj) {
        if (!obj) return '';

        let keys = Object.keys(obj);

        if (!keys.length) return "";

        return '?' + utils.map(keys, function (key) { 
            return key + '=' + (obj[key] == null ? "" : obj[key]); 
        }).join('&');
    }
};