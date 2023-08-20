import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
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

router.put("/view/:id", updateVideo);

//

router.get("/trend", updateVideo);

//

router.get("/random", updateVideo);

//

router.get("/sub", updateVideo);

export default router;
