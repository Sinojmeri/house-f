import { useAuthStore } from '../stores/authStore';
import { UnauthorizedError } from '../utils/Errors';

export default function isLoggedIn(request) {
  const { user } = useAuthStore.getState();
  if (!user) {
    const url = new URL(request.url);
    throw new UnauthorizedError(url.pathname);
  }

  return user;
}
