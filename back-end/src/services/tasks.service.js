const knex = require('../db/connection');

const getAllIncompleteTasks = () => {
    return knex('tasks')
        .where('status', '!=', 'completed')
        .orderBy('due_date', 'asc');
};

const getTask = (id) => {
    return knex('tasks').where({ id }).first();
};

const createTask = (task) => {
    return knex('tasks')
        .insert(task)
        .returning('*')
        .then((rows) => rows[0]);
};

const updateTask = (id, updatedTask) => {
    return knex('tasks')
        .where({ id })
        .update(updatedTask)
        .returning('*')
        .then((rows) => rows[0]);
};

module.exports = {
    getAllIncompleteTasks,
    getTask,
    createTask,
    updateTask,
};
