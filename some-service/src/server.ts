import express from "express";
import cors from "cors";
import { mysqlClient, redisClient } from "./connection/";

mysqlClient.connect();
redisClient.connect();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const [tasks] = await mysqlClient.conn.query("select * from tasks");
    const data = {
      message: "Hello World!",
      existingTasks: tasks,
    };

    res.json(data);
  } catch (error) {
    console.log("Error get task", error);
  }
});

app.get("/add-task", async (req, res) => {
  const random = Math.round(Math.random() * 100);
  const isCompleted = random % 2 === 0;
  const task = [`Task ${random}`, "Description " + random, isCompleted];
  const sql = `INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)`;
  const tasks = "select * from tasks";
  try {
    await mysqlClient.conn.execute(sql, task);
    const [result] = await mysqlClient.conn.query(tasks);
    redisClient.set("sekuel", JSON.stringify(result));
    res.json(result);
  } catch (error) {
    console.log("Error create task", error);
  }
});

app.get("/cache", async (req, res) => {
  try {
    const cacheData = await redisClient.get("sekuel");
    res.json(cacheData);
  } catch (error) {
    console.log("Error in cache", error);
  }
});

app.get("/initialize", async (req, res) => {
  const taskTable = `
  CREATE TABLE tasks (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    completed tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
)`;
  const sql =
    "INSERT INTO tasks (title, description) VALUES ('Task 1', 'Description 1')";
  try {
    const [rows] = await mysqlClient.conn.query(
      `SELECT *  
       FROM information_schema.tables 
       WHERE table_schema = 'mydb' AND table_name = ?`,
      ["tasks"]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      console.log("table exists");
      res.json({ message: "table exists" });
      return;
    }

    await mysqlClient.conn.query(taskTable);
    console.log("table created");
    await mysqlClient.conn.query(sql);
    console.log("task inserted successfully");
    res.json({ message: "table 'tasks' create successfully" });
  } catch (error) {
    console.log("Error on initialize", error);
  }
});

app.listen(3002, () => {
  console.log("Server 🚀 started on port 3002");
});
