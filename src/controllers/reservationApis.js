import { useAuthStore } from '../stores/authStore';

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
            startDate,
            endDate,
        }),
    },
  );

  if (!response.ok){
    throw new Error();
  }

  const result = await response.json();
  return result;
}
