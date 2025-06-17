const pool = require('../db/db'); 
 
const loginController = async (req, res) => { 
  const { username, password ,role } = req.body;  

  

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try { 
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = result.rows[0];  

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      username: user.username,
      role: user.role
    });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({
      message: 'Already registered. Please login.',
      error: error.message
    });
  }
};

module.exports = { loginController };
