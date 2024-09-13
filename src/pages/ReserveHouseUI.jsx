import { useNavigate } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import { mapId } from "../components/MapComp";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useLocationStore } from '../stores/location';
// const listing = results 
// const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export function ReserveHouseUI() {
    const navigate = useNavigate();
    return (
        <div>
            <img
                src="./back-button.png"
                alt="Back button"
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={() => navigate('/')}
            />
            <div className="flex flex-col items-center">
                <img src="/homeUI icon.png" alt="House PIC" className="w-[100px] h-[100px]" />
                <h1>{`House Title`}</h1>{/* {listing.title} */}
                <h2>{`House Address`}</h2>{/* {listing.address} */}
                {/* listing.price */}<h2>{`House Price: €`}</h2>
            </div>
            <div className="my-2">
                {/* <Carousel
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
                        Map here the array of images and for each img url return a carusel Item
                        {imgArray.map((srcImg, index) => (
                            <CarouselItem key={srcImg} className={window.innerWidth > 768 ? `basis-1/3` : ''}>
                                <img src={srcImg} alt="House Pic" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel> */}
            </div>

            {/* Calendar div */}
            <div className="flex my-2 ml-3 flex-col gap-4">
                <p>{`Check In Date:`}</p>
                <p>{`Check Out Date:`}</p>
            </div>
            {/* Map Div */}
            <div className="my-2">

            </div>
        </div >
    )
}