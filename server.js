// Dependencies //////////////////////////////////////////////////////////
require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');

// App Object ////////////////////////////////////////////////////////////
const app = express();

// Database Connection ///////////////////////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL);
// Connection Events
mongoose.connection
  .on('open', () => console.log(`You are connected to MongoDB!`))
  .on('close', () => console.log(`You are disconnected from MongoDB!`))
  .on('error', (error) => console.log(error));

// Routes ////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send(`You're at the index!`);
});

// Listener //////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`You're listening on port ${PORT}!`));
