import { createError } from "./../error.js";

import Comment from "./../models/Comment.js";
import Video from "./../models/Video.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });

    res.status(200).json({
      status: "success",
      comments,
    });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();

    res.status(200).json({
      status: "success",
      comment: savedComment,
      message: "Comment is posted successfuly",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);

    if (req.user.id === comment.user.id || req.user.id === video.user.id) {
      await Comment.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "success",
        message: "Comment is deleted successfuly",
      });
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (err) {
    next(err);
  }
};
