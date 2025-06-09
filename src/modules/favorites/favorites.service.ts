import { prisma } from "../../config/db.config";

export class FavoritesService {
    static async addToFavorites(userId: string, placeId: string) {
        return prisma.favorite.create({
            data: { userId, placeId },
        });
    }

    static async removeFromFavorites(userId: string, placeId: string) {
        return prisma.favorite.deleteMany({
            where: { userId, placeId },
        });
    }

    static async getUserFavorites(userId: string) {
        return prisma.favorite.findMany({
            where: { userId },
            include: {
                place: true,
            },
        });
    }

    static async isPlaceFavorited(userId: string, placeId: string) {
        const fav = await prisma.favorite.findFirst({
            where: { userId, placeId },
        });
        return !!fav;
    }
}
