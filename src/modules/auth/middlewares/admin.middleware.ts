// src/middlewares/admin.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    const user = (req as any).user;
    if (user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
