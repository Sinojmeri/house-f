import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import './calendar.css';
const testArray = ['Arlindi', 'arioni', 'proFesori', 'bla bla bla', 'futja Kot', 'Arlondi', 'Enio Vrushi'];

export default function Filter() {
    const [inputValue, setInputValue] = useState('Search Places');
    const [filteredArray, setFilteredArray] = useState([]);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const [dateRange, setDateRange] = useState([today, tomorrow]);
    const calendarRef = useRef();
    const calendarDivRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleChange = (v) => {
        setInputValue(v);
        //Filtering items after user has input at least 2 characters.
        if (v.length > 2) {
            const filtered = testArray.filter((place) =>
                place.trim().toLowerCase().slice(0, v.length) === v.trim().toLowerCase()
            )
            setFilteredArray(filtered);
        } else {
            setFilteredArray([]);
        }
    }
    if (filteredArray.length > 0) {
        console.log(filteredArray);
    }
    const onFocus = () => {
        if (inputValue === 'Search Places') {
            setInputValue('');
        }
    }
    const onBlur = () => {
        if (inputValue === '') {
            setInputValue('Search Places');
        }
    }
    //Calendar show function
    const handleCalendar = (event) => {
        event.stopPropagation();
        setShowCalendar(true);
        setTimeout(() => {
            calendarRef.current.flatpickr.open();
        }, 0);
    }
    const handleClickOutside = (event) => {
        if (!calendarDivRef.current.contains(event.target) && !calendarRef.current.flatpickr.calendarContainer.contains(event.target)) {
            // event.stopPropagation();
            setShowCalendar(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return (
        <div className="flex flex-col gap-2 my-2">
            <p className="font-bold text-blue-600 text-2xl ml-2">Discover <br /> your Escape</p>
            <div className="flex gap-1 p-1 justify-between items-center">
                <div className="flex gap-1 border-2 border-gray-100 p-1 items-center w-[95%] ml-1">
                    <img src="/icons8-search-50.png" alt="search_icon" className="w-[30px] h-[30px] p-1" />
                    <div className="relative w-full z-0">
                        <input className="p-1 focus:outline-none items-center w-full" value={inputValue} onChange={(event) => handleChange(event.target.value)}
                            onFocus={onFocus}
                            onBlur={onBlur} />
                        <div className="bg-slate-100 absolute mt-2 w-full md:w-[500px] rounded-md">
                            <ul>
                                {filteredArray.map((placeName) => (
                                    <li key={placeName} className="p-1">{placeName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src="/calendar.png" alt="calendar" className="w-[40px] h-[40px] cursor-pointer" onClick={handleCalendar} />
                    <div ref={calendarDivRef} className={`absolute right-0 ${showCalendar ? '' : 'hidden'}`}>
                        <Flatpickr
                            ref={calendarRef}
                            onChange={setDateRange}
                            options={{
                                minDate:today,
                                defaultDate: dateRange,
                                dateFormat: 'd-m-Y',
                                disableMobile: true,
                                mode: 'range',
                            }}
                            className="border-2 border-black rounded-md h-[70px] text-center m-1 cursor-pointer md:w-[200px]"
                        />
                    </div>
                </div>
                <Link to={'/filters'} className="flex p-1 items-center">
                    <img src="/filter.png" alt="Filter img" className="w-[40px] h-[40px] bg-yellow-500 p-1 rounded-xl" />
                </Link>
            </div>
        </div>
        
    )
}