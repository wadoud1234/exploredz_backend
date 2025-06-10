import { prisma } from "../../config/db.config";
const t = prisma.place.findMany({})
export class PlacesService {
    static async createPlace({ name, description, wilayaCode, images, createdById }: {
        name: string;
        description: string;
        wilayaCode: number;
        images?: string[];
        createdById: string;
    }) {
        console.log({ createdById })
        const user = await prisma.user.findUnique({ where: { id: createdById } });
        return prisma.place.create({
            data: {
                name,
                description,
                wilayaCode,
                images,
                createdBy: { connect: { id: user?.id, email: user?.email } }
            }
        });
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
    static async updatePlace({ placeId, name, description, wilayaCode, images, createdById }: {
        name: string;
        placeId: string
        description: string;
        wilayaCode: number;
        images?: string[];
        createdById: string;
    }) {
        return prisma.place.update({
            where: {
                id: placeId
            },
            data: {
                name,
                description,
                wilayaCode,
                images,
                createdBy: { connect: { id: createdById } }
            }
        })
    }
    static async getPlacesByWilaya(wilaya: number) {
        return prisma.place.findMany({ where: { wilayaCode: wilaya } });
    }
}
