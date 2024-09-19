import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteListing } from '../controllers/listingApis';

export function HouseCard({ property, onDelete }) {
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:5000/static/';

  return (
    <div
      className="relative flex flex-col items-center border-black border-2 rounded-lg p-1 cursor-pointer"
      onClick={() => {
        navigate(`/properties/${property._id}/edit`);
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        <p className="font-bold text-xl">{property.title}</p>
        <p className="font-thin">{property.address}</p>
        {property.images && property.images.length > 0 ? (
          <div className="flex gap-2">
            <img
              src={`${BASE_URL}${property.images[0].img}`}
              alt={`House pic`}
              className="w-[300px] h-[300px] rounded-md"
            />
          </div>
        ) : (
          <img
            src="/Homes/home1.jpeg"
            alt="static home pic"
            className="w-[250px] h-[250px]"
          />
        )}
        <p>{property.price} €</p>
      </div>
      <p
        className="absolute top-2 right-2 text-red-500 cursor-pointer font-bold"
        onClick={async (event) => {
          event.stopPropagation();
          await deleteListing(property._id);
          onDelete();
        }}
      >
        X
      </p>
    </div>
  );
}

HouseCard.propTypes = {
  property: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
