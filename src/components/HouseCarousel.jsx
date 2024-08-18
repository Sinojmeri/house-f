import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HouseCarousel() {
    const housesImg = ['/Homes/home1.jpeg', '/Homes/home2.jpg', '/Homes/home3.jpg', '/Homes/home4.jpg', '/Homes/home5.jpg',
        '/Homes/home6.jpg', '/Homes/home7.jpg', '/Homes/home8.jpg', '/Homes/home9.png', '/Homes/home10.jpeg']
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
                        housesImg.map((house) => (
                            <CarouselItem key={house} className="md:basis-1/3"><img src={`${house}`} alt="House img"
                                className="h-[300px]"/></CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
            </Carousel>
        </div>
    );
}
