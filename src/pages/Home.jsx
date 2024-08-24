import Filter from '../components/Filter';
import Buttons from '../components/Buttons';
import HouseCarousel from '../components/HouseCarousel';
import MapComp from '../components/MapComp';
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
