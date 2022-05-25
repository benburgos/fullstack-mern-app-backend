// Dependencies
require('dotenv').config();
const express = require('express');

// App Object
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send(`You're at the index!`);
});

// Listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`You're listening on port ${PORT}!`));
