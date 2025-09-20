// controllers/patientController.js
import { validationResult } from 'express-validator';
import Patient from '../models/Patient.js';

// Creates a new patient with user authentication
export const createPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, age, gender, contact, notes } = req.body;
    const patient = new Patient({
      name, age, gender, contact, notes,
      createdBy: req.user.id
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) { next(err); }
};

// Retrieves all patients created by the authenticated user
export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) { next(err); }
};

// Fetches a specific patient by ID with authorization check
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    res.json(patient);
  } catch (err) { next(err); }
};

// Updates a patient's details with authorization check
export const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    Object.assign(patient, req.body);
    await patient.save();
    res.json(patient);
  } catch (err) { next(err); }
};

// Deletes a patient with authorization check
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await patient.deleteOne(); 

    res.json({ message: 'Patient removed' });
  } catch (err) {
    next(err); // This will trigger your error-handling middleware
  }
};

