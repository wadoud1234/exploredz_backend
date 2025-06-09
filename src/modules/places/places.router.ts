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
        return next(error)
    }
    res.status(200).json({ success: true, data: places })
});
placesRouter.post("/", isAdmin, (req, res) => { });
placesRouter.get("/:id", (req, res) => { });
placesRouter.patch("/:id", isAdmin, (req, res) => { });
placesRouter.delete("/:id", isAdmin, (req, res) => { });
placesRouter.get("/search", (req, res) => { });
placesRouter.get("/wilaya/:w", (req, res) => { });


export default placesRouter;