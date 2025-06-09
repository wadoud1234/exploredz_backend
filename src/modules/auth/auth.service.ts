import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/db.config';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    static async register(
        name: string,
        email: string,
        password: string
    ) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.USER, // default role
            },
        });

        return user;
    }

    static async login(
        email: string,
        password: string
    ) {
        const user = await prisma.user.findUnique({ where: { email } });
        console.log({ user })
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
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

    static async adminLogin(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
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
    static async getCurrentUser(token: string) {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
        const user = await prisma.user.findUnique({ where: { id: payload.userId } });
        return user
    }
}