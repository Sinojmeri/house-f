import Filter from '../components/Filter';
import Carousel from '../components/Carousel';
import HouseCarousel from '../components/HouseCarousel';
export default function Home() {
  return (
    <>
      <div>
        <Filter />
        <Carousel />
        <HouseCarousel />
      </div>
    </>
  );
}
