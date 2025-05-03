const pool = require('../db/db.js');

const getProjects = async(req, res) => {
  try{

  }
  catch(err){
    console.log(err.message);
  }
}

const addProject = async (req, res) => {
  const { username, projectName } = req.body;

  try {
    const getRole = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (getRole.rows.length > 0) {
      const role = getRole.rows[0].role;

      if (role === 'admin') {
        // Sanitize table name
        const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9_]/g, '');
        const projectTable = `${sanitizedProjectName}_table`;

        // Create table
        await pool.query(`
          CREATE TABLE ${projectTable} (
            id SERIAL PRIMARY KEY,
            topic VARCHAR(250) NOT NULL,
            topic_description VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
          );
        `);

        res.status(201).json({ message: `Project '${projectName}' created successfully.` });
      } else {
        res.status(403).json({ message: 'You need to be admin to add a project!' });
      }
    } else {
      res.status(404).json({ message: 'User does not exist!' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProjects, addProject };
