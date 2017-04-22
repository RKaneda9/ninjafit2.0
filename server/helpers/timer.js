class Timer {
    constructor() {

    }

    start() {
        this.date = new Date();
    }

    finish() {
        let diff  = new Date() - this.date;
        this.date = null;

        delete this.date;

        return diff;
    }

    static startNew() {
        let timer = new Timer();
        timer.start();
        return timer;
    }
}

module.exports = Timer;