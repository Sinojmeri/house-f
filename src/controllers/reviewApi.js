import { useAuthStore } from '../stores/authStore';

export async function giveReview(listingId, starsNr, comment) {
  const { token } = useAuthStore.getState();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/reviews/${listingId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify ({
        stars: starsNr,
        comment: comment,
      })
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const data = response.json();
  return data;
}
