import express from "express";
import { createThread } from "../controllers/thread.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";





const threadrouter=express.Router();
threadrouter.post("/threads/:id",protectRoute,createThread)




export default threadrouter;