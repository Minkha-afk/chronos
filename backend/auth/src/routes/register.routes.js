const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/register.controller'); 

router.get('/Register', (req, res) => {
    res.send("Register");
})
router.post('/register', registerUser);
module.exports = router;