// | Method | Route | Description |
// | ------ | ----------------------- | ------------------------------------ |
// | POST | `/api/ratings/:placeId` | Add / update user’s rating for a place |
// | GET | `/api/ratings/:placeId` | Get average rating + count |
// | GET | `/api/ratings` | List all ratings by current user |

import { Router } from "express";
import { isAuthenticated } from "../auth/middlewares/auth.middleware";

const ratingsRouter = Router();

ratingsRouter.post("/:placeId", isAuthenticated, (req, res) => { });
ratingsRouter.get("/:placeId", isAuthenticated, (req, res) => { });
ratingsRouter.get("/", (req, res) => { });

export default ratingsRouter;