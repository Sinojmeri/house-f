import Filter from '../components/Filter';
import HouseCarousel from '../components/HouseCarousel';
import { getRandomListings } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
import { Recommended } from '../components/Recommended';
async function loader() {
  const randomProperties = await getRandomListings();
  return randomProperties;
}
export default function Home() {
  const randomProperties = useLoaderData();
  return (
    <>
      <div>
        <Filter />
        <HouseCarousel randomProperties={randomProperties} />
        <Recommended />
      </div>
    </>
  );
}

Home.loader = loader;
