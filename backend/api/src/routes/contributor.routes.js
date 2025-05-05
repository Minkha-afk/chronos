const express = require('express');

const router = express.Router();

const { addContributor } = require('../controllers/contributor.controller.js');

router.post('/add-contributor', addContributor);

module.exports = router;
