import { Router } from "express";
import getIndexRoute from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getIndexRoute);

export default indexRouter;
