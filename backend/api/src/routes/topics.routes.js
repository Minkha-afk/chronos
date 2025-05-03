const express = require('express');

const router = express.Router();

const { getTopics } = require('../controllers/topics.controllers.js');

const { addTopic } = require('../controllers/topics.controllers.js');

router.get('/get-topics', getTopics);

router.post('/add-topic', addTopic);

module.exports = router;
