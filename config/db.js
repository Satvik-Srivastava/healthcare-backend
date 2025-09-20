// config/db.js
import mongoose from 'mongoose';
// Establishes connection to MongoDB Atlas
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
