"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = require("../auth/middlewares/admin.middleware");
const try_catch_helper_1 = require("../../helpers/try-catch.helper");
const places_service_1 = require("./places.service");
const placesRouter = (0, express_1.Router)();
// | Method | Route                   | Description                       |
// | ------ | ----------------------- | --------------------------------- |
// | POST   | `/api/places`           | Create a new place (admin only)   |
// | GET    | `/api/places`           | List all places                   |
// | GET    | `/api/places/:id`       | Get place by ID                   |
// | PATCH  | `/api/places/:id`       | Update place (admin only)         |
// | DELETE | `/api/places/:id`       | Delete place (admin only)         |
// | GET    | `/api/places/search?q=` | Search places by name/description |
// | GET    | `/api/places/wilaya/:w` | Filter by wilaya                  |
placesRouter.get("/", async (req, res, next) => {
    const { data: places, error } = await (0, try_catch_helper_1.TryCatch)(() => places_service_1.PlacesService.getAllPlaces());
    console.log({ places, error });
    if (error) {
        return next(error);
    }
    res.status(200).json({ success: true, data: places });
});
placesRouter.post("/", admin_middleware_1.isAdmin, (req, res) => { });
placesRouter.get("/:id", (req, res) => { });
placesRouter.patch("/:id", admin_middleware_1.isAdmin, (req, res) => { });
placesRouter.delete("/:id", admin_middleware_1.isAdmin, (req, res) => { });
placesRouter.get("/search", (req, res) => { });
placesRouter.get("/wilaya/:w", (req, res) => { });
exports.default = placesRouter;
