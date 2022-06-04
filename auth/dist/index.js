"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const port = process.env.PORT || 3000;
dotenv_1.default.config();
(0, mongoose_1.connect)(`mongodb+srv://nati:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.bfwtb.mongodb.net/?retryWrites=true&w=majority`);
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", user_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
