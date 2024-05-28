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

async function create(data) {
  const { is_recurring, recurrence_interval, due_date, ...taskData } = data; // Extract due_date from data
  const formattedDueDate = new Date(due_date).toISOString().split("T")[0]; // Format due_date as "YYYY-MM-DD"

  const created = await knex(tableName)
    .insert({ ...taskData, is_recurring, recurrence_interval, due_date: formattedDueDate }) // Use formattedDueDate
    .returning("*");

  if (is_recurring) {
    // Create new recurring task
    const nextDueDate = new Date(due_date);
    nextDueDate.setDate(nextDueDate.getDate() + recurrence_interval); // Calculate next due date based on recurrence_interval

    await knex(tableName).insert({
      ...taskData,
      is_recurring: true,
      recurrence_interval,
      due_date: nextDueDate.toISOString().split("T")[0], // Format nextDueDate as "YYYY-MM-DD"
      assignee: taskData.assignee,
      completed: false,
    });
  }

  return created[0];
}



function updateTaskToCompleted(id) {
  return knex(tableName)
    .where({ id })
    .update({ completed: true })
    .returning("*")
    .then((rows) => rows[0]);
}

function list() {
  return knex(tableName).select("*");
}

function filteredList(param) {
  return knex(tableName).select("*").where({ completed: param });
}

function createRecurringTask(data) {
  return knex.transaction(async (trx) => {
    const [completedTask] = await trx(tableName)
      .where({ id: data.id })
      .update({ completed: true })
      .returning("*");

    if (!completedTask.recurrence_interval) {
      return completedTask;
    }

    const newDueDate = new Date(completedTask.due_date);
    newDueDate.setDate(newDueDate.getDate() + completedTask.recurrence_interval);

    const newTaskData = {
      title: completedTask.title,
      description: completedTask.description,
      due_date: newDueDate,
      importance: completedTask.importance,
      recurrence_interval: completedTask.recurrence_interval,
      assignee: completedTask.assignee,
      completed: false,
    };

    const [newTask] = await trx(tableName).insert(newTaskData).returning("*");

    return { completedTask, newTask };
  });
}

module.exports = {
  read,
  assignTask,
  create,
  updateTaskToCompleted,
  list,
  filteredList,
  createRecurringTask,
};
