// routes/auth.js
import express from 'express';
import { registerValidator, loginValidator } from '../validators/validators.js';
import { register, login, refresh, logout } from '../controllers/authController.js';

// Initializes the router for authentication routes
const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
