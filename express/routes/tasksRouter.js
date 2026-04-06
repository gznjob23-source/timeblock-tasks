import express from "express";
import * as tasksController from "../controllers/tasksController.js";

const router = express.Router();

router.get("/:id", tasksController.getTask);

export default router;