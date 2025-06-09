"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
exports.isAdmin = isAdmin;
