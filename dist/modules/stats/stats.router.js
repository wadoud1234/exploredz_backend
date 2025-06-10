"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_service_1 = require("./stats.service");
const try_catch_helper_1 = require("../../helpers/try-catch.helper");
const statsRouter = (0, express_1.Router)();
statsRouter.get("/", async (req, res, next) => {
    const { data: stats, error } = await (0, try_catch_helper_1.TryCatch)(() => stats_service_1.StatsService.getStats());
    if (error) {
        res.status(500).json({ success: false, error });
    }
    res.status(200).json({ success: true, data: stats });
});
exports.default = statsRouter;
