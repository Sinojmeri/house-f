import { useLoaderData } from 'react-router-dom';
import { searchListings } from '../controllers/listingApis';
import { FilteredHouseCard } from '../components/FilteredHouseCard';
import { BackButton } from '../components/BackButton';

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

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const minPriceParsed = parseInt(minPrice);
  const maxPriceParsed = parseInt(maxPrice);

  const nrOfRooms = searchParams.get('nrOfRooms');
  const nrOfBeds = searchParams.get('nrOfBeds');

  const buildingType = searchParams.get('propertyType');

  const excludedKeys = ['city', 'date', 'minPrice', 'maxPrice', 'propertyType'];

  const amenities = [];
  searchParams.forEach((value, key) => {
    if (!excludedKeys.includes(key)) {
      if (value === 'on') {
        amenities.push(key.replace(/_/g, ' '));
      } else {
        amenities.push(`${key.replace(/_/g, ' ')}:${value}`);
      }
    }
  });

  const result = await searchListings(
    city,
    startDateMs,
    endDateMs,
    minPriceParsed,
    maxPriceParsed,
    buildingType,
    nrOfRooms,
    nrOfBeds,
    amenities,
  );
  return { result, startDateMs, endDateMs };
}

export function Results() {
  const { result: listings } = useLoaderData();

  return (
    <>
      <BackButton />
      <h1 className='text-3xl font-bold text-center text-gray-800 my-6'>Filter Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {listings.map((listing) => {
          return <FilteredHouseCard listing={listing} key={listing._id} />
        })}
      </div>
    </>
  )
}

Results.loader = loader;
