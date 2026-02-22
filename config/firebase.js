
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin initialized with serviceAccountKey.json');
    }
  } else {
    // Fallback to environment variables if no service account file
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
          }),
        });
        console.log('Firebase Admin initialized with environment variables');
      }
    } else {
      console.warn("Firebase Admin NOT initialized. Missing serviceAccountKey.json and environment variables.");
    }
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

export default admin;
