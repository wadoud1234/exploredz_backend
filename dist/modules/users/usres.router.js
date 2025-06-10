"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const try_catch_helper_1 = require("../../helpers/try-catch.helper");
const users_service_1 = require("./users.service");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", async (req, res, next) => {
    const { data: users, error } = await (0, try_catch_helper_1.TryCatch)(() => users_service_1.UsersService.getUsers());
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: users });
    return;
});
usersRouter.get("/:id", async (req, res) => {
    const { data: user, error } = await (0, try_catch_helper_1.TryCatch)(() => users_service_1.UsersService.getUserById(req.params.id));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: user });
});
exports.default = usersRouter;
