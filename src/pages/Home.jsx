import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
import HouseCarousel from '../components/HouseCarousel';
import MapComp from '../components/MapComp';
import { useState } from 'react';
import { searchListings } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
import { useLocationStore } from '../stores/location';

async function loader({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  const startDate =
    url.searchParams.get('startDate') || new Date().getTime() / 1000;
  const endDate =
    url.searchParams.get('endDate') ||
    new Date().getTime() / 1000 + 3 * 24 * 60 * 60;

  const lat = useLocationStore.getState().location.lat;
  console.log(lat);
  
  const long = useLocationStore.getState().location.lng;
  console.log(long);
  

  return await searchListings(title, startDate, endDate,lat,long);
}
export default function Home() {
  const [houseCoords, setHouseCoords] = useState(null);
  const listings = useLoaderData();
  console.log(listings);
  
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