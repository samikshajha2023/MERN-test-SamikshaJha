import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);


const mongoURI = "mongodb+srv://sam1093:Samiksha%401093@cluster0.brbtonw.mongodb.net/?appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


