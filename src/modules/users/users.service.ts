import { prisma } from "../../config/db.config";

export class UsersService {
    static async getUsers() {
        return prisma.user.findMany()
    }

    static async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } })
    }
}