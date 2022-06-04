"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // return res.json("sucesss");
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user)
            throw Error("Faild To Login");
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw Error("Faild To Login");
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, email }, process.env.ACCESS_TOKEN_SECRET || "");
        return res.json({ user, accessToken });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            error,
        });
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req.body", req.body);
        const { firstName, lastName, email, password, birthday, gender } = req.body;
        // const userExist = await User.findOne({ email });
        // if (userExist) return  res.status(400).json({
        //    message: 'User exist',
        // });
        const hash = yield bcrypt_1.default.hash(password, 8);
        const user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            firstName,
            lastName,
            email,
            password: hash,
            birthday,
            gender,
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email }, process.env.ACCESS_TOKEN_SECRET || "");
        yield user.save();
        return res.status(201).json({
            message: "User created",
            user,
            accessToken,
        });
    }
    catch (error) {
        console.log({ error });
        res.status(400).json({
            message: "Opration Faild",
            error,
        });
    }
});
exports.default = { login, signup };
