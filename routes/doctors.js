// routes/doctors.js
import express from 'express';
import auth from '../middleware/auth.js';
import { doctorValidator } from '../validators/validators.js';
import { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();
router.use(auth);

// Different routes for doctor management
router.post('/', doctorValidator, createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
