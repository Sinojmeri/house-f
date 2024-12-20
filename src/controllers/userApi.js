export async function signUp({ firstName, lastName, email, password }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/signup`,
    {
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
    },
  );
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

  return result;
}
