export const validateTask = (req, res, next) => {
    const { title, est_minutes, priority } = req.body;
    const errors = [];

    if (!title || title.trim().length < 3) {
        errors.push({ field: "title", message: "Title must be at least 3 characters" });
    }
    if (!est_minutes || est_minutes <= 0) {
        errors.push({ field: "est_minutes", message: "Estimated minutes must be positive" });
    }
    if (priority < 1 || priority > 3) {
        errors.push({ field: "priority", message: "Priority must be 1, 2, or 3" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ status: 422, errors });
    }
    next();
};