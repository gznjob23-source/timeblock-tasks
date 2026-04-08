import db from "../database/db.js";

export const findAllTasks = (limit = 10, offset = 0) => {
    const sql = "SELECT * FROM tasks LIMIT ? OFFSET ?;";
    return db.prepare(sql).all(limit, offset);
};

export const findTaskById = (id) => {
    const sql = "SELECT * FROM tasks WHERE id = ?;";
    return db.prepare(sql).get(id);
};

export const createTask = (title, est_minutes, priority) => {
    const sql = `
        INSERT INTO tasks (title, est_minutes, priority, status) 
        VALUES (?, ?, ?, 'todo');
    `;
    const result = db.prepare(sql).run(title, est_minutes, priority);
    return result.lastInsertRowid;
};