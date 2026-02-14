
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'config', 'serviceAccountKey.json');

console.log('Loading service account from:', serviceAccountPath);

try {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  console.log('Service Account parsed successfully.');
  console.log('Project ID:', serviceAccount.project_id);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin initialized.');
  
  // Test verifyIdToken
  console.log('Testing verifyIdToken with invalid token...');
  admin.auth().verifyIdToken('invalid-token')
    .then((decodedToken) => {
      console.log('Token verified (unexpected):', decodedToken);
    })
    .catch((error) => {
      console.log('Caught expected error:', error.message);
      console.log('Error code:', error.code);
    });

} catch (error) {
  console.error('CRASH/ERROR:', error);
}
