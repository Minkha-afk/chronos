const pool = require('../db/db.js');

const getTopics = async (req, res) => {
  try {
    const topics = await pool.query(`SELECT * FROM topics ORDER BY created_at DESC`);
    res.status(200).json({ topics: topics.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addTopic = async (req, res) => {
  const { username, projectId, topic, topicDescription } = req.body;

  try {
    // Check user
    const getUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (getUser.rows.length === 0) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const role = getUser.rows[0].role;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add topics.' });
    }

    // Find the project by project_id (slug)
    const projectQuery = await pool.query(`SELECT * FROM projects WHERE project_id = $1`, [projectId]);

    if (projectQuery.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const projectRow = projectQuery.rows[0];

    // Insert topic
    await pool.query(
      `INSERT INTO topics (project_id, topic, topic_description)
       VALUES ($1, $2, $3)`,
      [projectRow.id, topic, topicDescription]
    );

    res.status(201).json({ message: `Topic '${topic}' added to project '${projectRow.project_name}' successfully.` });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getTopics, addTopic };
