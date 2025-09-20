// controllers/doctorController.js
import { validationResult } from 'express-validator';
import Doctor from '../models/Doctor.js';

// Creates a new doctor entry with user authentication
export const createDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, specialization, contact, notes } = req.body;
    const doctor = new Doctor({ name, specialization, contact, notes, createdBy: req.user.id });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) { next(err); }
};

// Retrieves all doctors sorted by creation date
export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) { next(err); }
};

// Fetches a specific doctor by ID
export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) { next(err); }
};

// Updates an existing doctor's details
export const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    Object.assign(doctor, req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) { next(err); }
};

// Deletes a doctor by ID
export const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    
    await doctor.deleteOne();
    res.json({ message: 'Doctor removed' });
  } catch (err) { next(err); }
};
