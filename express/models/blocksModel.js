import db from "../database/db.js";

export const findBlocksByDate = (date) => {
    const sql = "SELECT * FROM time_blocks WHERE date = ?;";
    const blocks = db.prepare(sql).all(date);

    blocks.forEach((block) => {
        if (block.task_id) {
            const taskSql = "SELECT title FROM tasks WHERE id = ?;";
            const taskRows = db.prepare(taskSql).all(block.task_id);
            
            if (taskRows.length > 0) {
                block.task_title = taskRows[0].title;
            }
        } else {
            block.task_title = null;
        }
    });

    return blocks;
};

export const assignTaskToBlock = (taskId, blockId) => {
    const checkSql = "SELECT * FROM time_blocks WHERE id = ?;";
    const blockRows = db.prepare(checkSql).all(blockId);

    if (blockRows.length === 0) {
        return 0; 
    }

    const updateSql = "UPDATE time_blocks SET task_id = ? WHERE id = ?;";
    db.prepare(updateSql).run(taskId, blockId);
    
    return 1;
};

export const createDailyBlocks = (date) => {
    const sql = "INSERT INTO time_blocks (date, start_min, end_min, task_id) VALUES (?, ?, ?, NULL);";
    const stmt = db.prepare(sql);
    
    for (let startMin = 360; startMin < 1440; startMin += 60) {
        const endMin = startMin + 60;
        stmt.run(date, startMin, endMin);
    }
};