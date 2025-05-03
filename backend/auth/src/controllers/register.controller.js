const pool = require('../db/db.js');

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      console.log(username)
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      console.log('User:', { username, email, password });
  
      await pool.query(`INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`, [username, email, password, role]);

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  module.exports = { registerUser };
 