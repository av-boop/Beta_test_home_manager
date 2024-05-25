const knex = require("../db/connection");

const tableName = "tasks";

function read(id) {
  return knex(tableName).where({ id }).first();
}

function assignTask(taskId, memberId) {
  return knex(tableName)
    .where({ id: taskId })
    .update({ assignee: memberId })
    .returning("*")
    .then((rows) => rows[0]);
}
function create(data) {
  return knex(tableName)
    .insert(data)
    .returning("*")
    .then((created) => created[0]);
}

function updateTaskToCompleted(id) {
  return knex(tableName)
    .where({ id })
    .update({ completed: true })
    .returning("*")
    .then((rows) => rows[0]);
}



module.exports = {
  read,
  assignTask,
  create,
  updateTaskToCompleted,

};
