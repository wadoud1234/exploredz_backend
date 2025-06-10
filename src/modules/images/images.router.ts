import { Router } from "express";
import ImageKit from "imagekit"

const imagesRouter = Router()

// express/server.js or routes/imagekit.js

// import ImageKit from 'imagekit';
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

imagesRouter.get('/', (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    console.log({ ...result, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
    res.json({ ...result, publicKey: process.env.IMAGEKIT_PUBLIC_KEY }); // { signature, expire, token }
});

export default imagesRouter;
