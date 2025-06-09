import Express from "express"
import indexRouter from "./routers";

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import { prisma } from "./config/db.config";
// import { errorHandler } from "./middlewares/error-handler";

dotenv.config();
async function startServer() {
    await prisma.$connect();
    const app = Express();

    // app.use(errorHandler);
    app.use(cookieParser());

    app.use(helmet());
    app.use(morgan('dev'));
    app.use(Express.json({ limit: '10mb' }));
    app.use(Express.urlencoded({ extended: true }));
    app.use(cors({
        origin: ["*", "https://exploredz-ui.vercel.app"],
        credentials: true
    }));
    app.use('/api', indexRouter);

    const PORT = 4000;

    app.listen(PORT, () => {
        console.log(`APPLICATION STARTED AT http://localhost:${PORT}`)
    });
}
startServer()