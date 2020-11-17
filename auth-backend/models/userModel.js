import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  displayName: { type: String },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
