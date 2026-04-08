export const validateIdParam = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        res.status(400).json({ status: 400, message: "Invalid ID format" });
    } else {
        next();
    }
};

export const validateDateQuery = (req, res, next) => {
    const date = req.query.date;

    if (!date || date.length !== 10) {
        res.status(400).json({ status: 400, message: "Date is required in YYYY-MM-DD format" });
    } else {
        next();
    }
};

export const validateTaskBody = (req, res, next) => {
    const title = req.body.title;
    const est_minutes = req.body.est_minutes;
    const priority = req.body.priority;

    const errors = [];

    if (!title || title.length < 3) {
        errors.push({ field: "title", message: "Title must be at least 3 chars" });
    }
    if (!est_minutes || est_minutes <= 0) {
        errors.push({ field: "est_minutes", message: "Est. minutes must be > 0" });
    }
    if (!priority || priority < 1 || priority > 3) {
        errors.push({ field: "priority", message: "Priority must be 1-3" });
    }

    if (errors.length > 0) {
        res.status(422).json({ status: 422, errors: errors });
    } else {
        next();
    }
};

export const validateAssignBody = (req, res, next) => {
    const taskId = parseInt(req.body.task_id, 10);
    if (isNaN(taskId) || taskId <= 0) {
        res.status(400).json({ status: 400, message: "Valid task_id is required" });
    } else {
        req.body.task_id = taskId;
        next();
    }
};