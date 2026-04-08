import * as tasksModel from "../models/tasksModel.js";

export const addTask = (req, res) => {
    const { title, est_minutes, priority } = req.body;
    const newId = tasksModel.createTask(title, est_minutes, priority);

    res.status(201)
       .set("Location", `/api/v1/tasks/${newId}`)
       .json({
           status: 201,
           message: "Created",
           task: { id: newId, title, est_minutes, priority, status: "todo" }
       });
};

export const getAllTasks = (req, res) => {
    const limit = 10;
    const offset = (parseInt(req.query.page) || 0) * limit;
    const tasks = tasksModel.findAllTasks(limit, offset);
    res.json(tasks);
};