import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw Error("Faild To Login");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw Error("Faild To Login");

    const accessToken = jwt.sign(
      { _id: user._id, email },
      process.env.ACCESS_TOKEN_SECRET || ""
    );
    return res.json({ user, accessToken });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error,
    });
  }
};

const signup = async (req: any, res: any) => {
  try {
    console.log("req.body", req.body);

    const { firstName, lastName, email, password, birthday, gender } = req.body;
    // const userExist = await User.findOne({ email });
    // if (userExist) return  res.status(400).json({
    //    message: 'User exist',

    // });
    const hash = await bcrypt.hash(password, 8);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: hash,
      birthday,
      gender,
    });

    const accessToken = jwt.sign(
      { id: user._id, email },
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    await user.save();

    return res.status(201).json({
      message: "User created",
      user,
      accessToken,
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      message: "Opration Faild",
      error,
    });
  }
};

export default { login, signup };
