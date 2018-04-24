class Rooms {
    constructor () {
        this.rooms = [];
        this.rooms.push(new Room(1));
        this.lastRoomNumber = 2;
    }

    addRoom() {
        this.rooms.push(new Room(this.lastRoomNumber++));
    }

    getRooms() {
        return JSON.stringify(this.rooms);
    }
}

class Room {
    constructor(number) {
        this.name = `room${number}`;
    }
}

module.exports = Rooms;
