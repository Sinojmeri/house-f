import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
import HouseCarousel from '../components/HouseCarousel';
import MapComp from '../components/MapComp';
import { useEffect, useState } from 'react';
import { searchListings } from '../controllers/listingApis';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useLocationStore } from '../stores/location';

async function loader({ request }) {
  // const url = new URL(request.url);
  // const city = url.searchParams.get('city') || 'Elbasan';
  // const startDate =
  //   url.searchParams.get('startDate') || Math.floor(new Date().getTime() / 1000) + 1 * 24 * 60 * 60;
  // const endDate =
  //   url.searchParams.get('endDate') ||
  //   Math.floor(new Date().getTime() / 1000) + 4 * 24 * 60 * 60;
  //   const buildingType = url.searchParams.get('buildingType') || 'Hotel';
  //   const amenities = url.searchParams.get('amenities') || 'Fitness center';

  // const { location } = useLocationStore.getState();
  // return await searchListings(
  //   city,
  //   startDate,
  //   endDate,
  //   buildingType,
  //   amenities
  // );
}
export default function Home() {
  // const [houseCoords, setHouseCoords] = useState(null);
  // const listings = useLoaderData();
  // const revalidator = useRevalidator();
  
  // const location = useLocationStore((state) => state.location);
  
  // useEffect(() => {
  //   revalidator.revalidate();
  // },[location])
  return (
    <>
      <div>
        <Filter />
        <Buttons />
        {/* <HouseCarousel
          houseCoords={houseCoords}
          setHouseCoords={setHouseCoords}
          data = {listings}
        /> */}
        {/* <MapComp houseCoords={houseCoords} setHouseCoords={setHouseCoords} /> */}
      </div>
    </>
  );
}

// Home.loader = loader;
