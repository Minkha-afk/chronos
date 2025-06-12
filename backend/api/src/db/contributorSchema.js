const mongoose = require('mongoose');

const topicContributorSchema = new mongoose.Schema({
  username: String,
  project_id: String,
  topic_id: String
});

const contributorSchema = mongoose.model('contributorSchema', topicContributorSchema);

module.exports = contributorSchema;
