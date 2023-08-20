import User from "./../models/User.js";

import { createError } from "../error.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        messasge: "User updated successfuly",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "success",
        messasge: "User has benn deleted successfuly",
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findById(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json({
      status: "success",
      message: "Subscription is successful",
    });
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findById(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json({
      status: "success",
      message: "Unsubscription is successful",
    });
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
