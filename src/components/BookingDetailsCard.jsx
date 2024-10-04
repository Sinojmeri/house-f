import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
export function BookingDetailsCard({ listing }) {
  const displayStartDate = DateTime.fromISO(
    listing.reservations.startDate,
  ).toLocaleString(DateTime.DATE_FULL);
  const displayEndDate = DateTime.fromISO(
    listing.reservations.endDate,
  ).toLocaleString(DateTime.DATE_FULL);
  const navigate = useNavigate();
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 w-[300px] cursor-pointer"
      onClick={() =>
        navigate(
          `/bookings/${listing._id}?startDate=${displayStartDate}&endDate=${displayEndDate}&totalPrice=${listing.reservations.totalPrice}`,
        )
      }
    >
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

        <div>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Check-in: </span>
            {displayStartDate}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Check-out: </span>
            {displayEndDate}
          </p>
        </div>

        <p className="text-xl font-bold">
          <span className="font-medium text-gray-700">Price: </span>
          {listing.reservations.totalPrice} €
        </p>
      </div>
    </div>
  );
}

BookingDetailsCard.propTypes = {
  listing: PropTypes.object.isRequired,
};
