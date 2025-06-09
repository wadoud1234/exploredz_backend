"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesService = void 0;
const db_config_1 = require("../../config/db.config");
const t = db_config_1.prisma.place.findMany({});
class PlacesService {
    static async createPlace(data) {
        return db_config_1.prisma.place.create({ data });
    }
    static async getAllPlaces() {
        return db_config_1.prisma.place.findMany({
            include: {
                ratings: true,
                favorites: true,
                createdBy: { select: { id: true, email: true } },
            },
        });
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
    static async getPlacesByWilaya(wilaya) {
        return db_config_1.prisma.place.findMany({ where: { wilayaCode: wilaya } });
    }
}
exports.PlacesService = PlacesService;
