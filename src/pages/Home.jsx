import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
import HouseCarousel from '../components/HouseCarousel';
import MapComp from '../components/MapComp';
import { useState } from 'react';
export default function Home() {
  const [houseCoords, setHouseCoords] = useState(null);
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
