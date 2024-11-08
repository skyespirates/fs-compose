import express from "express";
import cors from "cors";
import Task from "./models/Task.model";
import { mongoClient, redisClient } from "./connection/";

mongoClient.connect();
redisClient.connect();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    // always retrieve from database
    const exisingTasks = await Task.find({});
    const data = {
      message: "Hello World!",
      exisingTasks,
    };
    res.json(data);
  } catch (error) {
    console.log("Error during getting tasks", error);
  }
});

app.get("/add-task", async (req, res) => {
  const random = Math.round(Math.random() * 100);
  const task = {
    title: `Task ${random}`,
    description: `Description ${random}`,
    completed: random % 2 === 0 ? true : false,
  };
  try {
    await Task.create(task);
    const existingTasks = await Task.find({});
    // update redis cache every time a new task is created
    redisClient.set("data", JSON.stringify(existingTasks));
    res.json(existingTasks);
  } catch (error) {
    console.log("Error during creating task", error);
  }
});

app.get("/cache", async (req, res) => {
  try {
    // get data from cache
    const cacheData = await redisClient.get("data");
    res.json(cacheData);
  } catch (error) {
    console.log("Error during getting cache", error);
  }
});

app.listen(3001, () => {
  console.log("Server 🚀 started on port 3001");
});
