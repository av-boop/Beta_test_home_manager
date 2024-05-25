const router = require("express").Router();
const controller = require("../controllers/tasks.controller");


router
    .route("/:id/assign/:member_id")
    .post(controller.assignTaskToMember);

    router.route("/").post(controller.create);

module.exports = router;
