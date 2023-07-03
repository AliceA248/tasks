"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    console.error(err);
    res.status(500).send("Internal Server Error");
};
exports.errorHandler = errorHandler;
