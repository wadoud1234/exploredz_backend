"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagekit_1 = __importDefault(require("imagekit"));
const imagesRouter = (0, express_1.Router)();
// express/server.js or routes/imagekit.js
// import ImageKit from 'imagekit';
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
imagesRouter.get('/', (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    console.log({ ...result, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
    res.json({ ...result, publicKey: process.env.IMAGEKIT_PUBLIC_KEY }); // { signature, expire, token }
});
exports.default = imagesRouter;
