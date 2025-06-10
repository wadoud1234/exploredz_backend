import { Router } from "express";
import { StatsService } from "./stats.service";
import { TryCatch } from "../../helpers/try-catch.helper";

const statsRouter = Router()

statsRouter.get("/", async (req, res, next) => {
    const { data: stats, error } = await TryCatch(() => StatsService.getStats())
    if (error) {
        res.status(500).json({ success: false, error });
    }
    res.status(200).json({ success: true, data: stats })
})

export default statsRouter