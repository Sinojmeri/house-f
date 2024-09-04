import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
import HouseCarousel from '../components/HouseCarousel';
import MapComp from '../components/MapComp';
import { useEffect, useState } from 'react';
import { searchListings } from '../controllers/listingApis';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useLocationStore } from '../stores/location';

async function loader({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  const startDate =
    url.searchParams.get('startDate') //|| Math.floor(new Date().getTime() / 1000);
  const endDate =
    url.searchParams.get('endDate') //||
    //Math.floor(new Date().getTime() / 1000) + 3 * 24 * 60 * 60;

  const { location } = useLocationStore.getState();
  return await searchListings(
    title,
    startDate,
    endDate,
    location.lng,
    location.lat,
  );
}
export default function Home() {
  const [houseCoords, setHouseCoords] = useState(null);
  const listings = useLoaderData();
  const revalidator = useRevalidator();
  console.log(listings);
  
  const location = useLocationStore((state) => state.location);
  console.log(location);
  
  useEffect(() => {
    revalidator.revalidate();
  },[location])
  return (
    <>
      <div>
        <Filter />
        <Buttons />
        <HouseCarousel
          houseCoords={houseCoords}
          setHouseCoords={setHouseCoords}
        />
        <MapComp houseCoords={houseCoords} setHouseCoords={setHouseCoords} />
      </div>
    </>
  );
}

Home.loader = loader;
