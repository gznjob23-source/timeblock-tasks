import express from "express";
import * as blocksController from "../controllers/blocksController.js";
import { validateIdParam, validateDateQuery, validateAssignBody } from "../middleware/validator.js";

const router = express.Router();

router.get("/", validateDateQuery, blocksController.getDailySchedule);
router.post("/:id/assign", validateIdParam, validateAssignBody, blocksController.assignTask);

export default router;