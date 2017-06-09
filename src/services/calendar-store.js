const 
    settings  = require('helpers/settings'),
    http      = require('helpers/http'),
    constants = require('helpers/constants'),
    utils     = require('helpers/utils');

let storage = {};

const store = {
    get(datekey) {

        if (!datekey) datekey = new Date().getDateKey();

        let day = storage[datekey];

        if (day && new Date() - day.retrieved > constants.storageExpiration) { 

            return storage[datekey] = day = null;
        }

        return day;
    },

    save(schedule) {
        utils.foreach((schedule || {}).days, day => {
            if (!(day instanceof Object)) return;

            storage[day.date] = {
                datekey:   day.date,
                events:    day.items,
                retrieved: day.retrieved ? new Date(day.retrieved) : new Date()
            };
        });
    }
};

const service = module.exports = {
    fetch(datekey) {
        return new Promise(function(resolve, reject) {
            try {
                let day = store.get(datekey);

                if (day) return resolve(day);

                http.get(settings.api.calendarDay, { datekey: datekey })
                    .then(function (data) {
                        store.save(data);

                        resolve(store.get(datekey));
                    })
                    .catch(function () { reject(); });
            }
            catch (ex) { reject(ex); }
        });
    }
};