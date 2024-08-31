import { AUTH_TOKEN } from './CONSTANTS';
import * as jose from 'jose';
import { useAuthStore } from '../stores/authStore';

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

export async function decode(token) {
  try {
    return await jose.jwtVerify(token, secret);
  } catch (err) {
    return null;
  }
}

export async function checkLocalStorage() {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    return;
  }

  const user = await decode(token);
  if (!user) {
    return;
  }
  useAuthStore.setState({
    token,
    user: user.payload,
  });
}
