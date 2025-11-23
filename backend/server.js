require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Fallback to in-memory database for local development
    try {
      console.log('Attempting to start in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log('In-memory MongoDB URI:', uri);
      await mongoose.connect(uri);
      console.log('Connected to In-memory MongoDB');
    } catch (fallbackErr) {
      console.error('In-memory MongoDB connection error:', fallbackErr);
    }
  }
};

connectDB();

// Routes
const gamesRouter = require('./routes/games');
app.use('/api/games', gamesRouter);

app.get('/', (req, res) => {
  res.send('Video Game Library API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
