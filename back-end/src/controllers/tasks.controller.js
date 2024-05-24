const service = require('../services/tasks.service');

async function getAllIncompleteTasks(req, res, next) {
    try {
        const tasks = await service.getAllIncompleteTasks();
        res.json({ data: tasks });
    } catch (err) {
        next(err);
    }
}

async function getTask(req, res, next) {
    try {
        const { id } = req.params;
        const task = await service.getTask(id);
        if (!task) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }
        res.json({ data: task });
    } catch (err) {
        next(err);
    }
}

async function createTask(req, res, next) {
    try {
        const { data = {} } = req.body;
        const { title, description, due_date, importance } = data;

        // Validate due date
        const currentDate = new Date();
        const taskDueDate = new Date(due_date);
        if (taskDueDate < currentDate) {
            return res.status(400).json({ error: 'Task due date cannot be in the past' });
        }

        // Validate importance
        const validImportanceLevels = ['low', 'medium', 'high'];
        if (!validImportanceLevels.includes(importance)) {
            return res.status(400).json({ error: 'Task importance must be low, medium, or high' });
        }

        // Proceed with creating the task if validations pass
        const newTask = await service.createTask({ title, description, due_date, importance });
        res.status(201).json({ data: newTask });
    } catch (err) {
        next(err);
    }
}

async function updateTask(req, res, next) {
    try {
        const { id } = req.params;
        const { data = {} } = req.body;
        const updatedTask = await service.updateTask(id, data);
        if (!updatedTask) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }
        res.json({ data: updatedTask });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllIncompleteTasks,
    getTask,
    createTask,
    updateTask,
};
