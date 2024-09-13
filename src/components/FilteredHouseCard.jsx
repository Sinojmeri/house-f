// FilteredHouseCard.jsx
export function FilteredHouseCard({ listing }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[300px]">
      <img
        src="/Homes/home1.jpeg"
        alt="House pic"
        className="w-full h-[200px] object-cover rounded-md mb-4"
      />
      <div className="space-y-2">
        <p className="text-lg font-semibold">
          <span className="font-medium text-gray-700">Title: </span>
          {listing.title}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-700">Address: </span>
          {listing.address}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-700">Building Type: </span>
          {listing.buildingType}
        </p>
        <div className="space-y-1">
          <span className="font-medium text-gray-700">Amenities: </span>
          {listing.amenities.map((amenity, index) => (
            <p key={index} className="text-sm text-gray-500">
              {amenity}
            </p>
          ))}
        </div>
        <p className="text-xl font-bold">
          <span className="font-medium text-gray-700">Price: </span>
          {listing.price} €
        </p>
      </div>

      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out">Reserve</button>
    </div>
  );
}
