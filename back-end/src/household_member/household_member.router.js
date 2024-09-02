const express = require("express");
const router = express.Router();
const controller = require("./household_member.controller");

router.get("/:id", controller.getHouseholdMember);
router.post("/", controller.createHouseholdMember);
router.get("/", controller.getAllHouseholdMembers);

module.exports = router;
