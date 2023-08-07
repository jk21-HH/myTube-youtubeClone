import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/users.js";
import commentRoute from "./routes/users.js";

const app = express();

// Midellwares

app.use(express.json()); // allow json from body
app.use(cookieParser()); // allow usage of cookies

// Routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/vidoes", videoRoute);
app.use("/api/v1/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Error";
  console.log("message", message, status);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

export default app;
