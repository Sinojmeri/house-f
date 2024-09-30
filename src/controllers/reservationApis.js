import { useAuthStore } from '../stores/authStore';
import { UnauthorizedError } from '../utils/Errors';

export async function makeReservation(listingId, startDate, endDate) {
  const { token } = useAuthStore.getState();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/reservations/${listingId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startDate: startDate / 1000,
        endDate: endDate / 1000,
      }),
    },
  );

  if (!response.ok) {
    throw new UnauthorizedError();
  }

  const result = await response.json();
  return result;
}

export async function getAllYourReservations() {
  const { token } = useAuthStore.getState();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/reservations/allReservationsOfAUser`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const data = response.json();
  return data;
}
