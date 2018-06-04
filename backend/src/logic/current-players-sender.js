const constants = require('../config/constants');

class CurrentPlayersSender {
    constructor() {
        this.handlers = [];
        this.intervalIsSet = false;
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    startSending(io) {
        if (!this.intervalIsSet) {
            setInterval(() => {
                const playersPerRoom = this.handlers
                    .map(h => {
                        return {
                            room: h.room.name,
                            players: h.connections.length
                        };
                    });
                io.emit(constants.socketCurrentOnlinePlayers, JSON.stringify(playersPerRoom));
            }, 500);
            this.intervalIsSet = true;
        }
    }
}

module.exports = CurrentPlayersSender;
