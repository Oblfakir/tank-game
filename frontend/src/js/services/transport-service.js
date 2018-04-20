import { config } from '../config/config';

export class TransportService {
    static async getConfig() {
        if (!TransportService.config) {
            TransportService.config = await fetch(config.configUrl);
        }
        return TransportService.config;
    }

    static async getConstants() {
        if (!TransportService.constants) {
            TransportService.constants = await fetch(config.constantsUrl);
        }
        return TransportService.constants;
    }
}
