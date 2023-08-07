import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).json({
      status: "success",
      message: "User has been created succefully",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return next(createError(404, "User Not Found!"));
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return next(createError(400, "Wrong Credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...userDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        message: "User has signed in succefully",
        user: userDetails,
      });
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res) => {
  try {
  } catch (err) {}
};
