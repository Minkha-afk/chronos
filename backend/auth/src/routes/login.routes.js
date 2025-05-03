const express = require('express');
const router = express.Router();

const { loginController } = require('../controllers/login.controller'); 

router.get('/login', (req, res) => {
    res.send("Login");
});
router.post('/login', (req, res) => {
    loginController(req, res); 
})

module.exports = router;