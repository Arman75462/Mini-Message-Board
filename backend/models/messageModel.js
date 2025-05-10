import { v4 as uuidv4 } from "uuid";

const messages = [
  {
    id: uuidv4(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Hey!",
    user: "Clara",
    added: new Date(),
  },
];

export default messages;
