
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/ai';

async function testAuth() {
  console.log('Testing Authentication Middleware...');

  try {
    // Test 1: Request WITHOUT token
    console.log('\nTest 1: Request WITHOUT token');
    const responseNoToken = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' }),
    });

    if (responseNoToken.status === 401) {
      console.log('✅ Success: Request rejected with 401 Unauthorized');
    } else {
      console.error(`❌ Failure: Expected 401, got ${responseNoToken.status}`);
    }

    // Test 2: Request WITH invalid token
    console.log('\nTest 2: Request WITH invalid token');
    const responseInvalidToken = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-token-123'
      },
      body: JSON.stringify({ message: 'Hello' }),
    });

    if (responseInvalidToken.status === 403) {
      console.log('✅ Success: Request rejected with 403 Forbidden');
    } else { // It might be 403 or 401 depending on how verifyIdToken fails, usually throws error caught by catch block -> 403
      console.error(`❌ Failure: Expected 403, got ${responseInvalidToken.status}`);
    }

  } catch (error) {
    console.error('Error running tests:', error);
  }
}

testAuth();
