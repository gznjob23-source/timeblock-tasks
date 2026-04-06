import db from "../database/db.js";

export const findTaskById = (id) => {
    const sql = "SELECT * FROM tasks WHERE id = ?;";
    return db.prepare(sql).all(id);
}