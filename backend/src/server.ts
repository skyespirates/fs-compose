import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Task from "./models/Task.model";

const MONGO_URL = process.env.MONGO_URL as string;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const exisingTasks = await Task.find({});
    const task = await Task.create({
      title: "Task 1",
      description: "Description 1",
      completed: false,
    });
    const data = {
      message: "Hello World!",
      exisingTasks,
    };
    res.json(data);
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(3001, () => {
  console.log("Server 🚀 started on port 3001");
});
