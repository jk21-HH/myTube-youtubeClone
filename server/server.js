import mongoose from "mongoose";
import dotevn from "dotenv";

dotevn.config({ path: "./config.env" });

import app from "./app.js";

const LOCAL_DB = process.env.DATABASE_LOCAL;

const connect = () => {
  mongoose
    .connect(LOCAL_DB)
    .then(() => {
      console.log("DB connection succesful");
    })
    .catch((err) => {
      throw err;
    });
};

const port = process.env.PORT || 8800;

app.listen(port, () => {
  connect();
  console.log(`Connected on port ${port}`);
});
