const express = require('express');
const router = express.Router();
const { getAllEmployees } = require('../controllers/user.controllers');

// Add this route to get all employees
router.get('/employees', getAllEmployees);

module.exports = router;
