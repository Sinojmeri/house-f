import { useAuthStore } from '../stores/authStore.js';
import { useUserIdStore } from '../stores/userIdStore.js';

export async function signUp({ firstName, lastName, email, password }) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}

export async function logIn({ email, password }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const result = await response.json();

  const { id, token } = result;
  useUserIdStore.setState({ id });
  useAuthStore.setState({ token });

  return result;
}
