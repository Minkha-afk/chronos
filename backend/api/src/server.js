const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/chronos', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

const projectRoutes = require('./routes/projects.routes.js');

const topicRoutes = require('./routes/topics.routes.js');

const contributorRoutes = require('./routes/contributor.routes.js');

app.use('/api/', projectRoutes);

app.use('/api/', topicRoutes);

app.use('/api/', contributorRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running on port 8081');
})
