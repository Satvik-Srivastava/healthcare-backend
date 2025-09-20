// validators/validators.js
import { body } from 'express-validator';

// Validation rules for user registration
export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation rules for user login
export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required')
];

// Validation rules for patient creation
export const patientValidator = [
  body('name').trim().notEmpty().withMessage('Patient name is required'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer')
];

// Validation rules for doctor creation
export const doctorValidator = [
  body('name').trim().notEmpty().withMessage('Doctor name is required')
];

// Validation rules for mapping creation
export const mappingValidator = [
  body('patient').isMongoId().withMessage('Valid patient id is required'),
  body('doctor').isMongoId().withMessage('Valid doctor id is required')
];
