const express = require('express');
const router = express.Router();

const app = express();

app.use(express.json())

const { registerUser } = require('../controllers/register.controller'); 

router.get('/register', (req, res) => {
    res.send("Register");
})

router.post('/register', registerUser);

module.exports = router;
