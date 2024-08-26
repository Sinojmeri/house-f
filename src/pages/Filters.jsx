import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Filters() {
  const [price, setPrice] = useState(0);
  const handleChange = (v) => {
    setPrice(v);
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  const filters = {
    entireHomes: false,
    hotels: false,
    cabins: false,
    resorts: false,
    parking: false,
    freeParking: false,
    swimmingPool: false,
    petFriendly: false,
    balcony: false,
  };
  const [checkedItems, setCheckedItems] = useState(filters);
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  function handleReset() {
    setPrice(0);
    setCheckedItems(filters);
  }

  return (
    <div className="flex flex-col ml-2 gap-2">
      {/* Navbar of this page */}
      <div className="flex justify-between items-center sticky top-0 bg-[#f8fafc]">
        <div className="flex gap-3 items-center">
          <img
            src="./back-button.png"
            alt="Back button"
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={goBack}
          />
          <h1 className="font-bold text-2xl text-blue-500">Set your filters</h1>
        </div>
        <button
          className="text-blue-500 font-bold text-xl p-1 mr-1 border-2 border-blue-100 rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {/* Price Ruler */}
      <div className="flex flex-col">
        <p className="font-bold text-xl">Price: {`${price}`} €</p>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="1500"
          step={50}
          value={price}
          onChange={(event) => handleChange(event.target.value)}
          className=" w-[300px] md:w-full  cursor-pointer"
        />
      </div>
      {/* Property type */}
      <div className="flex flex-col">
        <h2 className="font-bold text-xl text-gray-600 pl-1">Property Type:</h2>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Entire Homes & Apartments</p>
          <input
            type="checkbox"
            name="entireHomes"
            checked={checkedItems.entireHomes}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Hotels</p>
          <input
            type="checkbox"
            name="hotels"
            checked={checkedItems.hotels}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Cabins</p>
          <input
            type="checkbox"
            name="cabins"
            checked={checkedItems.cabins}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Resorts</p>
          <input
            type="checkbox"
            name="resorts"
            checked={checkedItems.resorts}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className=" flex h-1 bg-gray-200 w-[98%] rounded-md mx-auto my-5" />
      </div>

      {/* Property facilities*/}
      <div className="flex flex-col">
        <h2 className="font-bold text-xl text-gray-600 pl-1">
          Property facilities:
        </h2>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Parking</p>
          <input
            type="checkbox"
            name="parking"
            checked={checkedItems.parking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Free Parking</p>
          <input
            type="checkbox"
            name="freeParking"
            checked={checkedItems.freeParking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Swimming pool</p>
          <input
            type="checkbox"
            name="swimmingPool"
            checked={checkedItems.swimmingPool}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Pet Friendly</p>
          <input
            type="checkbox"
            name="petFriendly"
            checked={checkedItems.petFriendly}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Balcony</p>
          <input
            type="checkbox"
            name="balcony"
            checked={checkedItems.balcony}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className=" flex h-1 bg-gray-200 w-[98%] rounded-md mx-auto my-5" />
      </div>

      {/* Property facilities*/}
      <div className="flex flex-col">
        <h2 className="font-bold text-xl text-gray-600 pl-1">
          Property facilities:
        </h2>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Parking</p>
          <input
            type="checkbox"
            name="parking"
            checked={checkedItems.parking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Free Parking</p>
          <input
            type="checkbox"
            name="freeParking"
            checked={checkedItems.freeParking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Swimming pool</p>
          <input
            type="checkbox"
            name="swimmingPool"
            checked={checkedItems.swimmingPool}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Pet Friendly</p>
          <input
            type="checkbox"
            name="petFriendly"
            checked={checkedItems.petFriendly}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Balcony</p>
          <input
            type="checkbox"
            name="balcony"
            checked={checkedItems.balcony}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className=" flex h-1 bg-gray-200 w-[98%] rounded-md mx-auto my-5" />
      </div>

      {/* Property facilities*/}
      <div className="flex flex-col">
        <h2 className="font-bold text-xl text-gray-600 pl-1">
          Property facilities:
        </h2>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Parking</p>
          <input
            type="checkbox"
            name="parking"
            checked={checkedItems.parking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Free Parking</p>
          <input
            type="checkbox"
            name="freeParking"
            checked={checkedItems.freeParking}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Swimming pool</p>
          <input
            type="checkbox"
            name="swimmingPool"
            checked={checkedItems.swimmingPool}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Pet Friendly</p>
          <input
            type="checkbox"
            name="petFriendly"
            checked={checkedItems.petFriendly}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center justify-between align-middle w-[300px]">
          <p className="font-bold p-1 w-[250px]">Balcony</p>
          <input
            type="checkbox"
            name="balcony"
            checked={checkedItems.balcony}
            onChange={handleCheckboxChange}
            className="w-[20px] h-[20px] cursor-pointer mt-[2px]"
          />
        </div>
        <div className=" flex h-1 bg-gray-200 w-[98%] rounded-md mx-auto my-5" />
      </div>
    </div>
  );
}
