"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const client_1 = require("@prisma/client");
const db_config_1 = require("../../config/db.config");
class StatsService {
    static async getStats() {
        const [usersStats, placesStats] = await Promise.all([
            StatsService.getUserStats(),
            StatsService.getPlacesStats()
        ]);
        return { users: usersStats, places: placesStats };
    }
    static async getUserStats() {
        return db_config_1.prisma.user.count({
            where: {
                role: client_1.Role.USER
            }
        });
    }
    static async getPlacesStats() {
        return db_config_1.prisma.place.count();
    }
}
exports.StatsService = StatsService;
