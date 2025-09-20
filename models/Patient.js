// models/Patient.js
import mongoose from 'mongoose';

// Defines the schema for the Patient model
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Creates or retrieves the Patient model with the defined schema
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;
