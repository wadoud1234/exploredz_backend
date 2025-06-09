// | Method | Route                     | Description                 |
// | ------ | ------------------------- | --------------------------- |
// | POST   | `/api/favorites/:placeId` | Add place to favorites      |
// | DELETE | `/api/favorites/:placeId` | Remove place from favorites |
// | GET    | `/api/favorites`          | List user's favorite places |

import { Router } from "express";
import { isAuthenticated } from "../auth/middlewares/auth.middleware";

const favoritesRouter = Router();

favoritesRouter.post("/:placeId", isAuthenticated, (req, res) => { });
favoritesRouter.delete("/:placeId", isAuthenticated, (req, res) => { });
favoritesRouter.get("/", isAuthenticated, (req, res) => { });

export default favoritesRouter;