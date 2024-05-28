const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

router.route("/:id/assign/:member_id").post(controller.assignTaskToMember);
router.route("/:id").get(controller.read).put(controller.updateTaskToCompleted);
router.route("/").get(controller.list).post(controller.create);

module.exports = router;
