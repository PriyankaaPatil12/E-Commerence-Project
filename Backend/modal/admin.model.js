import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Admin", AdminSchema);
