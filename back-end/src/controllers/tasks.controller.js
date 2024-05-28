const service = require("../services/tasks.service");
const householdService = require("../services/householdMembers.service");

async function assignTaskToMember(req, res, next) {
  const { id, member_id } = req.params;
  const findTask = await service.read(id);
  const findMember = await householdService.getHouseholdMember(member_id);
  if (!findTask) {
    return next({ status: 404, message: `Task with ID ${id} not found.` });
  }
  if (!findMember) {
    return next({
      status: 404,
      message: `Member with ID ${member_id} not found.`,
    });
  }

  const updatedTask = await service.assignTask(id, member_id);
  res.status(201).json({ data: updatedTask });
}

async function hasValidData(req, res, next) {
  const { data = {} } = req.body;
  const currentDate = new Date();
  const due_date = new Date(data.due_date);

  if (due_date < currentDate) {
    return next({
      status: 400,
      message: `Due date should not be in the past.`,
    });
  }
  const validImportanceLevels = ["low", "medium", "high"];
  if (!validImportanceLevels.includes(data.importance)) {
    return next({
      status: 400,
      message: `Task importance should be one of low, medium, or high.`,
    });
  }
  next();
}

async function create(req, res, next) {
  const response = await service.create(req.body.data);
  res.status(201).json({ data: response });
}


async function updateTaskToCompleted(req, res, next) {
  try {
    const { id } = req.params;
    const findTask = await service.read(id);
    if (!findTask) {
      return next({
        status: 404,
        message: `Task with ID ${id} not found.`,
      });
    }

    const data = await service.updateTaskToCompleted(id);

    // Generate new task if the task is recurring
    if (findTask.is_recurring) {
      const due_date = new Date(findTask.due_date);
      const nextDueDate = new Date(due_date.getTime() + findTask.recurrence_interval * 24 * 60 * 60 * 1000);
      await service.create({
        ...findTask,
        id: null, // Exclude ID to create a new task
        due_date: nextDueDate.toISOString().split("T")[0], // Ensure date format is YYYY-MM-DD
        completed: false,
      });
    }

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}



async function hasValidTaskId(req, res, next) {
  const { id } = req.params;
  const findTask = await service.read(id);
  if (!findTask) {
    return next({ status: 404, message: `Task with ID ${id} not found.` });
  } else {
    res.locals.findTask = findTask;
    next();
  }
}

function read(req, res, next) {
  res.json({ data: res.locals.findTask });
}

async function list(req, res) {
  if (req.query.complete !== undefined) {
    const { complete } = req.query;
    const tasks = await service.filteredList(complete);
    res.json({ data: tasks });
  } else {
    const tasks = await service.list();
    res.json({ data: tasks });
  }
}

module.exports = {
  assignTaskToMember,
  create: [hasValidData, create],
  updateTaskToCompleted,
  read: [hasValidTaskId, read],
  list,
};
