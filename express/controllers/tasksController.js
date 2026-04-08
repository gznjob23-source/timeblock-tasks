import * as tasksModel from "../models/tasksModel.js";

export const addTask = (req, res) => {
    const { title, est_minutes, priority } = req.body;
    const newId = tasksModel.createTask(title, est_minutes, priority);

    res.status(201);
    res.set("Location", `/api/v1/tasks/${newId}`);
    res.json({
        status: 201,
        message: "Created",
        links: { self: `/api/v1/tasks/${newId}`, all: "/api/v1/tasks" },
        task: { id: newId, title, est_minutes, priority, status: "todo" }
    });
};

export const getAllTasks = (req, res) => {
    let page = req.query.page;
    if (!page) {
        page = 0;
    }
    const limit = 10;
    const offset = page * limit;
    const tasks = tasksModel.findAllTasks(limit, offset);
    res.json(tasks);
};

export const getTaskById = (req, res) => {
  const id = req.params.id;
  const taskRows = tasksModel.findTaskById(id);
  
  if (taskRows && taskRows.length > 0) {
    const task = taskRows;
    res.json({
      status: 200,
      task: task,
      links: { self: `/api/v1/tasks/${id}` }
    });
  } else {
    res.status(404).json({ status: 404, message: "Task not found" });
  }
};