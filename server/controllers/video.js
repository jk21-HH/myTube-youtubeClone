import User from "../models/User.js";
import Video from "../models/Video.js";

import { createError } from "../error";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();

    res(200).json({
      status: "success",
      messasge: "Video added successfuly",
      video: savedVideo,
    });
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found"));
    }

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res(200).json({
        status: "success",
        messasge: "Video updated successfuly",
        video: updatedVideo,
      });
    } else {
      return next(createError(403, "You can update only your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found"));
    }

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);

      res(200).json({
        status: "success",
        messasge: "Video deleted successfuly",
      });
    } else {
      return next(createError(403, "You can delete only your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: video,
    });
  } catch (err) {
    next(err);
  }
};
