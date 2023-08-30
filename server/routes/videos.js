import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
} from "../controllers/video.js";

import { verifyToken } from "./../verifyToken.js";

const router = express.Router();

// create video

router.post("/", verifyToken, addVideo);

// update video

router.put("/:id", verifyToken, updateVideo);

// delete video

router.delete("/:id", verifyToken, deleteVideo);

// get video

router.get("/find/:id", getVideo);

//

router.put("/view/:id", addView);

// get the most viewed vidoes

router.get("/trend", trend);

// get random vidoes

router.get("/random", random);

// get vidoes from subscribed channel

router.get("/sub", verifyToken, sub);

router.get("/tags", getByTag);

router.get("/search", search);

export default router;
