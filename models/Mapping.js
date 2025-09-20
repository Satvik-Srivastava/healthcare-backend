import mongoose from 'mongoose';

// Defines the schema for the Mapping model
const mappingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: String
}, { timestamps: true });

// Creates or retrieves the Mapping model with the defined schema
const Mapping = mongoose.models.Mapping || mongoose.model('Mapping', mappingSchema);
export default Mapping;
