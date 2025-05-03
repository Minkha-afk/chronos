const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const projectRoutes = require('./routes/projects.routes.js');

const topicRoutes = require('./routes/topics.routes.js');

app.use('/', projectRoutes);

app.use('/', topicRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running on port 8081');
})
