"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("./auth.service");
const try_catch_helper_1 = require("../../helpers/try-catch.helper");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;
    const { data: user, error } = await (0, try_catch_helper_1.TryCatch)(() => auth_service_1.AuthService.register(name, email, password));
    if (error) {
        res.status(400).json({ success: false, error });
        return;
    }
    res.status(201).json({ success: true, message: 'User created', data: user });
});
authRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const { data: result, error } = await (0, try_catch_helper_1.TryCatch)(() => auth_service_1.AuthService.login(email, password));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, message: "User logged in", data: result });
});
// src/routes/auth.routes.ts
authRouter.post('/admin/login', async (req, res, next) => {
    const { email, password } = req.body;
    const { data: result, error } = await (0, try_catch_helper_1.TryCatch)(() => auth_service_1.AuthService.adminLogin(email, password));
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: result, message: "Admin logged in" });
});
authRouter.get("/me", async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    console.log({ token });
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { data, error } = await (0, try_catch_helper_1.TryCatch)(() => auth_service_1.AuthService.getCurrentUser(token));
    console.log({ data });
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data });
});
exports.default = authRouter;
