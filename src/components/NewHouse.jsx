import { useState } from 'react';
import '../comp_Styles/houseInfo.css';
import PropTypes from 'prop-types';
import { useLocationStore } from '../stores/location';
import { createListing } from '../controllers/listingApis';
import { useAuthStore } from '../stores/authStore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function NewHouse({ houseInfo }) {
  const { register, handleSubmit } = useForm();
  const token = useAuthStore((state) => state.token);
  const myLocation = useLocationStore((state) => state.location);
  const [formCompleted, setFormCompleted] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const [houseInformation, setHouseInformation] = useState({
    house_name: '',
    location: ['', ''],
    address: '',
    // description: '',
    price: '',
    property_type: 'House',
  });
  const [houseAmenities, setHouseAmenities] = useState({
    Netflix: false,
    Wi_Fi: false,
    Free_Parking: false,
    Pool: false,
    Air_Conditioning: false,
    Laundry: false,
    Balcony: false,
  });
  const [hotelAmenities, setHotelAmenities] = useState({
    Swimming_pool: false,
    Fitness_center: false,
    Spa_treatments: false,
    Restaurant_and_bar: false,
    Room_service: false,
    Laundry_service: false,
    Wi_Fi: false,
    Rooftop_pool: false,
    Private_beach_access: false,
    In_room_dining: false,
    Number_of_Beds: false,
    Number_of_Rooms: false,
  });
  const [villasAmenities, setVillasAmenities] = useState({
    Private_pool: false,
    Kitchen: false,
    Laundry_facilities: false,
    Garden: false,
    Barbecue_grill: false,
    Parking: false,
    Home_Theater: false,
    Game_room: false,
    Wine_cellar: false,
    Personal_chef: false,
    Guest_house: false,
    Number_of_Bathrooms: false,
    Number_of_Rooms: false,
    Panaromic_View: false,
  });
  const [officeAmenities, setOfficeAmenities] = useState({
    Meeting_rooms: false,
    Conference_rooms: false,
    Shared_workspace: false,
    Kitchenette: false,
    Wi_Fi: false,
    Copie_printer_scanner: false,
    Reception_area: false,
    Panoramic_views: false,
    Café_or_restaurant: false,
    Rooftop_terrace: false,
    Secure_parking: false,
    Number_of_Bathrooms: false,
  });
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState();

  const handleHouseInformation = (e) => {
    const { name, value } = e.target;

    setHouseInformation((prev) => {
      if (name === 'lat') {
        return {
          ...prev,
          location: [value, prev.location[1]],
        };
      }
      if (name === 'long') {
        return {
          ...prev,
          location: [prev.location[0], value],
        };
      }
      if (name === 'price') {
        return {
          ...prev,
          price: +value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    checkFormCompletion();
  };

  const handleAmenities = (e, amenityType) => {
    const { name, checked } = e.target;
    switch (amenityType) {
      case 'House':
        setHouseAmenities((prev) => ({ ...prev, [name]: checked }));
        break;
      case 'Hotel':
        setHotelAmenities((prev) => ({ ...prev, [name]: checked }));
        break;
      case 'Villa':
        setVillasAmenities((prev) => ({ ...prev, [name]: checked }));
        break;
      case 'Office':
        setOfficeAmenities((prev) => ({ ...prev, [name]: checked }));
        break;
      default:
        break;
    }
  };

  function checkFormCompletion() {
    const { house_name, location,price, property_type } =
      houseInformation;
    const allCompleted =
      house_name.trim() &&
      location[0] &&
      location[1] &&
      price &&
      property_type;
      console.log(allCompleted);
      
    setFormCompleted(allCompleted);
  }

  function getAmenities() {
    switch (houseInformation.property_type) {
      case 'House':
        return houseAmenities;
      case 'Hotel':
        return hotelAmenities;
      case 'Villa':
        return villasAmenities;
      case 'Office':
        return officeAmenities;
      default:
        return [];
    }
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const submitData = async () => {
    try {
      await createListing({
        auth_token: token,
        coordinates: houseInformation.location,
        title,
        address,
        price,
      });
      navigate('../manage-properties');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="space-y-4 p-6 bg-white shadow-md rounded-lg"
    >
      <input
        type="text"
        name="house_name"
        {...register('house_name', { required: true })}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleHouseInformation}
      />

      <input
        type="text"
        name="address"
        {...register('address', { required: true })}
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleHouseInformation}
      />

      <input
        type="number"
        name="price"
        {...register('price', { required: true })}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleHouseInformation}
      />

      <div className="flex flex-col w-[200px] gap-2">
        <input
          name="lat"
          type="number"
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Lat"
          onBlur={() => checkFormCompletion()}
          value={houseInformation.location[0]}
          onChange={handleHouseInformation}
        />
        <input
          name="long"
          type="number"
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Long"
          onBlur={() => checkFormCompletion()}
          value={houseInformation.location[1]}
          onChange={handleHouseInformation}
        />
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            setHouseInformation((prev) => ({
              ...prev,
              location: [myLocation.lat, myLocation.lng],
            }));
          }}
        >
          Get Current Location
        </button>
      </div>

      {/* <div className="md:absolute md:right-5 md:top-5 my-7 md:my-0 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <h1 className="font-bold text-2xl text-blue-500 mb-4">
          Upload Property Photos
        </h1>
        <input
          type="file"
          className="block w-full my-3 cursor-pointer text-gray-700"
          multiple
          onChange={handlePhotoUpload}
        />
        <div className="grid grid-cols-3 gap-2">
          {photos.slice(0, 5).map((photo, index) => (
            <div key={index} className="relative">
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setPhotos((prevPhotos) =>
                    prevPhotos.filter((_, i) => i !== index),
                  );
                }}
              >
                X
              </button>
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded photo"
                className="w-[70px] h-[70px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div> */}

      <div className="block mb-4">
        <p className="mb-2 text-lg font-semibold">Choose property type</p>

        <select
          name="property_type"
          className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px] box-content md:box-border"
          onChange={(e) => {
            handleHouseInformation(e);
            checkFormCompletion();
            setPhotos([]);
          }}
          value={houseInformation.property_type}
        >
          <option value="House">House</option>
          <option value="Hotel">Hotel</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
        </select>
      </div>
      {formCompleted && <div>allo</div>}
      <input
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}

NewHouse.propTypes = {
  houseInfo: PropTypes.object,
};
