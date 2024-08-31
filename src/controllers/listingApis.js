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
        price
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
