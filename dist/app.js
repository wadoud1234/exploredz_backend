"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_config_1 = require("./config/db.config");
// import { errorHandler } from "./middlewares/error-handler";
dotenv_1.default.config();
async function startServer() {
    await db_config_1.prisma.$connect();
    const app = (0, express_1.default)();
    // app.use(errorHandler);
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: ["*", "https://exploredz-ui.vercel.app"],
        credentials: true
    }));
    app.use('/api', routers_1.default);
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`APPLICATION STARTED AT http://localhost:${PORT}`);
    });
}
startServer();
