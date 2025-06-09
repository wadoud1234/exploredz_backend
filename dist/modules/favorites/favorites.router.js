"use strict";
// | Method | Route                     | Description                 |
// | ------ | ------------------------- | --------------------------- |
// | POST   | `/api/favorites/:placeId` | Add place to favorites      |
// | DELETE | `/api/favorites/:placeId` | Remove place from favorites |
// | GET    | `/api/favorites`          | List user's favorite places |
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middlewares/auth.middleware");
const favoritesRouter = (0, express_1.Router)();
favoritesRouter.post("/:placeId", auth_middleware_1.isAuthenticated, (req, res) => { });
favoritesRouter.delete("/:placeId", auth_middleware_1.isAuthenticated, (req, res) => { });
favoritesRouter.get("/", auth_middleware_1.isAuthenticated, (req, res) => { });
exports.default = favoritesRouter;
