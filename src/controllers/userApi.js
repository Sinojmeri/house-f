import useAuthStore from '../utils/authStore.js';

export  async function signIn({ data }) {
  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      throw new Error();
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log('Error: ' + err);
  }
}

export async function logIn({ data }) {
    try {
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();

        const { token } = result;
        if (token) {
            const setToken = useAuthStore.getState().setToken;
            setToken(token);
        } else {
            console.error('Token not found in response');
        }

        return result;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}
