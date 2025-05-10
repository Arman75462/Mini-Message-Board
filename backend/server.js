import "dotenv/config";
import express from "express";
import cors from "cors";
import indexRouter from "./routes/indexRouter.js";
import messageRouter from "./routes/messageRouter.js";

const server = express();

// Middlewares running before routes
server.use(
  cors({
    origin: "https://minimessage-board.netlify.app",
  })
);

server.use(express.json()); // Convert form data into json
server.use(express.urlencoded({ extended: true })); // To parse the form data into req.body

// Routes
server.use("/", indexRouter);
server.use("/new", messageRouter);

// 404 page not found middleware
server.use((req, res) => {
  res.status(404).send(`<h1>API endpoint not found</h1>`);
});

// Error middleware that handles all errors passed down
server.use((err, req, res, next) => {
  console.error(err.stack);

  // Determine status code - default to 500 if not set
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).send(`<h1>${err.message}</h1>`);
});

const PORT = process.env.PORT || 3400;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
