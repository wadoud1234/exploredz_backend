"use strict";
// | Method | Route | Description |
// | ------ | ----------------------- | ------------------------------------ |
// | POST | `/api/ratings/:placeId` | Add / update user’s rating for a place |
// | GET | `/api/ratings/:placeId` | Get average rating + count |
// | GET | `/api/ratings` | List all ratings by current user |
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middlewares/auth.middleware");
const ratingsRouter = (0, express_1.Router)();
ratingsRouter.post("/:placeId", auth_middleware_1.isAuthenticated, (req, res) => { });
ratingsRouter.get("/:placeId", auth_middleware_1.isAuthenticated, (req, res) => { });
ratingsRouter.get("/", (req, res) => { });
exports.default = ratingsRouter;
