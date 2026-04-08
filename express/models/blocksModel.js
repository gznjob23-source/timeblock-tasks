import db from "../database/db.js";

export const findBlocksByDate = (date) => {
    const sql = `
        SELECT time_blocks.*, tasks.title AS task_title
        FROM time_blocks
        LEFT JOIN tasks ON time_blocks.task_id = tasks.id
        WHERE time_blocks.date = ?;
    `;
    return db.prepare(sql).all(date);
};

export const assignTaskToBlock = (taskId, blockId) => {
    const sql = "UPDATE time_blocks SET task_id = ? WHERE id = ?;";
    const stmt = db.prepare(sql);
    const result = stmt.run(taskId, blockId);
    return result.changes;
};