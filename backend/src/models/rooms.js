class Rooms {
    constructor () {
        this.rooms = [];
        this.lastRoomNumber = 1;
    }

    addRoom() {
        const room = new Room(this.lastRoomNumber++);
        this.rooms.push(room);
        return room.name;
    }

    getRooms() {
        return this.rooms;
    }
}

class Room {
    constructor(number) {
        this.name = `room${number}`;
    }
}

module.exports = Rooms;
