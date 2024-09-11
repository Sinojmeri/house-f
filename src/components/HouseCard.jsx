import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function HouseCard({ property }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center border-black border-2 rounded-lg p-1 cursor-pointer" onClick={() => {
      navigate(`/properties/${property._id}`)
      }}>
        <div className="flex flex-col gap-2 items-center">
          <img src="/Homes/home1.jpeg" alt="House pic" className="w-[300px] h-[300px] rounded-md" />
          <p>{property.title}</p>
          <p>{property.address}</p>
          <p>{property.price} €</p>
        </div>
      </div>
  )
}

HouseCard.propTypes = {
  property: PropTypes.object
}