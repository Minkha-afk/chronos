const pool = require('../db/db'); // or adjust the relative path as needed

// Login controller
const loginController = async (req, res) => { 
  const { username, password } = req.body;  
  if (!username || !password  ) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Query to find the user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    // If no user is found, return an error
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = result.rows[0]; // Get the first user (since usernames are unique)

    // Compare the provided password with the stored password (in plain text)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // If passwords match, return a success message
    return res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginController };
