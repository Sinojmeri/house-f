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
        {property.images && property.images.length > 0 ? (
          <div className="flex gap-2">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={`${BASE_URL}${image.img}`}
                alt={`House pic ${index + 1}`}
                className="w-[150px] h-[150px] rounded-md"
              />
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
        <p>{property.title}</p>
        <p>{property.address}</p>
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
