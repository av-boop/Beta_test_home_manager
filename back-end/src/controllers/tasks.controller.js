
const service = require("../services/tasks.service");
const householdService=require("../services/householdMembers.service")

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


module.exports = {
  assignTaskToMember,
  create: [hasValidData, create],
};