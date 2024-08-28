import { useState } from 'react';
import '../comp_Styles/houseInfo.css';
import PropTypes from 'prop-types';
import { useLocationStore } from '../stores/location';

const houseAmenities = [
  'Netflix',
  'Wi-Fi',
  'Free Parking',
  'Pool',
  'Air Conditioning',
  'Laundry',
  'Balcony',
];
const hotelAmenities = [
  'Swimming pool',
  'Fitness center',
  'Spa treatments',
  'Restaurant and bar',
  'Room service',
  'Laundry service',
  'Wi-Fi',
  'Rooftop pool',
  'Private beach access',
  'In-room dining',
  'Number of Beds',
  'Number of Rooms',
];
const villasAmenities = [
  'Private pool',
  'Kitchen',
  'Laundry facilities',
  'Garden',
  'Barbecue grill',
  'Parking',
  'Home theater',
  'Game room',
  'Wine cellar',
  'Personal chef',
  'Guest house',
  'Number of Bathrooms',
  'Number of Rooms',
  'Panaromic View',
];
const officeAmenities = [
  'Meeting rooms',
  'Conference rooms',
  'Shared workspace',
  'Kitchenette',
  'Wi-Fi',
  'Copier/printer/scanner',
  'Reception area',
  'Panoramic views',
  'Café or restaurant',
  'Rooftop terrace',
  'Secure parking',
  'Number of Bathrooms',
];

export default function NewHouse({ houseInfo }) {
  const myLocation = useLocationStore((state) => state.location);

  const [formCompleted, setFormCompleted] = useState(false);
  const [houseInformation, setHouseInformation] = useState({
    house_name: '',
    location: ['', ''],
    description: '',
    property_type: 'House',
  });

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
      return {
        ...prev,
        [name]: value,
      };
    });
    checkFormCompletion();
  };

  function checkFormCompletion() {
    const { house_name, location, description, property_type } =
      houseInformation;
    const allCompleted =
      house_name.trim() &&
      location[0] &&
      location[1] &&
      description.trim() &&
      property_type;
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

  return (
    <div>
      <div
        className="house-info flex flex-col bg-white ml-1 items-center md:items-start"
        ref={houseInfo}
        tabIndex={-1}
      >
        <h1 className="font-bold text-2xl text-blue-500">
          Enter house information:
        </h1>
        {Object.keys(houseInformation).map((info) =>
          info === 'location' ? (
            <div
              className="flex gap-2 items-center justify-between w-[300px] my-2"
              key={info}
            >
              <p className="w-[100%]">
                {`${info[0].toUpperCase()}${info.slice(1)}`}:
              </p>
              <div className="flex flex-col w-[200px] gap-1">
                <input
                  name="lat"
                  type="number"
                  className="p-1 text-start border-2 border-gray-200 rounded-lg "
                  placeholder="Lat"
                  onBlur={() => checkFormCompletion()}
                  value={houseInformation.location[0]}
                  onChange={handleHouseInformation}
                />
                <input
                  name="long"
                  type="number"
                  className="p-1 text-start border-2 border-gray-200 rounded-lg "
                  placeholder="Long"
                  onBlur={() => checkFormCompletion()}
                  onChange={handleHouseInformation}
                  value={houseInformation.location[1]}
                />
                <button
                  type="number"
                  className="p-1 text-center border-2 border-gray-200 rounded-lg hover:bg-gray-100"
                  onClick={() => {
                    setHouseInformation((prev) => {
                      return {
                        ...prev,
                        location: [myLocation.lat, myLocation.lng],
                      };
                    });
                  }}
                >
                  Get Current Location
                </button>
              </div>
            </div>
          ) : info === 'property_type' ? (
            <div
              className="flex justify-between gap-2 items-center w-[300px] my-2"
              key={info}
            >
              <p className="shrink">
                {`${info.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}`}
                :
              </p>
              <select
                name="property_type"
                className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px] box-content md:box-border"
                onChange={(e) => {
                  handleHouseInformation(e);
                  checkFormCompletion();
                }}
                value={houseInformation.property_type}
              >
                <option value="House">House</option>
                <option value="Hotel">Hotel</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
              </select>
            </div>
          ) : (
            <div
              className="flex justify-between gap-2 items-center w-[300px] my-2"
              key={info}
            >
              <p className="w-[100%]">
                {`${info.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}`}
                :
              </p>
              <input
                name={`${info}`}
                type="text"
                className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px]"
                onBlur={() => checkFormCompletion()}
                onChange={handleHouseInformation}
                value={houseInformation.info}
              />
            </div>
          ),
        )}
      </div>

      {formCompleted && (
        <div className="flex flex-col bg-white ml-1 my-3 items-center md:items-start transition-opacity duration-700 ease-in-out opacity-100">
          <h1 className="font-bold text-2xl text-blue-500">
            Enter {houseInformation.property_type} Amenities:
          </h1>
          {getAmenities().map((amenity) => (
            <div
              className="flex gap-2 items-center justify-between w-[300px] my-2"
              key={amenity}
            >
              <p className="p-1 w-[250px]">{amenity}</p>
              <input
                type="checkbox"
                name={amenity.toLowerCase().replace(/\s+/g, '')}
                className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
              />
            </div>
          ))}

          <input
            type="number"
            className="cursor-pointer border-2 border-gray-400 rounded-lg w-[300px] p-1"
            placeholder="Price: €"
            step={0.1}
            title="Price in €"
            max={1500}
          />
        </div>
      )}
    </div>
  );
}
NewHouse.propTypes = {
  houseInfo: PropTypes.object,
};
