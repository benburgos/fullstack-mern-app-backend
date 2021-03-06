// Dependencies //////////////////////////////////////////////////////////
require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

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

// Models ////////////////////////////////////////////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model('People', PeopleSchema);

// Middleware ////////////////////////////////////////////////////////////
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Routes ////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.redirect(`/people`);
});

// Index Route
app.get('/people', async (req, res) => {
  try {
    res.json(await People.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete Route
app.delete('/people/:id', async (req, res) => {
  try {
    res.json(await People.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update Route
app.put('/people/:id', async (req, res) => {
  try {
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// Create Route
app.post('/people', async (req, res) => {
  try {
    res.json(await People.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Show Route
app.get('/people/:id', async (req, res) => {
  try {
    res.json(await People.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Listener //////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`You're listening on port ${PORT}!`));
