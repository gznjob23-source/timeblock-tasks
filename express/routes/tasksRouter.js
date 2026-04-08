import express from "express";
import * as tasksController from "../controllers/tasksController.js";
import { validateIdParam, validateTaskBody } from "../middleware/validator.js";

const router = express.Router();

router.get("/", tasksController.getAllTasks);

router.get("/:id", validateIdParam, tasksController.getTaskById);

router.post("/", validateTaskBody, tasksController.addTask);

export default router;