"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usres_router_1 = __importDefault(require("./modules/users/usres.router"));
const places_router_1 = __importDefault(require("./modules/places/places.router"));
const favorites_router_1 = __importDefault(require("./modules/favorites/favorites.router"));
const ratings_router_1 = __importDefault(require("./modules/ratings/ratings.router"));
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const db_config_1 = require("./config/db.config");
const stats_router_1 = __importDefault(require("./modules/stats/stats.router"));
const images_router_1 = __importDefault(require("./modules/images/images.router"));
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", async (req, res) => {
    console.log("USERS", await db_config_1.prisma.user.findMany());
    res.status(200).json({ message: "Hello World!" });
});
indexRouter
    .use("/images", images_router_1.default)
    .use("/stats", stats_router_1.default)
    .use("/auth", auth_router_1.default)
    .use('/users', usres_router_1.default)
    .use('/places', places_router_1.default)
    // .use('/wilayas', wilayaRoutes)
    .use('/favorites', favorites_router_1.default)
    .use('/ratings', ratings_router_1.default);
exports.default = indexRouter;
