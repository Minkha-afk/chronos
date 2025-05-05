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

module.exports = { addContributor };
