import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthUser", // references the User model
    required: true,
  },
  topic: {
    type: String,
    enum: ['technology', 'programming', 'design', 'general', 'discussion'],
    required: true,
  },
  replies: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});

const Thread = mongoose.model("Thread", threadSchema);

export default Thread;
