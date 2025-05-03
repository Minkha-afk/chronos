const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const loginRoutes = require('./routes/login.routes');
const registerRoutes = require('./routes/register.routes');
app.use('/', loginRoutes); // Use the login routes
app.use('/', registerRoutes); // Use the register routes
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {   
    console.log(`server is running on port ${PORT}`);
});  
