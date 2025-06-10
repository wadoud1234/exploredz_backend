import { Router } from "express";
import { isAdmin } from "../auth/middlewares/admin.middleware";
import { isAuthenticated } from "../auth/middlewares/auth.middleware";
import { TryCatch } from "../../helpers/try-catch.helper";
import { PlacesService } from "./places.service";

const placesRouter = Router();

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
    const { data: places, error } = await TryCatch(() => PlacesService.getAllPlaces())
    console.log({ places, error })
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: places })
});

placesRouter.post("/", async (req, res) => {
    console.log({ body: req.body })
    const { data: place, error } = await TryCatch(() => PlacesService.createPlace(req.body))
    if (error) {
        console.log({ creationError: error })
        res.status(500).json({ success: false, error: error })
        return
    }
    res.status(201).json({ success: true, data: place })
});
placesRouter.get("/:id", async (req, res) => {
    const { data: place, error } = await TryCatch(() => PlacesService.getPlaceById(req.params.id))
    if (error) {
        res.status(500).json({ success: false, error });
        return
    }
    res.status(200).json({ success: true, data: place })
});
placesRouter.put("/:id", async (req, res) => {
    console.log({ body: req.body })

    const { name, description, images, wilayaCode, createdById } = req.body
    const { data: place, error } = await TryCatch(() => PlacesService.updatePlace({
        placeId: req.params.id,
        name,
        description,
        images,
        wilayaCode,
        createdById
    }))
    if (error) {
        res.status(500).json({ success: false, error });
        return
    }
    res.status(200).json({ success: true, data: place })
});
placesRouter.delete("/:id", async (req, res) => {
    const { data: place, error } = await TryCatch(() => PlacesService.deletePlace(req.params.id))
    if (error) {
        res.status(500).json({ success: false, error });
        return
    }
    res.status(200).json({ success: true, data: place })
});
placesRouter.get("/search", (req, res) => { });
placesRouter.get("/wilaya/:w", (req, res) => { });


export default placesRouter;