const contributorSchema = require('../db/contributorSchema.js');

const addContributor = async(req, res) => {
  let { username, project_id, topic_id } = req.body;

  try{
    const newContributor = new contributorSchema({ username, project_id, topic_id });

    await newContributor.save();

    res.status(200).json({ message: 'Contributor added successfully!' });
  }
  catch(err){
    console.log(err.message);
  }
}

const getContributor = async (req, res) => {
  let { project_id, topic_id } = req.body;

  try {
    const contributors = await contributorSchema.find({ project_id, topic_id });

    if (contributors.length === 0) {
      return res.status(404).json({ message: 'No contributors found' });
    }

    res.status(200).json(contributors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addContributor, getContributor };
