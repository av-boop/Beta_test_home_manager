const service = require("./tasks.service");
const householdService = require("../household_member/household_member.service");

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
    next({
      status: 400,
      message: `due date should not be past data.`,
    });
  }
  const arr = ["low", "medium", "high"];
  if (!arr.includes(data.importance)) {
    next({
      status: 400,
      message: `task importance should one of low, medium, or high"`,
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
    console.log(data);
    if (data.recurring) {
      const { id, ...taskWithoutId } = data;
      const newDueDate = new Date(data.due_date);

      newDueDate.setDate(newDueDate.getDate() + data.recurring + 1);
      const newTask = {
        ...taskWithoutId,
        due_date: newDueDate,
        completed: false,
      };
      const newData = await service.create(newTask);
      console.log(newTask);
      res.status(201).json({ data: newData });
    } else {
      res.status(201).json({ data });
    }
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
