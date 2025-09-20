// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate requests using JWT
export default async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: payload.userId };
    // optional: load user doc without sensitive fields
    req.userDoc = await User.findById(payload.userId).select('-password -refreshTokens');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
