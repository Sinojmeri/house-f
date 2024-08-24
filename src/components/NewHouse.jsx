import { useState } from 'react';
import '../comp_Styles/houseInfo.css';
import PropTypes from 'prop-types';

export default function NewHouse({ houseInfo }) {
  const basicInfo = [
    'House Name',
    'Location: (Latitude, Longtitude)',
    'Description',
    'Property Type',
  ];
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
  const [propertyType, setPropertyType] = useState('House');
  const [formCompleted, setFormCompleted] = useState(false);

  function checkFormCompletion() {
    const inputs = houseInfo.current.querySelectorAll('input, select');
    let allCompleted = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allCompleted = false;
      }
      setFormCompleted(allCompleted);
    });
  }

  function getAmenities() {
    switch (propertyType) {
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
        {basicInfo.map((info) =>
          info === 'Location: (Latitude, Longtitude)' ? (
            <div
              className="flex gap-2 items-center justify-between w-[300px] my-2"
              key={info}
            >
              <p className="w-[100%]">{`${info}`}:</p>
              <div className="flex flex-col w-[200px]">
                <input
                  type="number"
                  className="p-1 text-start border-2 border-gray-200 rounded-lg "
                  placeholder="Lat"
                  onBlur={() => checkFormCompletion()}
                />
                <input
                  type="number"
                  className="p-1 text-start border-2 border-gray-200 rounded-lg "
                  placeholder="Long"
                  onBlur={() => checkFormCompletion()}
                />
              </div>
            </div>
          ) : info === 'Property Type' ? (
            <div
              className="flex justify-between gap-2 items-center w-[300px] my-2"
              key={info}
            >
              <p className="shrink">{`${info}`}:</p>
              <select
                className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px] box-content md:box-border"
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  checkFormCompletion();
                }}
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
              <p className="w-[100%]">{`${info}`}:</p>
              <input
                type="text"
                className="p-1 text-start border-2 border-gray-200 rounded-lg w-[200px]"
                onBlur={() => checkFormCompletion()}
              />
            </div>
          ),
        )}
      </div>

      {formCompleted && (
        <div className="flex flex-col bg-white ml-1 my-3 items-center md:items-start transition-opacity duration-700 ease-in-out opacity-100">
          <h1 className="font-bold text-2xl text-blue-500">
            Enter {propertyType} Amenities:
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
