import Filter from '../Components/Filter';
import Buttons from '../Components/Buttons';
import HouseCarousel from '../Components/HouseCarousel';
import MapComp from '../Components/MapComp';
export default function Home() {
  return (
    <>
      <div>
        <Filter />
        <Buttons />
        <HouseCarousel />
        <MapComp />
      </div>
    </>
  );
}
