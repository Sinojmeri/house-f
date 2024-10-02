import { Outlet, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import isLoggedIn from '../utils/isLoggedIn';

export function loader({ request }) {
  isLoggedIn(request);

  return null;
}

export function YourProperties() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };
  const manage = useRef();
  const addHouse = useRef();

  return (
    <div className="mx-auto flex flex-col">
      <div className="flex justify-between items-center sticky top-0 bg-[#f8fafc] z-[40] ">
        <img
          src="/back-button.png"
          alt="Back button"
          className="w-[30px] h-[30px] cursor-pointer ml-2"
          onClick={goBack}
        />
        <div className="flex-1 flex justify-center">
          <h1 className="font-bold text-2xl text-blue-500 mr-1 text-wrap text-center">
            Welcome to your properties
          </h1>
        </div>
      </div>

      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-col my-6 items-center bg-white p-1 h-[250px] gap-3 ml-1 rounded-md">
          <img
            src="/house_manage.png"
            alt="Manage House icon"
            className="w-[50px] h-[50px]"
          />
          <h1 className="font-bold text-2xl text-center">
            Manage your Properties
          </h1>
          <p className="text-center">
            Manage all the properties <br />
            you have uploded.
          </p>
          <button
            className={`bg-blue-500 border-2 rounded-lg p-1 text-white text-lg`}
            onMouseDown={(e) => e.currentTarget.classList.add('bg-blue-700')}
            onMouseUp={(e) => e.currentTarget.classList.remove('bg-blue-700')}
            ref={manage}
            onClick={() => navigate('manage-properties')}
          >
            Manage your Properties
          </button>
        </div>

        <div className="flex flex-col my-6 items-center bg-white p-1 h-[250px] gap-3 ml-1 rounded-md">
          <img
            src="/new_house.png"
            alt="New House icon"
            className="w-[50px] h-[50px]"
          />
          <h1 className="font-bold text-2xl">Add your Property</h1>
          <p className="text-center">Add a new property to your listings</p>
          <button
            className={`bg-blue-500 border-2 rounded-lg p-1 text-white text-lg`}
            onMouseDown={(e) => e.currentTarget.classList.add('bg-blue-700')}
            onMouseUp={(e) => e.currentTarget.classList.remove('bg-blue-700')}
            ref={addHouse}
            onClick={() => navigate('add-property')}
          >
            Add Property
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
