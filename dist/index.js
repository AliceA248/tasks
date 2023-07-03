"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var task_controller_1 = require("controller/task.controller");
var task_middleware_1 = require("middleware/task.middleware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/tasks", task_controller_1.taskRouter);
app.use(task_middleware_1.errorHandler);
var PORT = 5000;
app.listen(PORT, function () {
    return console.log("Server is running on port ".concat(PORT));
});
