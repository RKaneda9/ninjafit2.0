const 
    settings  = require('helpers/settings'),
    http      = require('helpers/http'),
    constants = require('helpers/constants');

let storage = {};

const store = {
    get(datekey) {

        if (!datekey) datekey = new Date().getDateKey();

        let wod = storage[datekey];

        if (wod && new Date() - wod.retrieved > constants.wodStorageExpiration) { 

            return storage[datekey] = wod = null;
        }

        return wod;
    },

    save(wod) {
        return (storage[wod.datekey] = {
            datekey:   wod.datekey,
            workouts:  wod.workouts,
            retreived: wod.retrieved ? new Date(wod.retrieved) : new Date()
        });
    }
};

const service = module.exports = {
    fetch(datekey) {
        return new Promise(function(resolve, reject) {
            try {
                let wod = store.get(datekey);

                if (wod) return resolve(wod);

                http.get(settings.api.getWod, { datekey: datekey })
                    .then(function (data) {
                        wod = store.save(data);

                        resolve(wod);
                    })
                    .catch(function () { reject(); });
            }
            catch (ex) { reject(ex); }
        });
    }
};