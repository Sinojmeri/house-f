import { useLoaderData, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
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
import { getOneListingWithoutAuth } from "../controllers/listingApis";
import { makeReservation } from "../controllers/reservationApis";

const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

async function loader({ params }) {
    const id = params.id
    const listing = await getOneListingWithoutAuth(id)
    return listing;
}

export function ReserveHouseUI() {
    const listing = useLoaderData();
    console.log(listing);

    const navigate = useNavigate();
    return (
        <div>
            <BackButton/>
            <div className="flex flex-col items-center">
                <img src="/homeUI icon.png" alt="House PIC" className="w-[100px] h-[100px]" />
                <h1 className="font-bold text-xl">{`${listing.title}`}</h1>
                <h2>{`${listing.address}`}</h2>
                <h2 className="text-lg text-red-600 font-bold">{`${listing.price}: €`}</h2>
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


            {/* Map Div */}
            <div className="my-2 h-[500px]">
                <APIProvider apiKey={API_Key}>

                    <Map
                        defaultCenter={{ lat: listing.coordinates[0], lng: listing.coordinates[1] }}
                        defaultZoom={15}
                        mapId={mapId}
                        mapTypeId="roadmap"
                        streetViewControl={false}
                        mapTypeControl={false}
                        gestureHandling={'greedy'}
                        zoomControl={false}
                        className="w-full h-full"
                    >
                        <AdvancedMarker position={{ lat: listing.coordinates[0], lng: listing.coordinates[1] }}>
                            <img src="/home_map_icon.png" width={32} height={32} />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
            </div>
            <div className="flex justify-center">
                <button className="font-bold border-2 rounded-lg hover:bg-slate-200 text-blue-400 text-2xl p-1" onClick={async () => {
                    await makeReservation(listing.id)
                    navigate
                }}>Book</button>
            </div>

        </div >
    )
}

ReserveHouseUI.loader = loader