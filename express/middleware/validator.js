export const validateIdParam = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ status: 400, message: "Invalid ID format" });
    }
    next();
};

export const validateDateQuery = (req, res, next) => {
    const { date } = req.query;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !dateRegex.test(date)) {
        return res.status(400).json({ status: 400, message: "Date is required in YYYY-MM-DD format" });
    }
    next();
};

export const validateTaskBody = (req, res, next) => {
    const { title, est_minutes, priority } = req.body;
    const errors = [];

    if (!title || title.trim().length < 3) {
        errors.push({ field: "title", message: "Title must be at least 3 chars" });
    }
    if (!est_minutes || est_minutes <= 0) {
        errors.push({ field: "est_minutes", message: "Est. minutes must be > 0" });
    }
    if (!priority || priority < 1 || priority > 3) {
        errors.push({ field: "priority", message: "Priority must be 1-3" });
    }

    if (errors.length > 0) return res.status(422).json({ status: 422, errors });
    next();
};

export const validateAssignBody = (req, res, next) => {
    const taskId = parseInt(req.body.task_id, 10);
    if (isNaN(taskId) || taskId <= 0) {
        return res.status(400).json({ status: 400, message: "Valid task_id is required" });
    }
    req.body.task_id = taskId;
    next();
};