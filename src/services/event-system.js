const events  = require('events'),
      emitter = new events.EventEmitter();

// TODO: what happens if events aren't available?

class Emitter {
    constructor(name) {
        this.name = name;
        this.emit = this.emit.bind(this);
    }

    emit() {
        emitter.emit.apply(emitter, [this.name].concat([].slice.call(arguments)));
        return this;
    }

    subscribe(listener) {
        // TODO: ensure listener is not already in the list of listeners
        emitter.addListener(this.name, listener);
        return this;
    }

    unsubscribe(listener) {
        emitter.removeListener(this.name, listener);
        return this;
    }
}

const system = module.exports = {
    commands: {
        closeMenu: new Emitter('closemenu'),
         openMenu: new Emitter('openmenu'),
         redirect: new Emitter('redirect')
    },

    events: {

    }
};