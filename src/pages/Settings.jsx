import { useNavigate } from "react-router-dom";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css'
export function Settings() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <div className="flex flex-col">
            <img
                src="./back-button.png"
                alt="Back button"
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={goBack}
            />
            <h1 className="font-bold text-xl ml-2">Device Settings</h1>
            <div className="flex flex-col gap-3 md:w-[70%] w-full ml-2">
                <div className="flex justify-between ">
                    <p className="">Language</p>
                    <div className="flex items-start md:w-[20%] mr-5 md:mr-0">
                        <select className="bg-inherit cursor-pointer border-2 border-black rounded-md">
                            <option value={'english'}>English</option>
                            <option value={'french'}>French</option>
                            <option value={'spanish'}>Spanish</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <p className="">Units</p>
                    <div className="flex items-start md:w-[20%] mr-5 md:mr-0">
                        <select className="bg-inherit cursor-pointer border-2 border-black rounded-md">
                            <option value={'metric'}>Metric (km, m²)</option>
                            <option value={'imperial'}>Imperial (miles, ft²)</option>
                        </select>
                    </div>

                </div>
                <div className="flex justify-between ">
                    <p className="">Temperature</p>
                    <div className="flex items-start md:w-[20%] mr-5 md:mr-0"><select className="bg-inherit cursor-pointer border-2 border-black rounded-md">
                        <option value={'celsius'}>Degrees in Celsius</option>
                        <option value={'fahrenheit'}>Degrees in Fahrenheit</option>
                    </select>
                    </div>
                </div>
            </div>
            <div className="h-1 bg-gray-200 w-full my-2" />
            <h1 className="font-bold text-xl ml-2">Personal Details</h1>
            <div className="flex flex-col gap-2 ml-2">
                <p>First Name</p>
                <input type="text" className="bg-inherit p-1 w-fit border-2 border-black rounded-lg outline-none"
                    onFocus={(e) => e.target.classList.add('border-orange-200')}
                    onBlur={(e) => e.target.classList.remove('border-orange-200')}
                    placeholder="Enter your first name" />
                <p>Last Name</p>
                <input type="text" className="bg-inherit p-1 w-fit border-2 border-black rounded-lg outline-none"
                    onFocus={(e) => e.target.classList.add('border-orange-200')}
                    onBlur={(e) => e.target.classList.remove('border-orange-200')}
                    placeholder="Enter your last name" />
                <label htmlFor="gender" className="" >Gender</label>
                <select className="w-fit bg-inherit p-1 border-2 border-black rounded-lg cursor-pointer" id="gender">
                    <option value="man">I&apos;m a man</option>
                    <option value="woman">I&apos;m a woman</option>
                    <option value="non_binary">I&apos;m non binary</option>
                    <option value="undefined">I prefer not to say</option>
                </select>
                <p>Birthday</p>
                <div>
                    <Flatpickr className="bg-inherit border-2 border-black p-1 rounded-md cursor-pointer"
                        options={{
                            dateFormat: "d-m-Y",
                            defaultDate: 'today'
                        }}
                    />
                </div>
                <div className="h-1 bg-gray-200 w-full my-2" />
                <h1 className="font-bold text-xl ml-2">Account management</h1>
                <p>Email</p>
                <input type="text" className="bg-inherit p-1 w-fit border-2 border-black rounded-lg outline-none cursor-pointer"
                    onFocus={(e) => e.target.classList.add('border-red-500')}
                    onBlur={(e) => e.target.classList.remove('border-red-500')}
                    placeholder="Enter your new email" />
                <p>Password</p>
                <input type="text" className="bg-inherit p-1 w-fit border-2 border-black rounded-lg outline-none cursor-pointer"
                    onFocus={(e) => e.target.classList.add('border-red-500')}
                    onBlur={(e) => e.target.classList.remove('border-red-500')}
                    placeholder="Enter your new password" />
            </div>
            <button className="p-1 font-bold border-2 border-blue-400 rounded-md my-4 md:w-[60%] mx-auto hover:bg-gray-200 text-blue-500">Save</button>
        </div>
    )
}