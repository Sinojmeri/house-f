import {
  addToFavouriteControllers,
  getFavouriteListings,
  getOwnerOfListing,
  removeFromFavourites,
} from '../controllers/listingApis';
import { giveReview } from '../controllers/reviewApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mapId } from '../components/MapComp';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { DateTime } from 'luxon';
import { Star } from '../components/Star';

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
  const navigate = useNavigate();
  const BASE_URL = 'http://localhost:5000/static/';
  const listing = listingDetails.listing;
  const owner = listingDetails.owner;
  const [favIcon, setFavIcon] = useState('/heart_icon.png');
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState('');
  const arrayNum = [1, 2, 3, 4, 5];
  const endDateMilisec = DateTime.fromFormat(
    endDate,
    'LLLL d, yyyy',
  ).toMillis();

  const displayReview = Date.now() - endDateMilisec > 24 * 60 * 60 * 1000;
  useEffect(() => {
    async function allFavorites() {
      const favoritesAll = await getFavouriteListings();
      setFavorites(favoritesAll.favouriteListings);
    }
    allFavorites();
  }, []);

  useEffect(() => {
    if (favorites.some((house) => house._id === listing._id)) {
      setFavIcon('/fav_heart.png');
    } else {
      setFavIcon('/heart_icon.png');
    }
  }, [favorites, listing._id]);

  const makeFavorite = async () => {
    setFavIcon('/fav_heart.png');
    await addToFavouriteControllers(listing._id);
  };

  const removeFavorite = async () => {
    setFavIcon('/heart_icon.png');
    await removeFromFavourites(listing._id);
  };

  const submitReview = async () => {
    await giveReview(listingDetails.listing._id, selected, text);
    navigate('/');
  };

  return (
    <div className="pl-2">
      <div className="flex gap-2 items-center">
        <p className="font-bold text-2xl">{listing.title}</p>
        <img
          src={favIcon}
          alt="empty heart"
          onClick={() =>
            favIcon === '/heart_icon.png' ? makeFavorite() : removeFavorite()
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
              <p className="p-1 border-2 rounded-lg bg-blue-300 text-center items-center">
                <span>Number of Beds: </span>
                {listing.nrOfBeds}
              </p>
              <p className="p-1 border-2 rounded-lg bg-blue-300 text-center items-center">
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
        {/* Review DIV */}
        {displayReview ? (
          <div className="flex flex-col bg-white mx-2">
            <div className="flex flex-row gap-3">
              {arrayNum.map((num) => (
                <Star
                  number={num}
                  selected={selected}
                  setSelected={setSelected}
                  key={num}
                />
              ))}
            </div>
            <div className="h-1 bg-gray-300 w-full my-3" />

            <h1 className="text-xl mb-3">
              Please leave a{' '}
              <span className="font-bold text-[#0D98BA]">REVIEW</span>
            </h1>
            <textarea
              className="resize-none h-[100px] p-1 overflow-y-auto mb-3 border-2 border-black rounded-md"
              placeholder="Enter your review. Max 100 Words accepted."
              maxLength={100}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button
              className="text-xl font-bold bg-slate-200 hover:bg-slate-300 rounded-md border-2"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

BookedHouse.loader = loader;
