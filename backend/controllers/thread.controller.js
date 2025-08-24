// adjust the path as needed
import mongoose from "mongoose";
import Thread from "../models/thread.model.js";

// Create a new thread
export const createThread = async (req, res) => {
  try {
    const { title, content, topic } = req.body;
    const userId = req.user._id; // Assuming user ID is added to req.user by authentication middleware

    // Validate required fields
    if (!title || !content || !topic) {
      return res.status(400).json({ message: "Title, content, and topic are required." });
    }

    // Optionally, validate topic against allowed values if not relying on Mongoose enum
    const allowedTopics = ['technology', 'programming', 'design', 'general', 'discussion'];
    if (!allowedTopics.includes(topic)) {
      return res.status(400).json({ message: "Invalid topic." });
    }

    // Create new thread
    const newThread = new Thread({
      title,
      content,
      topic,
      author: userId
    });

    const savedThread = await newThread.save();

    return res.status(201).json(savedThread);
  } catch (error) {
    console.error("Error creating thread:", error);
    return res.status(500).json({ message: "Server error creating thread." });
  }
};
