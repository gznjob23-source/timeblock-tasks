import * as blocksModel from "../models/blocksModel.js";

export const getDailySchedule = (req, res) => {
    const { date } = req.query;
    const blocks = blocksModel.findBlocksByDate(date);
    
    const blocksWithLinks = blocks.map(b => ({
        ...b,
        links: { assign: `/api/v1/time-blocks/${b.id}/assign` }
    }));
    
    res.json({ date, time_blocks: blocksWithLinks });
};

export const assignTask = (req, res) => {
    const blockId = req.params.id;
    const { task_id } = req.body;

    const changes = blocksModel.assignTaskToBlock(task_id, blockId);

    if (changes === 0) {
        return res.status(404).json({
            status: 404,
            message: "Time block not found"
        });
    }

    res.json({
        status: 200,
        message: "Assigned",
        links: {
            self: `/api/v1/time-blocks/${blockId}`,
            all_blocks: `/api/v1/time-blocks`
        }
    });
};