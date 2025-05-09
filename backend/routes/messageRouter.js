import { Router } from "express";
import {
  getMessages,
  getSingleMessage,
  createMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import messages from "../models/messageModel.js";

const messageRouter = Router();

messageRouter.get("/", getMessages);
messageRouter.get("/:id", getSingleMessage);
messageRouter.post("/", createMessage);
messageRouter.delete("/:id", deleteMessage);

export default messageRouter;
