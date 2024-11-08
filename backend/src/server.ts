import express from 'express';
import cors from 'cors';
import Task from './models/Task.model';
import { mongoClient, redisClient } from './connection/';

mongoClient.connect();
redisClient.connect();

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const exisingTasks = await Task.find({});
    const task = await Task.create({
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    });
    const data = {
      message: 'Hello World!',
      exisingTasks,
    };
    redisClient.set('name', 'brody');
    res.json(data);
  } catch (error) {
    console.log('Error', error);
  }
});

app.listen(3001, () => {
  console.log('Server 🚀 started on port 3001');
});
