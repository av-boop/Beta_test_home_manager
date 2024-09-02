// back-end/src/app.js

const express = require('express');
const app = express();
const cors = require('cors');
const householdMembersRouter = require('../src/household_member/household_member.router');
const taskRouter = require("../src/tasks/tasks.router");

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);

app.use("/household-members", householdMembersRouter);

app.use((req, res, next) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
