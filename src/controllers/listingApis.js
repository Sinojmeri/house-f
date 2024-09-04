import { useAuthStore } from '../stores/authStore';

export async function createListing({
  auth_token,
  coordinates,
  title,
  address,
  price,
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({
        coordinates,
        title,
        address,
        price,
      }),
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}

export async function addPhotosForListing({ listingId, auth_token, photos }) {
  const formData = new FormData();

  photos.forEach((photo, index) => {
    formData.append(`photo_${index}`, photo);
  });

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}/images`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
      body: formData,
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to upload photos');
  }
}

export async function getAllListings() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}

export async function getAllYourListings() {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/yourListings`,
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

  const result = await response.json();
  return result;
}

export async function getOneListing(listingId) {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}`,
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

  const result = await response.json();
  return result;
}

export async function updateListing(listingId, { title, address, price }) {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        address,
        price,
      }),
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}

export async function getAllNearListing(lat, long) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/nearby?lat=${lat}&long=${long}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}

export async function searchListings(title, startDate, endDate, lat, long) {
  const url = new URL(`/listings/search/`, import.meta.env.VITE_API_BASE_URL);

  url.searchParams.append(
    'coordinates',
    `${long || 19.819025}`,
  );
  url.searchParams.append(
    'coordinates',
    `${lat || 41.327953}`,
  )
  if (startDate && endDate) {
    url.searchParams.set('startDate', startDate);
    url.searchParams.set('endDate', endDate);
  }
  if (title) {
    url.searchParams.set('title', title);
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error();
  }

  const result = await response.json();
  return result;
}
