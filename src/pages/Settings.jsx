import { useNavigate } from "react-router-dom";

export function Settings() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <div className="w-[70%] flex flex-col">
            <img
                src="./back-button.png"
                alt="Back button"
                className="w-[30px] h-[30px] cursor-pointer"
                onClick={goBack}
            />
            <h1 className="font-bold text-xl ml-2">Device Settings</h1>
            <div className="flex flex-col gap-3 md:w-[70%]">
                <div className="flex justify-between ">
                    <p className="">Language</p>
                    <select className="bg-inherit cursor-pointer border-2 border-black">
                        <option value={'english'}>English</option>
                        <option value={'french'}>French</option>
                        <option value={'spanish'}>Spanish</option>
                    </select>
                </div>
            </div>
        </div>
    )
}