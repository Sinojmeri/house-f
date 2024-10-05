import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllYourReservations } from '../controllers/reservationApis';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { getFavouriteListings } from '../controllers/listingApis';
export default function HouseCarousel({ randomProperties }) {
  const [carouselData, setCarouselData] = useState(randomProperties);
  const { token } = useAuthStore.getState();

  useEffect(() => {
    if (!token) {
      setCarouselData(randomProperties);
    }
  }, [token, randomProperties]);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <div className='w-full relative flex mx-auto z-[1] gap-2 justify-between'>
          <button
            className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300"
            onClick={() => setCarouselData(randomProperties)}
          >
            Houses
          </button>

          <button
            className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300"
            onClick={async () => {
              if (token) {
                const allFavorites = await getFavouriteListings();
                setCarouselData(allFavorites.favouriteListings);
              } else navigate('/login');
            }}
          >
            Favorites
          </button>

          <button
            className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300"
            onClick={async () => {
              if (token) {
                const allBookingsHistory = await getAllYourReservations();
                let allBookings = [];
                allBookingsHistory.map((house) => {
                  if (
                    !allBookings.some((booking) => booking._id === house._id)
                  ) {
                    allBookings.push(house);
                  }
                });
                setCarouselData(allBookings);
              } else navigate('/login');
            }}
          >
            Bookings
          </button>
        </div>
      </div>
      <div className="md:my-4 xsm:my-14 tablet:my-[50px] w-full">
        <Carousel
          orientation={'horizontal'}
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
            {carouselData.map((house) => (
              <CarouselItem
                key={house._id}
                className={window.innerWidth > 768 ? `basis-1/3` : ''}
              >
                <div className="relative">
                  <img
                    src={
                      house.images && house.images[0]
                        ? `${import.meta.env.VITE_API_BASE_URL}/static/${house.images[0].img}`
                        : './Homes/home1.jpeg'
                    }
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
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex md:items-center md:text-center md:justify-center' />
          <CarouselNext className='hidden md:flex md:items-center'/>
        </Carousel>
      </div>
    </>
  );
}

HouseCarousel.propTypes = {
  randomProperties: PropTypes.array,
  allBookings: PropTypes.array,
};
