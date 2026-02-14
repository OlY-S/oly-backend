
import admin from '../config/firebase.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('Attempting to verify token...');
    // check if admin is initialized?
    if (admin.apps.length === 0) {
       console.warn('Firebase Admin not initialized');
       return res.status(500).json({ message: 'Internal Server Error: Firebase Admin not initialized' });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export default verifyToken;
