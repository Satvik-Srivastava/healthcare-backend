// models/Doctor.js
import mongoose from 'mongoose';

// Defines the schema for the Doctor model
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  contact: String,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional
}, { timestamps: true });

// Creates or retrieves the Doctor model with the defined schema
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctor;
