// import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import PropTypes from 'prop-types';
export default function HouseCarousel({ setHouseCoords, data }) {
  // const houses = [
  //   {
  //     mainPic: '/Homes/home1.jpeg',
  //     isFav: false,
  //     coordinates: { lat: 41.325634, lng: 19.830913 },
  //   },
  //   {
  //     mainPic: '/Homes/home2.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.337806, lng: 19.835278 },
  //   },
  //   {
  //     mainPic: '/Homes/home3.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.326103, lng: 19.827426 },
  //   },
  //   {
  //     mainPic: '/Homes/home4.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.333375, lng: 19.832833 },
  //   },
  //   {
  //     mainPic: '/Homes/home5.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.321583, lng: 19.813164 },
  //   },
  //   {
  //     mainPic: '/Homes/home6.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.320301, lng: 19.823113 },
  //   },
  //   {
  //     mainPic: '/Homes/home7.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.322576, lng: 19.81957 },
  //   },
  //   {
  //     mainPic: '/Homes/home8.jpg',
  //     isFav: false,
  //     coordinates: { lat: 41.327795, lng: 19.811548 },
  //   },
  //   {
  //     mainPic: '/Homes/home9.png',
  //     isFav: false,
  //     coordinates: { lat: 41.337028, lng: 19.803694 },
  //   },
  //   {
  //     mainPic: '/Homes/home10.jpeg',
  //     isFav: false,
  //     coordinates: { lat: 41.32609, lng: 19.802995 },
  //   },
  // ];
  // const [fav, setFav] = useState(houses);

  // const favorites = (index) => {
  //   setFav((prevHouses) =>
  //     prevHouses.map((house, i) =>
  //       i === index ? { ...house, isFav: !house.isFav } : house,
  //     ),
  //   );
  // };
  const handleClick = (house) => {
    setHouseCoords(house.coordinates);
  };
  HouseCarousel.propTypes = {
    houseCoords: PropTypes.object,
    setHouseCoords: PropTypes.func,
    data: PropTypes.array,
  };
  return (
    <div className="md:my-4 xsm:my-14 tablet:my-[50px]">
      <Carousel
        orientation={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-[310px] flex items-center">
          {data.map((house) => (
            <CarouselItem
              key={house.title}
              className={window.innerWidth > 768 ? `basis-1/3` : ''}
            >
              <div
                className="relative cursor-pointer"
                onClick={() => handleClick(house)}
              >
                <img
                  src={`${house.mainPic ? `${house.mainPic}` : './Homes/home1.jpeg'}`}
                  alt="House img"
                  className="h-[300px] rounded-lg w-[97%] mx-auto"
                />
                <p className="absolute md:top-1 top-3 right-7 bg-gray-600 text-white p-1 rounded-lg">
                  {house.address}
                </p>
                <div className="flex flex-row ">
                  <div className="flex flex-col">
                    <div className="absolute flex flex-row gap-2 bg-black/40 bottom-11 left-3 p-1 rounded-3xl">
                      <img
                        src={`/filled_star.png`}
                        alt="Filled Star"
                        className="w-[25px] h-[25px]"
                      />
                      <p className="text-white font-bold">4.5</p>
                    </div>
                    <h1 className="font-bold absolute bottom-3 left-3 text-white text-2xl">
                      {house.title}
                    </h1>
                  </div>
                  <img
                    src={house.isFav ? '/filled_heart.png' : '/empty_heart.png'}
                    alt="heart"
                    className="w-[25px] h-[25px] absolute bottom-8 right-3 cursor-pointer"
                    // onClick={() => favorites(index)}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
