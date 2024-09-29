import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { useNavigate } from 'react-router-dom';
import HouseCarousel from '../components/HouseCarousel';
import { getRandomListings } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
// import MapComp from '../components/MapComp';
// import { useEffect, useState } from 'react';
// import { searchListings } from '../controllers/listingApis';
// import { useLoaderData, useRevalidator } from 'react-router-dom';
// import { useLocationStore } from '../stores/location';
// import { ReserveHouseUI } from './ReserveHouseUI';

// async function loader({ request }) {
//   // const url = new URL(request.url);
//   // const city = url.searchParams.get('city') || 'Elbasan';
//   // const startDate =
//   //   url.searchParams.get('startDate') || Math.floor(new Date().getTime() / 1000) + 1 * 24 * 60 * 60;
//   // const endDate =
//   //   url.searchParams.get('endDate') ||
//   //   Math.floor(new Date().getTime() / 1000) + 4 * 24 * 60 * 60;
//   //   const buildingType = url.searchParams.get('buildingType') || 'Hotel';
//   //   const amenities = url.searchParams.get('amenities') || 'Fitness center';

//   // const { location } = useLocationStore.getState();
//   // return await searchListings(
//   //   city,
//   //   startDate,
//   //   endDate,
//   //   buildingType,
//   //   amenities
//   // );
// }
async function loader() {
  const randomProperties = await getRandomListings();
  return randomProperties;
}
export default function Home() {
  const listings = useLoaderData();
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

        <HouseCarousel
          // houseCoords={houseCoords}
          // setHouseCoords={setHouseCoords}
          data = {listings}
        />
        {/* <MapComp houseCoords={houseCoords} setHouseCoords={setHouseCoords} /> */}
      </div>
    </>
  );
}

Home.loader = loader;
