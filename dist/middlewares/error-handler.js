"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, _next) {
    // console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        error: err.message || 'Something went wrong',
    });
}
