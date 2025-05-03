const pool = require('../db/db.js');

const getTopics = async(req, res) => {
  try{

  }
  catch(err){
    console.log(err.message);
  }

}

const addTopic = async(req, res) => {
  const { username, projectName, topicName, topicDescription } = req.body;

  try {
    const getRole = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if (getRole.rows.length > 0) {
      const role = getRole.rows[0].role;

      if (role === 'admin' || role === 'lead') {
        // Sanitize table name
        const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9_]/g, '');
        const projectTable = `${sanitizedProjectName}_table`;

        // Insert initial data
        await pool.query(`
          INSERT INTO ${projectTable} (topic, topic_description) VALUES ($1, $2);
        `, [topicName, topicDescription]);

        res.status(201).json({ message: `Topic '${projectName}' created successfully.` });
      } else {
        res.status(403).json({ message: 'You need to be admin or lead to add a topic!' });
      }
    } else {
      res.status(404).json({ message: 'User does not exist!' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getTopics, addTopic };
