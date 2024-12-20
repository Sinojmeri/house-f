import { useAuthStore } from '../stores/authStore';

export async function createListing({
  auth_token,
  coordinates,
  title,
  address,
  nrOfRooms,
  nrOfBeds,
  buildingType,
  amenities,
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
        nrOfRooms,
        nrOfBeds,
        buildingType,
        amenities,
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

export async function addPhotosForListing({ listingId, photos }) {
  const { token } = useAuthStore.getState();
  const formData = new FormData();

  photos.forEach((photo) => {
    formData.append('photos', photo);
  });

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}/images`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function removePhotosForListing(listingId, imageId) {
  const { token } = useAuthStore.getState();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}/images/${imageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete photo');
  }
  const data = await response.json();
  return data;
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

export async function getOneListingWithoutAuth(listingId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/noauth/${listingId}`,
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

export async function searchListings(
  city,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  buildingType,
  nrOfRooms,
  nrOfBeds,
  amenities,
) {
  const url = new URL(`/listings/search/`, import.meta.env.VITE_API_BASE_URL);

  url.searchParams.set('city', city);

  url.searchParams.set('startDate', startDate);
  url.searchParams.set('endDate', endDate);

  url.searchParams.set('minPrice', minPrice);
  url.searchParams.set('maxPrice', maxPrice);

  url.searchParams.set('buildingType', buildingType);

  if (nrOfRooms && nrOfBeds) {
    url.searchParams.set('nrOfRooms', nrOfRooms);
    url.searchParams.set('nrOfBeds', nrOfBeds);
  }

  if (amenities) {
    for (const amenity of amenities) {
      url.searchParams.append('amenities', amenity);
    }
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

export async function deleteListing(listingId) {
  const { token } = useAuthStore.getState();

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}`,
    {
      method: 'DELETE',
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
  return data.message;
}

export async function getOwnerOfListing(listingId) {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/${listingId}/owner`,
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

export async function getRandomListings() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/listings/random`,
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

  const data = response.json();
  return data;
}

export async function addToFavouriteControllers(listingId) {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/add-to-favorites/${listingId}`,
    {
      method: 'POST',
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

export async function removeFromFavourites(listingId) {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/remove-from-favourites/${listingId}`,
    {
      method: 'DELETE',
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

export async function getFavouriteListings() {
  const { token } = useAuthStore.getState();
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/allFavorites`,
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
