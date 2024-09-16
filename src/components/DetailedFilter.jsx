import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useModalStore } from '../stores/modalStore';

export function DetailedFilter({ inputValue, dateRange }) {
  const { closeModal } = useModalStore();
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [nrOfRooms, setNrOfRooms] = useState(0);
  const [nrOfBeds, setNrOfBeds] = useState(0);

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
    Panoramic_View: false,
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
  });
  const [propertyType, setPropertyType] = useState('House');

  const amenities =
    propertyType === 'House'
      ? houseAmenities
      : propertyType === 'Hotel'
        ? hotelAmenities
        : propertyType === 'Villa'
          ? villasAmenities
          : propertyType === 'Office'
            ? officeAmenities
            : {};

  const handleAmenityChange = (e, amenityType) => {
    const { name, checked, value, type } = e.target;
    const newValue = type === 'number' ? +value : checked;
    switch (amenityType) {
      case 'House':
        setHouseAmenities((prev) => ({ ...prev, [name]: newValue }));
        break;
      case 'Hotel':
        setHotelAmenities((prev) => ({ ...prev, [name]: newValue }));
        break;
      case 'Villa':
        setVillasAmenities((prev) => ({ ...prev, [name]: newValue }));
        break;
      case 'Office':
        setOfficeAmenities((prev) => ({ ...prev, [name]: newValue }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      <Form method="get" action="/results">
        <input type="hidden" name="city" value={inputValue} />
        <input type="hidden" name="date" value={dateRange} />

        <p className="mt-4">{`Price: ${minPrice} - ${maxPrice} €`}</p>
        {/* Min and Max Price Fields */}
        <div className="mt-4">
          <label className="block">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Select Property Div */}
        <div className="mt-4">
          <label className="block">Select a property type</label>
          <select
            name="propertyType"
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
            }}
            className="w-full p-2 border rounded"
          >
            {/* <option value="" >Select a property type</option> */}
            <option value="House">House</option>
            <option value="Hotel">Hotel</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
          </select>
        </div>
        {/* Amenities according to property type */}
        {(propertyType === 'Hotel' || propertyType === 'Villa') ? (
          <>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-row gap-3">
                <label>Number Of Rooms:</label>
                <input
                  type="number"
                  name="nrOfRooms"
                  value={nrOfRooms}
                  className="w-[80px] border-2 border-gray-200 rounded-lg"
                  onChange={(e) => setNrOfRooms(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-6">
                <label>Number Of Beds:</label>
                <input
                  type="number"
                  name="nrOfBeds"
                  value={nrOfBeds}
                  className="w-[80px] border-2 border-gray-200 rounded-lg"
                  onChange={(e) => setNrOfBeds(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block">Property Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(amenities).map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      name={amenity}
                      checked={amenities[amenity]}
                      onChange={(e) => handleAmenityChange(e, propertyType)}
                    />
                    <label className="ml-2">{amenity.replace(/_/g, ' ')}</label>
                  </div>
                ))}
              </div>
            </div>
          </>
        ): <div className="mt-4">
        <label className="block">Property Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(amenities).map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                name={amenity}
                checked={amenities[amenity]}
                onChange={(e) => handleAmenityChange(e, propertyType)}
              />
              <label className="ml-2">{amenity.replace(/_/g, ' ')}</label>
            </div>
          ))}
        </div>
      </div>}

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
