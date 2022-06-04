"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { validateSignIn, validateSignUp } from "../middleware/validate-auth";
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post("/signup", user_1.default.signup);
router.post("/login", user_1.default.login);
exports.default = router;
