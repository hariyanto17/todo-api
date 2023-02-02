import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import verifyToken from "./middlewares/verifyToken";
import todoRouter from "./todo/router";
import userRouter from "./users/router";

dotenv.config();
const app = express();
// Server.applyMiddleware({app})
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/todos", verifyToken, todoRouter);

const port: number = 8000;
const url: string =
  process.env.CONNECTION_URL || "mongodb://localhost:27017/todo-test";

mongoose
  .set("strictQuery", false)
  .connect(url, {})
  .then(() => {
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((error) => console.log(error));
