import { useLoaderData, useRevalidator } from 'react-router-dom';
import { HouseCard } from '../components/HouseCard';
import { getAllYourListings } from '../controllers/listingApis';

async function loader() {
  const listings = await getAllYourListings();
  return listings;
}

export function ManageYourProperty() {
  const listings = useLoaderData();
  const { revalidate } = useRevalidator();

  return (
    <div className="flex flex-col">
      <h1 className="font-bold mx-auto text-2xl text-blue-500">
        Your Properties
      </h1>
      <div className="ml-2 my-2">
        <div className="grid grid-cols-3 gap-4 w-[100%]">
          {listings.map((property) => {
            return (
              <HouseCard
                key={property._id}
                property={property}
                onDelete={revalidate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

ManageYourProperty.loader = loader;
