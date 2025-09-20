// controllers/authController.js (correct version)
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generates JWT access token for the given user ID
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' });
};

// Generates JWT refresh token for the given user ID
const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' });
};

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed });
    await user.save();

    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const access = createAccessToken(user._id);
    const refresh = createRefreshToken(user._id);

    user.refreshTokens.push({ token: refresh });
    await user.save();

    return res.json({
      access,
      refresh,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refresh } = req.body;
    if (!refresh) return res.status(400).json({ message: 'Refresh token required' });

    let payload;
    try {
      payload = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const found = user.refreshTokens.some(rt => rt.token === refresh);
    if (!found) return res.status(401).json({ message: 'Refresh token not recognized' });

    const newAccess = createAccessToken(user._id);
    return res.json({ access: newAccess });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refresh } = req.body;
    if (!refresh) return res.status(400).json({ message: 'Refresh token required' });

    const payload = jwt.decode(refresh);
    if (!payload) return res.status(400).json({ message: 'Invalid token' });

    const user = await User.findById(payload.userId);
    if (!user) return res.status(200).json({ message: 'Logged out' });

    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refresh);
    await user.save();

    return res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
