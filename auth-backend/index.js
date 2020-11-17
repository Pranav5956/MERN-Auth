import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

import userRoute from "./routes/userRouter.js";

// Setup express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server has started on port: ${port}`));

// Setup Mongoose
mongoose
  .connect(process.env.REACT_APP_MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connection established"))
  .catch((err) => console.log(err));
