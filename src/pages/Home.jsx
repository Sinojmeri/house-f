import Filter from '../components/Filter';
import HouseCarousel from '../components/HouseCarousel';
import { getRandomListings } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
import { Recommended } from '../components/Recommended';
import { getReview } from '../controllers/reviewApi';
async function loader() {
  const randomProperties = await getRandomListings();
  const getAllReviews = await getReview();
  return { randomProperties, getAllReviews };
}
export default function Home() {
  const { randomProperties, getAllReviews } = useLoaderData();
  let bestHousesImg = [];
  let bestHousesNames = [];
  let bestHousesStar = [];
  for (const details of getAllReviews) {
    bestHousesImg.push(details.listingInfo.images[0].img);
    bestHousesNames.push(details.listingInfo.title);
    bestHousesStar.push(details.stars);
  }

  return (
    <>
      <div>
        <Filter />
        <HouseCarousel randomProperties={randomProperties} />
        {window.innerWidth > 768 ? (
          <Recommended
            houseImg={bestHousesImg}
            houseNames={bestHousesNames}
            houseStars={bestHousesStar}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}

Home.loader = loader;
