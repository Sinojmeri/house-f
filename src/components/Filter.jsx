import { useState, useRef, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import '/src/comp_Styles/calendar.css';
import { Modal } from './Modal';
import { useModalStore } from '../stores/modalStore';
const testArray = [
  'Arlindi',
  'arioni',
  'proFesori',
  'bla bla bla',
  'futja Kot',
  'Arlondi',
  'Enio Vrushi',
  'Arlinda',
];

export default function Filter() {
  const [inputValue, setInputValue] = useState('Where are you going ?');
  const [filteredArray, setFilteredArray] = useState([]);
  const filterDiv = useRef();
  const filterInput = useRef();
  const [displayFilter, setDisplayFilter] = useState('hidden');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [dateRange, setDateRange] = useState([today, tomorrow]);
  const calendarRef = useRef();
  const calendarDivRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { isOpen, openModal, closeModal } = useModalStore();

  const handleChange = (v) => {
    setInputValue(v);
    //Filtering items after user has input at least 2 characters.
    if (v.length > 2) {
      setDisplayFilter('');
      const filtered = testArray.filter(
        (place) =>
          place.trim().toLowerCase().slice(0, v.length) === v.trim().toLowerCase(),
      );
      setFilteredArray(filtered);
    } else {
      setFilteredArray([]);
    }
  };
  const onFocus = () => {
    if (inputValue === 'Where are you going ?') {
      setInputValue('');
    }
  };
  const onBlur = () => {
    if (inputValue === '') {
      setInputValue('Where are you going ?');
    }
  };
  const handleOutsideFilter = (event) => {
    if (
      !filterDiv.current.contains(event.target) &&
      !filterInput.current.contains(event.target)
    ) {
      setDisplayFilter('hidden');
      setInputValue('Where are you going ?');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideFilter);
    return () => {
      document.removeEventListener('click', handleOutsideFilter);
    };
  }, []);

  //Calendar show function
  const handleCalendar = (event) => {
    event.stopPropagation();
    setShowCalendar(true);
    setTimeout(() => {
      calendarRef.current.flatpickr.open();
    }, 0);
  };
  const handleClickOutside = (event) => {
    if (
      !calendarDivRef.current.contains(event.target) &&
      !calendarRef.current.flatpickr.calendarContainer.contains(event.target)
    ) {
      setShowCalendar(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 my-2">
      <p className="font-bold text-blue-600 text-2xl ml-2">
        Discover <br /> your Escape
      </p>
      <div className="flex md:flex-row flex-col gap-1 p-1 justify-between md:items-center">
        <div className="flex gap-1 border-2 border-gray-400 rounded-2xl p-1 items-center w-[95%] ml-1">
          <img
            src="/icons8-search-50.png"
            alt="search_icon"
            className="w-[30px] h-[30px] p-1"
          />
          <div className="relative w-full">
            <input
              className="p-1 focus:outline-none items-center w-full bg-inherit"
              value={inputValue}
              onChange={(event) => handleChange(event.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={filterInput}
            />
            <div
              className={`bg-slate-100 absolute mt-2 w-full md:w-[500px] rounded-md z-[20] ${displayFilter}`}
              ref={filterDiv}
            >
              <ul>
                {filteredArray.map((placeName) => (
                  <li key={placeName} className="p-1">
                    {placeName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className='flex gap-2 items-center cursor-pointer' onClick={handleCalendar}>
            <img
              src="/calendar.png"
              alt="calendar"
              className="w-[40px] h-[40px]"
            />
            <p>Check In Date- Check Out Date</p>
          </div>
          <div
            ref={calendarDivRef}
            className={`absolute right-0 ${showCalendar ? '' : 'hidden'} z-[100]`}
          >
            <Flatpickr
              ref={calendarRef}
              onChange={setDateRange}
              options={{
                minDate: today,
                defaultDate: dateRange,
                dateFormat: 'd-m-Y',
                disableMobile: true,
                mode: 'range',
              }}
              className="border-2 border-black rounded-md h-[70px] text-center m-1 cursor-pointer md:w-[200px]"
            />
          </div>
        </div>
        <div className='flex gap-2 items-center cursor-pointer' onClick={openModal}>
          <img
            src="/filter.png"
            alt="Filter img"
            className="w-[40px] h-[40px] bg-yellow-500 p-1 rounded-xl"
          />
          <p>Filters</p>
          <Modal isOpen={ isOpen } closeModal={ closeModal } />
        </div>
          
        
      </div>
    </div>

  );
}
