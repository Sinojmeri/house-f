import Filter from '../Components/Filter';
import Buttons from '../Components/Buttons';
import HouseCarousel from '../Components/HouseCarousel';
export default function Home() {
  return (
    <>
      <div>
        <Filter />
        <Buttons />
        <HouseCarousel />
      </div>
    </>
  );
}
