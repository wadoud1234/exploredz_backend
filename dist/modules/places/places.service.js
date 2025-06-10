"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesService = void 0;
const db_config_1 = require("../../config/db.config");
const t = db_config_1.prisma.place.findMany({});
class PlacesService {
    static async createPlace({ name, description, wilayaCode, images, createdById }) {
        console.log({ createdById });
        const user = await db_config_1.prisma.user.findUnique({ where: { id: createdById } });
        return db_config_1.prisma.place.create({
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
        return db_config_1.prisma.place.findMany();
    }
    static async getPlaceById(placeId) {
        return db_config_1.prisma.place.findUnique({
            where: { id: placeId },
            include: {
                ratings: true,
                favorites: true,
                createdBy: true,
            },
        });
    }
    static async deletePlace(placeId) {
        return db_config_1.prisma.place.delete({ where: { id: placeId } });
    }
    static async updatePlace({ placeId, name, description, wilayaCode, images, createdById }) {
        return db_config_1.prisma.place.update({
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
        });
    }
    static async getPlacesByWilaya(wilaya) {
        return db_config_1.prisma.place.findMany({ where: { wilayaCode: wilaya } });
    }
}
exports.PlacesService = PlacesService;
