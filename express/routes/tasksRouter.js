import express from "express";
import * as tasksController from "../controllers/tasksController.js";
import { validateTask } from "../middleware/validator.js";

const router = express.Router();

router.get("/", tasksController.getAllTasks);
router.post("/", validateTask, tasksController.addTask);

export default router;