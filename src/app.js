const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { connectToServer } = require('./db/connection');

// Import Router
const recordRoutes = require('./routes/records');

const PORT = process.env.PORT || '8000';
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/record', recordRoutes)

app.listen(PORT, () => {
  connectToServer(() => {});
  console.log('listening on port:', PORT)
})