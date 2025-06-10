"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const db_config_1 = require("../../config/db.config");
class UsersService {
    static async getUsers() {
        return db_config_1.prisma.user.findMany();
    }
    static async getUserById(id) {
        return db_config_1.prisma.user.findUnique({ where: { id } });
    }
}
exports.UsersService = UsersService;
