const express = require('express');
const router = express.Router();
const controller = require('../controllers/householdMembers.controller');

router.get('/:id', controller.getHouseholdMember);
router.post('/', controller.createHouseholdMember);
router.get('/', controller.getAllHouseholdMembers);

module.exports = router;
