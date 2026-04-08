import db from "../database/db.js";

export const findAllTasks = (limit, offset) => {
    const sql = "SELECT * FROM tasks LIMIT ? OFFSET ?;";
    return db.prepare(sql).all(limit, offset);
};

export const findTaskById = (id) => {
    const sql = "SELECT * FROM tasks WHERE id = ?;";
    return db.prepare(sql).all(id);
};

export const findBlocksForTask = (taskId) => {
    const sql = `
        SELECT time_blocks.* 
        FROM time_blocks
        JOIN tasks ON time_blocks.task_id = tasks.id
        WHERE tasks.id = ?;
    `;
    return db.prepare(sql).all(taskId);
};

export const createTask = (title, est_minutes, priority) => {
    const sql = `
        INSERT INTO tasks (title, est_minutes, priority, status) 
        VALUES (?, ?, ?, 'todo');
    `;
    const result = db.prepare(sql).run(title, est_minutes, priority);
    
    return result.lastInsertRowid;
};