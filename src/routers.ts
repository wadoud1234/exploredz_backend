import { Router } from "express";
import usersRouter from "./modules/users/usres.router";
import placesRouter from "./modules/places/places.router";
import favoritesRouter from "./modules/favorites/favorites.router";
import ratingsRouter from "./modules/ratings/ratings.router";
import authRouter from "./modules/auth/auth.router";
import { prisma } from "./config/db.config";

const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
    console.log("USERS", await prisma.user.findMany())
    res.status(200).json({ message: "Hello World!" })
});

indexRouter
    .use("/auth", authRouter)
    .use('/users', usersRouter)
    .use('/places', placesRouter)
    // .use('/wilayas', wilayaRoutes)
    .use('/favorites', favoritesRouter)
    .use('/ratings', ratingsRouter);

export default indexRouter;