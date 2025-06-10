import { Role } from "@prisma/client";
import { prisma } from "../../config/db.config";

export class StatsService {
    static async getStats() {
        const [usersStats, placesStats] = await Promise.all([
            StatsService.getUserStats(),
            StatsService.getPlacesStats()
        ])
        return { users: usersStats, places: placesStats }
    }
    static async getUserStats() {
        return prisma.user.count({
            where: {
                role: Role.USER
            }
        })
    }
    static async getPlacesStats() {
        return prisma.place.count()
    }
}