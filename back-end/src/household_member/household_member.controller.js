const service = require("./household_member.service");
const taskService = require("../tasks/tasks.service");

async function getHouseholdMember(req, res, next) {
  try {
    const { id } = req.params;
    const member = await service.getHouseholdMember(id);
    if (!member) {
      return res
        .status(404)
        .json({ error: `Household member with id ${id} not found` });
    }
    const findAllTask = await taskService.list();
    const tasks = findAllTask.filter((task) => task.assignee === member.id);
    member.tasks = tasks;
    res.json({ data: member });
  } catch (err) {
    next(err);
  }
}

async function createHouseholdMember(req, res, next) {
  try {
    const { data = {} } = req.body; // Extract data from request body
    const { member_name } = data; // Extract member_name from data
    if (!member_name) {
      return res.status(400).json({ error: "member_name is required" });
    }
    const newMember = await service.createHouseholdMember(member_name);
    res.status(201).json({ data: newMember });
  } catch (err) {
    next(err);
  }
}

async function getAllHouseholdMembers(req, res, next) {
  try {
    const members = await service.getAllHouseholdMembers();
    res.json({ data: members });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getHouseholdMember,
  createHouseholdMember,
  getAllHouseholdMembers,
};
