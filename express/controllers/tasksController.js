import * as tasksModel from "../models/tasksModel.js";

export const getTask = (req, res) => {
    const id = req.params.id;
    const rows = tasksModel.findTaskById(id);

    if (rows.length > 0) {
        res.json(rows);
    } else {
        res.status(404).json({
            status:404,
            message: "Task not found"
        });
    }
};