import { prisma } from "../../config/db.config";
const t = prisma.place.findMany({})
export class PlacesService {
    static async createPlace(data: {
        name: string;
        description: string;
        wilayaCode: number;
        images?: string[];
        createdById: string;
    }) {
        return prisma.place.create({ data });
    }

    static async getAllPlaces() {
        return prisma.place.findMany({
            include: {
                ratings: true,
                favorites: true,
                createdBy: { select: { id: true, email: true } },
            },
        });
    }

    static async getPlaceById(placeId: string) {
        return prisma.place.findUnique({
            where: { id: placeId },
            include: {
                ratings: true,
                favorites: true,
                createdBy: true,
            },
        });
    }

    static async deletePlace(placeId: string) {
        return prisma.place.delete({ where: { id: placeId } });
    }

    static async getPlacesByWilaya(wilaya: number) {
        return prisma.place.findMany({ where: { wilayaCode: wilaya } });
    }
}
