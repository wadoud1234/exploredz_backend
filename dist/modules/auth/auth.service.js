"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = require("../../config/db.config");
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
class AuthService {
    static async register(name, email, password) {
        const existingUser = await db_config_1.prisma.user.findUnique({ where: { email } });
        if (existingUser)
            throw new Error('User already exists');
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_config_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: client_1.Role.USER, // default role
            },
        });
        return user;
    }
    static async login(email, password) {
        const user = await db_config_1.prisma.user.findUnique({ where: { email } });
        console.log({ user });
        if (!user)
            throw new Error('Invalid credentials');
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '7d',
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
    static async adminLogin(email, password) {
        const user = await db_config_1.prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== 'ADMIN')
            throw new Error('Unauthorized');
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '7d',
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
    static async getCurrentUser(token) {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await db_config_1.prisma.user.findUnique({ where: { id: payload.userId } });
        return user;
    }
}
exports.AuthService = AuthService;
