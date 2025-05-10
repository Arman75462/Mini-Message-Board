import messages from "../models/messageModel.js";
import { v4 as uuidv4 } from "uuid";

export function getMessages(req, res) {
  res.json(messages);
}

export function getSingleMessage(req, res) {
  const id = req.params.id;
  const index = messages.findIndex((msg) => msg.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  res.json(messages[index]);
}

export function createMessage(req, res) {
  const newMessage = {
    id: uuidv4(),
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
}

export function deleteMessage(req, res) {
  const id = req.params.id;
  const index = messages.findIndex((msg) => msg.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  const deletedMessage = messages.splice(index, 1);
  res.status(201).json(deletedMessage);
}
