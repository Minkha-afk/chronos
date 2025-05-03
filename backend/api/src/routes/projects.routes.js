const express = require('express');

const router = express.Router();

const { getProjects } = require('../controllers/projects.controllers.js');

const { addProject } = require('../controllers/projects.controllers.js');

router.get('/get-projects', getProjects);

router.post('/add-project', addProject);

module.exports = router;
