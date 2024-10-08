import { useState, useRef, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import '/src/comp_Styles/calendar.css';
import { Modal } from './Modal';
import { useModalStore } from '../stores/modalStore';
import { DetailedFilter } from './DetailedFilter';
import { DateTime } from 'luxon';

export default function Filter() {
  const [inputValue, setInputValue] = useState('Where are you going ?');
  const [filteredArray, setFilteredArray] = useState([]);
  const filterDiv = useRef();
  const filterInput = useRef();
  const [displayFilter, setDisplayFilter] = useState('hidden');
  const citiesArray = [
    'Tirane',
    'Elbasan',
    'Librazhd',
    'Pogradec',
    'Korce',
    'Durres',
    'Peshkopi',
    'Bulqize',
    'Lac',
    'Lezhe',
    'Burrel',
    'Rreshen',
    'Rubik',
    'Shkoder',
    'Tropoje',
    'Kukes',
    'Has',
    'Vlore',
    'Fier',
    'Lushnje',
    'Himare',
    'Sarande',
    'Tepelene',
    'Ballsh',
  ];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [dateRange] = useState([today, tomorrow]);
  const [startDate, setStartDate] = useState(today);
  const ds = startDate
    ? DateTime.fromJSDate(startDate)
        .setZone('utc', { keepLocalTime: true })
        .toMillis()
    : 0;
  const [endDate, setEndDate] = useState(tomorrow);
  const de = endDate
    ? DateTime.fromJSDate(endDate)
        .setZone('utc', { keepLocalTime: true })
        .toMillis()
    : 0;

  const calendarRef = useRef();
  const calendarDivRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { isOpen, openModal, closeModal } = useModalStore();

  const handleChange = (v) => {
    setInputValue(v);
    // Filtering items after user starts typing..
    if (v.length > 0) {
      setDisplayFilter('');
      const filtered = citiesArray.filter(
        (place) =>
          place.trim().toLowerCase().slice(0, v.length) ===
          v.trim().toLowerCase(),
      );
      setFilteredArray(filtered);
    } else {
      setFilteredArray([]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && filteredArray.length > 0) {
      setInputValue(filteredArray[0]);
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
    // Check if click is outside filter input and filter dropdown
    if (
      !filterDiv.current.contains(event.target) &&
      !filterInput.current.contains(event.target) &&
      !calendarDivRef.current.contains(event.target) &&
      !calendarRef.current.flatpickr.calendarContainer.contains(event.target)
    ) {
      setDisplayFilter('hidden');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideFilter);
    return () => {
      document.removeEventListener('click', handleOutsideFilter);
    };
  }, []);

  // Calendar show function
  const handleCalendar = (event) => {
    event.stopPropagation();
    setShowCalendar(true);
    setTimeout(() => {
      calendarRef.current.flatpickr.open();
    }, 0);
  };

  const handleClickOutside = (event) => {
    // Close calendar if clicked outside
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
              onKeyDown={handleEnter}
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
                  <li
                    key={placeName}
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      setInputValue(placeName);
                      setFilteredArray([]);
                    }}
                  >
                    {placeName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={handleCalendar}
          >
            <img
              src="/calendar.png"
              alt="calendar"
              className="w-[40px] h-[40px]"
            />
            <p>Check In Date- Check Out Date</p>
          </div>
          <div
            ref={calendarDivRef}
            className={`absolute ${showCalendar ? '' : 'hidden'} z-[100]`}
          >
            <Flatpickr
              ref={calendarRef}
              onChange={(range) => {
                setStartDate(range[0]);
                setEndDate(range[1]);
              }}
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
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={openModal}
        >
          <img
            src="/filter.png"
            alt="Filter img"
            className="w-[40px] h-[40px] bg-yellow-500 p-1 rounded-xl"
          />
          <p>Filters</p>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title={'Set your filters'}
            description={'Find your dream property with our advanced filters.'}
          >
            <DetailedFilter
              inputValue={inputValue}
              startDate={ds}
              endDate={de}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
