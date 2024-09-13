import { useLoaderData } from 'react-router-dom';
import { searchListings } from '../controllers/listingApis';

async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const city = searchParams.get('city');
  const date = searchParams.get('date');

  const date_split = date.split(',');

  const startDate = new Date(date_split[0].trim());
  const endDate = new Date(date_split[1].trim());

  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(0, 0, 0, 0);

  const startDateMs = startDate.getTime();
  const endDateMs = endDate.getTime();

  const buildingType = searchParams.get('propertyType');

  const excludedKeys = ['city', 'date', 'minPrice', 'maxPrice', 'propertyType'];

  const amenities = [];
  searchParams.forEach((value, key) => {
    if (!excludedKeys.includes(key)) {
      if (value === 'on') {
        amenities.push(key);
      } else {
        amenities.push(`${key}:${value}`);
      }
    }
  });

  const formattedAmenities = decodeURIComponent(amenities.join(','));

  const result = await searchListings(
    city,
    startDateMs,
    endDateMs,
    buildingType,
    formattedAmenities,
  );
  return result;
}

export function Results() {
  const listings = useLoaderData();
  console.log(listings);

  return <></>;
}

Results.loader = loader;
