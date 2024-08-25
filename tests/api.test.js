import { expect, test } from 'vitest';

import { signUp, logIn } from '../src/controllers/userApi.js';

// async function testSignUp() {
//   try {
//     const data = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'password123',
//     };

//     await signUp(data);
//   } catch (error) {
//     console.error('Test Sign In Error:', error);
//   }
// }

// testSignUp();

// async function testLogIn() {
//   try {
//     const data = {
//       email: 'john.doe@example.com',
//       password: 'password123',
//     };

//     await logIn(data);
//   } catch (error) {
//     console.error('Test Log In Error:', error);
//   }
// }

// testLogIn();

test('User should sign up', async () => {
  const data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  };
  const result = await signUp(data);

  expect(result).toBeDefined();
  expect(result.firstName).toBe('John');
});

test('User should log in', async () => {
  const data = {
    email: 'john.doe@example.com',
    password: 'password123',
  };
  const result = await logIn(data);
  expect(result).toBeDefined();
  expect(result.token).toBeDefined();
});
