const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const jsonData = require('./jsonData.js'); // Adjust the path if necessary

app.use(cors()); // Add this line to use the cors middleware

app.get('/api/data', (req, res) => {
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/api/data`);
});