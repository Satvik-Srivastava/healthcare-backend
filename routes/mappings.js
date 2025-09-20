import express from 'express';
import auth from '../middleware/auth.js';
import { mappingValidator } from '../validators/validators.js';
import {
  createMapping,
  getMappings,
  getMappingsForPatient,
  deleteMapping
} from '../controllers/mappingController.js';

const router = express.Router();
router.use(auth);

// Routes for managing patient-doctor mappings
router.post('/', mappingValidator, createMapping);
router.get('/', getMappings);
router.get('/:patientId', getMappingsForPatient);
router.delete('/:id', deleteMapping);

export default router;
