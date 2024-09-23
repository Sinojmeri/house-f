import { useLoaderData, useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import { mapId } from '../components/MapComp';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { getOneListingWithoutAuth } from '../controllers/listingApis';
import { makeReservation } from '../controllers/reservationApis';
const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

async function loader({ params, request }) {
  const id = params.id;
  const listing = await getOneListingWithoutAuth(id);
  const url = new URL(request.url);
  const dateRange = new URLSearchParams(url.search);
  const startDate = dateRange.get('startDateMs');
  const endDate = dateRange.get('endDateMs');

  return { listing, startDate, endDate };
}

export function ReserveHouseUI() {
  const { listing, startDate, endDate } = useLoaderData();
  const checkIn = new Date(Number(startDate));
  const checkOut = new Date(Number(endDate));
  const BASE_URL = 'http://localhost:5000/static/';

  const navigate = useNavigate();
  return (
    <div>
      <BackButton />
      <div className="flex flex-col items-center">
        <img
          src="/homeUI icon.png"
          alt="House PIC"
          className="w-[100px] h-[100px]"
        />
        <h1 className="font-bold text-xl">{`${listing.title}`}</h1>
        <h2>{`${listing.address}`}</h2>
        <h2 className="text-lg text-red-600 font-bold">{`${listing.price}: €`}</h2>
      </div>
      <div className="my-2">
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
            {listing.images.map((images) => (
              <CarouselItem
                key={images._id}
                className={window.innerWidth > 768 ? `basis-1/3` : 'basis-1/1'}
              >
                <img src={`${BASE_URL}${images.img}`} alt="House Pic" className='w-[300px] md:w-[450px] h-[300px] md:h-[450px]'/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col gap-2">
        <p className="p-1 border-2 rounded-lg bg-gray-200 w-fit">{`Check In Date: ${checkIn.toDateString()}`}</p>
        <p className="p-1 border-2 rounded-lg bg-gray-200 w-fit">{`Check Out Date: ${checkOut.toDateString()}`}</p>
      </div>

      {/* Map Div */}
      <div className="my-2 h-[500px]">
        <APIProvider apiKey={API_Key}>
          <Map
            defaultCenter={{
              lat: listing.coordinates[0],
              lng: listing.coordinates[1],
            }}
            defaultZoom={15}
            mapId={mapId}
            mapTypeId="roadmap"
            streetViewControl={false}
            mapTypeControl={false}
            gestureHandling={'greedy'}
            zoomControl={false}
            className="w-full h-full"
          >
            <AdvancedMarker
              position={{
                lat: listing.coordinates[0],
                lng: listing.coordinates[1],
              }}
            >
              <img src="/home_map_icon.png" width={32} height={32} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
      <div className="flex justify-center">
        <button
          className="font-bold border-2 rounded-lg hover:bg-slate-200 text-blue-400 text-2xl p-1 mb-3"
          onClick={async () => {
            await makeReservation(listing._id, startDate, endDate);
            navigate(
              `/bookings/${listing._id}?startDate=${startDate}&endDate=${endDate}`,
            );
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
}

ReserveHouseUI.loader = loader;
