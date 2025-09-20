// models/User.js
import mongoose from 'mongoose';

// Defines the schema for the Patient model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }]
}, { timestamps: true });

// Creates or retrieves the Patient model with the defined schema
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
