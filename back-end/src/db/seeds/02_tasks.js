const tasksData = require("./02_tasks.json");

exports.seed = function (knex) {
  return knex("tasks")
    .del()
    .then(function () {
      return knex("tasks").insert(tasksData);
    });
};
