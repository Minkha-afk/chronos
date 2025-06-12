const express = require('express');

const router = express.Router();

const { addContributor, getContributor } = require('../controllers/contributor.controller.js');

router.post('/add-contributor', addContributor);

router.post('/get-contributor', getContributor);

module.exports = router;
