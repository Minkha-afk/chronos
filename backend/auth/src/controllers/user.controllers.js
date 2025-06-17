const pool = require('../db/db');

// GET /api/users/employees
const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email  FROM users WHERE role = 'employee' ORDER BY username ASC`
    );
  
    res.status(200).json({ employees: result.rows });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllEmployees };
