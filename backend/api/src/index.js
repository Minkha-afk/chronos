const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const projectRoutes = require('./routes/projects.routes.js');

app.use('/', projectRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running on port 8081');
})
