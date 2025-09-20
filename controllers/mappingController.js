import { validationResult } from 'express-validator';
import Mapping from '../models/Mapping.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

// Creates a new mapping between patient and doctor with user/admin authorization
export const createMapping = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patient, doctor, notes } = req.body;

    const p = await Patient.findById(patient);
    if (!p) return res.status(404).json({ message: 'Patient not found' });

    const d = await Doctor.findById(doctor);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });

    if (p.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to assign' });
    }

    const exists = await Mapping.findOne({ patient, doctor });
    if (exists) {
      return res.status(400).json({ message: 'Doctor already assigned to patient' });
    }

    const mapping = new Mapping({
      patient,
      doctor,
      assignedBy: req.user.id,
      notes
    });

    await mapping.save();

    // Return populated data with only names
    const populatedMapping = await Mapping.findById(mapping._id)
      .populate('patient', 'name')
      .populate('doctor', 'name')
      .populate('assignedBy', 'name');

    res.status(201).json(populatedMapping);
  } catch (err) {
    next(err);
  }
};

// Retrieves all mappings with populated fields
export const getMappings = async (req, res, next) => {
  try {
    const mappings = await Mapping.find()
      .populate('patient', 'name')
      .populate('doctor', 'name')
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

// Fetches mappings for a specific patient with authorization
export const getMappingsForPatient = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const mappings = await Mapping.find({ patient: patientId })
      .populate('doctor', 'name')
      .populate('assignedBy', 'name');

    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

// Deletes a mapping with authorization check
export const deleteMapping = async (req, res, next) => {
  try {
    const m = await Mapping.findById(req.params.id);
    if (!m) return res.status(404).json({ message: 'Mapping not found' });

    const patient = await Patient.findById(m.patient);
    if (m.assignedBy.toString() !== req.user.id && patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove this mapping' });
    }

    await m.deleteOne();
    res.json({ message: 'Mapping removed' });
  } catch (err) {
    next(err);
  }
};
