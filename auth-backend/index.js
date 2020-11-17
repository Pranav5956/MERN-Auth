import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

// Setup express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server has started on port: ${port}`));

// Setup Mongoose
// 5koRbqqKadZIz8ax
