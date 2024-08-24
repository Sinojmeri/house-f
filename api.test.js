import {signIn, logIn } from './src/controllers/userApi.js';

async function testSignIn() {
    try {
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
  
      const result = await signIn({ data });
      console.log('Sign In Response:', result);
    } catch (error) {
      console.error('Test Sign In Error:', error);
    }
  }
  
//   testSignIn();

  async function testLogIn() {
    try {
        const data = {
            email: 'john.doe@example.com',
            password: 'password123',
        };

        const result = await logIn({ data });
        console.log('Log In Response:', result);
    } catch (error) {
        console.error('Test Log In Error:', error);
    }
}

testLogIn();