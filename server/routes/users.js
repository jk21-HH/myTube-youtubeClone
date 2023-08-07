import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";

import { verifyToken } from "./../verifyToken.js";

const router = express.Router();

// update user

router.put("/:id", verifyToken, updateUser);

// delete user

router.delete("/:id", deleteUser);

// get user

router.get("/find/:id", getUser);

// subscribe a user

router.put("/subscribe/:id", subscribe);

// unsubscribe a user

router.put("/unsubscribe/:id", unsubscribe);

// like a video

router.put("/like/:videoId", like);

// dislike video

router.put("/dislike/:videoId", dislike);

export default router;
