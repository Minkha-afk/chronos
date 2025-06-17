const pool = require('../db/db.js');

const getProjects = async (req, res) => {
  try {
    const projects = await pool.query(`SELECT * FROM projects ORDER BY created_at DESC`);
    res.status(200).json({ projects: projects.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const slugify = (text) =>
/*{this is a change}*/
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '_'); // convert spaces and symbols to underscores

const addProject = async (req, res) => {
  const { username, projectName, github_repo } = req.body;

  try {
    const getUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (getUser.rows.length === 0) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const role = getUser.rows[0].role;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'You need to be admin to add a project!' });
    }

    const projectId = slugify(projectName);

    // Insert into single `projects` table
    await pool.query(
      `INSERT INTO projects (project_name, project_id, github_repo) VALUES ($1, $2)`,
      [projectName, projectId, github_repo]
    );

    res.status(201).json({ message: `Project '${projectName}' created successfully.` });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProjects, addProject };
