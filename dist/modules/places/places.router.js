"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
placesRouter.post("/", async (req, res) => {
    console.log({ body: req.body });
    const { data: place, error } = await (0, try_catch_helper_1.TryCatch)(() => places_service_1.PlacesService.createPlace(req.body));
    if (error) {
        console.log({ creationError: error });
        res.status(500).json({ success: false, error: error });
        return;
    }
    res.status(201).json({ success: true, data: place });
});
placesRouter.get("/:id", async (req, res) => {
    const { data: place, error } = await (0, try_catch_helper_1.TryCatch)(() => places_service_1.PlacesService.getPlaceById(req.params.id));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: place });
});
placesRouter.put("/:id", async (req, res) => {
    console.log({ body: req.body });
    const { name, description, images, wilayaCode, createdById } = req.body;
    const { data: place, error } = await (0, try_catch_helper_1.TryCatch)(() => places_service_1.PlacesService.updatePlace({
        placeId: req.params.id,
        name,
        description,
        images,
        wilayaCode,
        createdById
    }));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: place });
});
placesRouter.delete("/:id", async (req, res) => {
    const { data: place, error } = await (0, try_catch_helper_1.TryCatch)(() => places_service_1.PlacesService.deletePlace(req.params.id));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: place });
});
placesRouter.get("/search", (req, res) => { });
placesRouter.get("/wilaya/:w", (req, res) => { });
exports.default = placesRouter;
