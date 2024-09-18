import { useLoaderData } from 'react-router-dom';
import { searchListings } from '../controllers/listingApis';
import { FilteredHouseCard } from '../components/FilteredHouseCard';
import { BackButton } from '../components/BackButton';

async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const city = searchParams.get('city');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const minPriceParsed = parseInt(minPrice);
  const maxPriceParsed = parseInt(maxPrice);

  const nrOfRooms = searchParams.get('nrOfRooms');
  const nrOfBeds = searchParams.get('nrOfBeds');

  const buildingType = searchParams.get('propertyType');

  const excludedKeys = [
    'city',
    'date',
    'minPrice',
    'maxPrice',
    'nrOfRooms',
    'nrOfBeds',
    'propertyType',
  ];

  const amenities = [];
  searchParams.forEach((value, key) => {
    if (!excludedKeys.includes(key)) {
      if (value === 'on') {
        amenities.push(key.replace(/_/g, ' '));
      }
    }
  });

  const result = await searchListings(
    city,
    startDate,
    endDate,
    minPriceParsed,
    maxPriceParsed,
    buildingType,
    nrOfRooms,
    nrOfBeds,
    amenities,
  );
  return { result, startDate, endDate };
}

export function Results() {
  const { result: listings } = useLoaderData();

  return (
    <>
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
        Filter Results
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {listings ? (
          listings.map((listing) => {
            return <FilteredHouseCard listing={listing} key={listing._id} />;
          })
        ) : (
          <p className="font-bold text-2xl">No house matched your search</p>
        )}
      </div>
    </>
  );
}

Results.loader = loader;
