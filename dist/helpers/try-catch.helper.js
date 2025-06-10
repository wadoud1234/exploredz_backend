"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = TryCatch;
async function TryCatch(fn) {
    try {
        const data = await fn();
        return { data, error: null };
    }
    catch (error) {
        if (error instanceof Error)
            return { data: null, error: error.message };
        return { data: null, error: 'Something went wrong' };
    }
}
