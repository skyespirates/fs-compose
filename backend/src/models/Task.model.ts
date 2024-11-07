import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
});

export default model("Task", taskSchema);
