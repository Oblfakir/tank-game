class Rooms {
    constructor () {
        this.rooms = [];
        this.rooms.push(new Room(1));
        this.lastRoomNumber = 2;
    }

    addRoom(main) {
        const room = new Room(this.lastRoomNumber++, main);
        this.rooms.push(room);
        return room.name;
    }

    getRooms() {
        return this.rooms;
    }
}

class Room {
    constructor(number, main) {
        this.name = `room${number}`;
        this.main = main;
    }
}

module.exports = Rooms;
