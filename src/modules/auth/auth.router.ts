import { Router } from 'express';
import { AuthService } from './auth.service';
import { TryCatch } from '../../helpers/try-catch.helper';

const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body
    const { data: user, error } = await TryCatch(() => AuthService.register(name, email, password));
    if (error) {
        res.status(400).json({ success: false, error: error.message });
        return
    }
    res.status(201).json({ success: true, message: 'User created', data: user });
});

authRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const { data: result, error } = await TryCatch(() => AuthService.login(email, password));
    if (error) {
        res.status(500).json({ success: false, error: error.message });
        return
    }

    res.status(200).json({ success: true, message: "User logged in", data: result });
});

// src/routes/auth.routes.ts
authRouter.post('/admin/login', async (req, res, next) => {
    const { email, password } = req.body;
    const { data: result, error } = await TryCatch(() => AuthService.adminLogin(email, password));
    if (error) {
        res.status(500).json({ success: false, error: error.message });
        return
    }

    res.status(200).json({ success: true, data: result, message: "Admin logged in" });
});

authRouter.get("/me", async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1];
    console.log({ token })
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { data, error } = await TryCatch(() => AuthService.getCurrentUser(token));
    console.log({ data })
    if (error) {
        res.status(500).json({ success: false, error: error.message });
        return
    }
    res.status(200).json({ success: true, data });
})

export default authRouter;