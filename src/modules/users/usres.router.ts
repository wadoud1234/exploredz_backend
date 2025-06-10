import { Router } from "express";
import { TryCatch } from "../../helpers/try-catch.helper";
import { UsersService } from "./users.service";
import { Role } from "@prisma/client";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
    const { data: users, error } = await TryCatch(() => UsersService.getUsers())
    if (error) {
        res.status(500).json({ success: false, error });
        return;
    }
    res.status(200).json({ success: true, data: users })
    return;
})

usersRouter.get("/:id", async (req, res) => {
    const { data: user, error } = await TryCatch(() => UsersService.getUserById(req.params.id))
    if (error) {
        res.status(500).json({ success: false, error })
        return
    }
    res.status(200).json({ success: true, data: user })
})

export default usersRouter