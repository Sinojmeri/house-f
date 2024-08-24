import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import NewHouse from "../Components/NewHouse";


export default function YourProperties() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };
  const manage = useRef();
  const addHouse = useRef();
  const houseInfo = useRef();

  const [content, setContent] = useState('');
  const handleContent = (e) => {
    if (manage.current.contains(e.target)) {
      setContent('Manage Your properties')
    }
   else if (addHouse.current.contains(e.target)) {
      setContent(<NewHouse houseInfo={houseInfo} />);
      setTimeout(() => {
        houseInfo.current.classList.add('open');
        houseInfo.current.focus();
      }, 10); //Delay is set to make sure the comp is rendered before it get's focus. 
    }
  }
  return (
    <div className="mx-auto flex flex-col">

      <div className="flex justify-between items-center sticky top-0 bg-[#f8fafc] z-50">
        <img
          src="./back-button.png"
          alt="Back button"
          className="w-[30px] h-[30px] cursor-pointer ml-2"
          onClick={goBack}
        />
        <div className="flex-1 flex justify-center">
          <h1 className="font-bold text-2xl text-blue-500 mr-1 text-wrap text-center">Welcome to your properties</h1>
        </div>
      </div>

      <div className="flex justify-between flex-col md:flex-row">

        <div className="flex flex-col my-6 items-center bg-white p-1 h-[250px] gap-3 ml-1 ">
          <img src="/house_manage.png" alt="Manage House icon" className="w-[50px] h-[50px]" />
          <h1 className="font-bold text-2xl text-center">Manage your Properties</h1>
          <p className="text-center">Manage all the properties <br />you have uploded.</p>
          <button className={`bg-blue-500 border-2 rounded-lg p-1 text-white text-lg`}
            onMouseDown={(e) => e.currentTarget.classList.add('bg-blue-700')}
            onMouseUp={(e) => e.currentTarget.classList.remove('bg-blue-700')}
            ref={manage}
            onClick={() => handleContent(event)}
          >Manage your Properties</button>
        </div>

        <div className="flex flex-col my-6 items-center bg-white p-1 h-[250px] gap-3 ml-1">
          <img src="/new_house.png" alt="New House icon" className="w-[50px] h-[50px]" />
          <h1 className="font-bold text-2xl">Add your Property</h1>
          <p className="text-center">Add a new property to your listings</p>
          <button className={`bg-blue-500 border-2 rounded-lg p-1 text-white text-lg`}
            onMouseDown={(e) => e.currentTarget.classList.add('bg-blue-700')}
            onMouseUp={(e) => e.currentTarget.classList.remove('bg-blue-700')}
            ref={addHouse}
            onClick={() => handleContent(event)}
          >Add Property</button>
        </div>
      </div>

      {content}
      
    </div>
  )
}