import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

export const Todo = mongoose.model("Todo", todoSchema);
