import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HouseCarousel() {
    const houses = [
        { mainPic: '/Homes/home1.jpeg', isFav: false },
        { mainPic: '/Homes/home2.jpg', isFav: false },
        { mainPic: '/Homes/home3.jpg', isFav: false },
        { mainPic: '/Homes/home4.jpg', isFav: false },
        { mainPic: '/Homes/home5.jpg', isFav: false },
        { mainPic: '/Homes/home6.jpg', isFav: false },
        { mainPic: '/Homes/home7.jpg', isFav: false },
        { mainPic: '/Homes/home8.jpg', isFav: false },
        { mainPic: '/Homes/home9.png', isFav: false },
        { mainPic: '/Homes/home10.jpeg', isFav: false },
    ];
    const [fav, setFav] = useState(houses);

    const favorites = (index) => {
        setFav((prevHouses) =>
            prevHouses.map((house, i) =>
                (i === index ? { ...house, isFav: !house.isFav } : house)
            )
        );
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
                    {
                        fav.map((house, index) => (
                            <CarouselItem key={house.mainPic} className={window.innerWidth > 768 ? `basis-1/3` : ''}>
                                <div className="relative">
                                    <img src={`${house.mainPic}`} alt="House img" className="h-[300px] rounded-lg w-[97%] mx-auto" />
                                    <p className="absolute md:top-1 top-3 right-7 bg-gray-600 text-white p-1 rounded-lg">Paskuqani city test</p>
                                    <div className="flex flex-row ">
                                        <div className="flex flex-col">
                                            <div className="absolute flex flex-row gap-2 bg-black/40 bottom-11 left-3 p-1 rounded-3xl">
                                                <img src={`/filled_star.png`} alt="Filled Star" className="w-[25px] h-[25px]" />
                                                <p className="text-white font-bold">4.5</p>
                                            </div>
                                            <h1 className="font-bold absolute bottom-3 left-3 text-white text-2xl">House Name</h1>
                                        </div>
                                        <img src={house.isFav ? '/filled_heart.png' : '/empty_heart.png'} alt="heart" className="w-[25px] h-[25px] absolute bottom-8 right-3 cursor-pointer" onClick={() => favorites(index)} />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >
    );
}
