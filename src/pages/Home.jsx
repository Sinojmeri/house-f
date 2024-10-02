import Filter from '../components/Filter';
import HouseCarousel from '../components/HouseCarousel';
import { getRandomListings } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
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
      </div>
    </>
  );
}

Home.loader = loader;
