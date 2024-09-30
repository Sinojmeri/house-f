import { getOwnerOfListing } from '../controllers/listingApis';
import { useLoaderData } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mapId } from '../components/MapComp';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
async function loader({ params, request }) {
  const id = params.listingId;
  const url = new URL(request.url);
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  const totalPrice = url.searchParams.get('totalPrice');
  const listingDetails = await getOwnerOfListing(id);

  return { listingDetails, startDate, endDate, totalPrice };
}

export function BookedHouse() {
  const { listingDetails, startDate, endDate, totalPrice } = useLoaderData();
  const listing = listingDetails.listing;
  const owner = listingDetails.owner;
  const [favIcon, setFavIcon] = useState('/heart_icon.png');
  const BASE_URL = 'http://localhost:5000/static/';

  return (
    <div className="pl-2">
      <BackButton />
      <div className="flex gap-2 items-center">
        <p className="font-bold text-2xl">{listing.title}</p>
        <img
          src={favIcon}
          alt="empty heart"
          onClick={() =>
            favIcon === '/heart_icon.png'
              ? setFavIcon('/fav_heart.png')
              : setFavIcon('/heart_icon.png')
          }
          className="w-[25px] h-[25px] cursor-pointer"
        />
      </div>

      <div className="bg-white my-3 w-full pl-2 flex-row">
        <p className="italic text-lg">
          Address: <span className="font-bold">{listing.address}</span>
        </p>
        <p className="text-xl mb-2">
          Total Price: <span>{totalPrice} €</span>
        </p>
        <div className="flex flex-col gap-2 mb-3">
          <p className="p-1 border-2 rounded-lg bg-gray-200 w-fit">{`Check In Date: ${startDate}`}</p>
          <p className="p-1 border-2 rounded-lg bg-gray-200 w-fit">{`Check Out Date: ${endDate}`}</p>
        </div>
        {/* Swiper and Ammenity div */}
        <div className="flex md:flex-row flex-col tablet:flex-col gap-5">
          <Swiper
            modules={[Pagination]}
            slidesPerView="auto"
            spaceBetween={10}
            pagination={{
              clickable: true,
              type: 'bullets',
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            className="md:w-[500px] w-[300px] h-[350px] md:h-[400px]"
          >
            {listing.images.map((images) => (
              <SwiperSlide key={images._id}>
                <img
                  src={`${BASE_URL}${images.img}`}
                  alt="House Pic"
                  className="h-[350px] rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col">
            <p className="text-lg mb-2 text-center">Amenities:</p>
            <div className="grid grid-cols-3 gap-2 mx-auto">
              {listing.amenities.map((amenitiy) => (
                <p
                  className="flex p-1 border-2 rounded-lg bg-blue-300 text-center my-auto h-[90px] md:h-auto justify-center items-center"
                  key={amenitiy}
                >
                  {amenitiy}
                </p>
              ))}
              <p className="p-1 border-2 rounded-lg bg-blue-300 text-center">
                <span>Number of Beds: </span>
                {listing.nrOfBeds}
              </p>
              <p className="p-1 border-2 rounded-lg bg-blue-300 text-center">
                <span>Number of Rooms: </span>
                {listing.nrOfRooms}
              </p>
            </div>
          </div>
        </div>
        {/* Owner Contact Information */}
        <div className="flex flex-col">
          <p className="font-bold text-lg underline mt-4">Owner info:</p>
          <p>
            Owner: {owner.firstName} {owner.lastName}
          </p>
          <p>Email: {owner.email}</p>
        </div>
        {/* Map Div */}
        <div className="my-5 h-[500px] mx-2">
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
      </div>
    </div>
  );
}

BookedHouse.loader = loader;
