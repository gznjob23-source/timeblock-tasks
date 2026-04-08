import * as tasksModel from "../models/tasksModel.js";

export const addTask = (req, res) => {
    const { title, est_minutes, priority } = req.body;
    const newId = tasksModel.createTask(title, est_minutes, priority);

    res.status(201)
       .set("Location", `/api/v1/tasks/${newId}`)
       .json({
           status: 201,
           message: "Created",
           links: { self: `/api/v1/tasks/${newId}`, all: "/api/v1/tasks" },
           task: { id: newId, title, est_minutes, priority, status: "todo" }
       });
};

export const getAllTasks = (req, res) => {
    const limit = 10;
    const offset = (parseInt(req.query.page) || 0) * limit;
    const tasks = tasksModel.findAllTasks(limit, offset);
    res.json(tasks);
};

export const getTaskById = (req, res) => {
    const id = req.params.id;
    const task = tasksModel.findTaskById(id);

    if (task) {
        res.json({
            status: 200,
            task,
            links: { self: `/api/v1/tasks/${id}`, all: "/api/v1/tasks" }
        });
    } else {
        res.status(404).json({ status: 404, message: "Task not found" });
    }
};