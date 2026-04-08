import db from "../database/db.js";

export const findBlocksByDate = (date) => {
    const sql = `
        SELECT time_blocks.*, tasks.title as task_title
        FROM time_blocks
        LEFT JOIN tasks ON time_blocks.task_id = tasks.id
        WHERE time_blocks.date = ?;
    `;
    return db.prepare(sql).all(date);
};