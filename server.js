const express = require('express');
const mongoose = require('mongoose');
const itinerariesRoute = require('./routes/itineraries');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://abhidogra225:Abhidogra7257267@cluster0.aid7l.mongodb.net/travel-guide?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if unable to connect
  }
};

// Call the async connection function
connectDB();

// Routes
app.use('/api/itineraries', itinerariesRoute);

// Listen on port 5001 instead of 5000
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
