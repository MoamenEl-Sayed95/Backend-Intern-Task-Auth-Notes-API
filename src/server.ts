import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

// Load environment variables from .env file
dotenv.config();

// Define the server port (default to 5000 if not provided)
const PORT = process.env.PORT || 5000;


// Get MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    // Start the server once the database connection is successful
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => {
    // Log an error if the database connection fails
    console.error('❌ Failed to connect to MongoDB', err)
  });