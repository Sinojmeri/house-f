import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '/src/comp_Styles/carousel.css';
import { useEffect, useState } from 'react';

export default function Carousel() {
  const handleSwiper = (swiper) => {
    for (let i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].style.width = '';
    }
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full relative flex mx-auto group z-[1]">
        {isMobile ? (
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation={true}
            onSwiper={handleSwiper}
            breakpoints={{
              425: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
          >
            <SwiperSlide>
              <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
                Houses
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
                Favorites
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
                Bookings
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
                Recommendations
              </button>
            </SwiperSlide>
          </Swiper>
        ) : (
          <div className="flex justify-around w-full">
            <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
              Houses
            </button>
            <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
              Favorites
            </button>
            <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
              Bookings
            </button>
            <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
              Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
