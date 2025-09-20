// routes/patients.js
import express from 'express';
import auth from '../middleware/auth.js';
import { patientValidator } from '../validators/validators.js';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController.js';

const router = express.Router();
router.use(auth);

// Different routes for patient management
router.post('/', patientValidator, createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
