"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const db_config_1 = require("../../config/db.config");
class FavoritesService {
    static async addToFavorites(userId, placeId) {
        return db_config_1.prisma.favorite.create({
            data: { userId, placeId },
        });
    }
    static async removeFromFavorites(userId, placeId) {
        return db_config_1.prisma.favorite.deleteMany({
            where: { userId, placeId },
        });
    }
    static async getUserFavorites(userId) {
        return db_config_1.prisma.favorite.findMany({
            where: { userId },
            include: {
                place: true,
            },
        });
    }
    static async isPlaceFavorited(userId, placeId) {
        const fav = await db_config_1.prisma.favorite.findFirst({
            where: { userId, placeId },
        });
        return !!fav;
    }
}
exports.FavoritesService = FavoritesService;
