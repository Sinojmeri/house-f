import { useLoaderData } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { getAllYourReservations } from '../controllers/reservationApis';
import { BookingDetailsCard } from '../components/BookingDetailsCard';

async function loader() {
  const allBookings = await getAllYourReservations();
  return allBookings;
}

export function AllReservations() {
  const allBookings = useLoaderData();
  // console.log(allBookings);

  return (
    <div>
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
        Booking History
      </h1>
      {allBookings && allBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {allBookings.map((listing) => (
            <BookingDetailsCard
              listing={listing}
              key={listing.reservations._id}
            />
          ))}
        </div>
      ) : (
        <div className="flex  justify-center mx-auto w-full">
          <p className="font-bold text-2xl text-blue-500 text-center">
            You have no bookings.
          </p>
        </div>
      )}
    </div>
  );
}

AllReservations.loader = loader;
