import { config } from '../config/config';

export class TransportService {
    static async getConfig() {
        return await fetch(config.configUrl);
    }

    static async getConstants() {
        return await fetch(config.constantsUrl);
    }

    static async getRooms() {
        return await fetch(config.roomsUrl);
    }

    static async addRoom() {
        return await fetch(config.roomsUrl, { method: 'POST' });
    }

    static async connectMobile(mobileCode) {
        return await fetch(`${config.roomsUrl}/mobile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobileCode })
        }).then((result) => result.json());
    }
}
