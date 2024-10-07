import { useState } from "react";

export function Recommended() {
    const [activeCard, setActiveCard] = useState(null);
    const handleCardEvent = (index) => {
        setActiveCard(index);
    };

    const resetActiveCard = () => {
        setActiveCard(null);
    };

    return (
        <div className="relative w-full flex justify-center items-center h-[600px]">
            {/* z-4 */}
            <div
                className={`absolute w-[40%] h-[55%] border-2  rounded-md z-${activeCard === 4 ? 50 : 10} 
    transition-all duration-300 bottom-[5%] right-[25%] bg-cover
    ${activeCard !== null && activeCard !== 4 ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundImage: `url(/Homes/home1.jpeg)` }}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(4)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(4)}
            >
                <p className="absolute bottom-0 text-2xl text-white font-bold p-1">Arioni test</p>
            </div>
            {/* z-3 */}
            <div
                className={`absolute w-[38%] h-[47%] border-2  rounded-md z-${activeCard === 3 ? 50 : 20} 
    transition-all duration-300 bottom-[20%] left-[10%] bg-cover
    ${activeCard !== null && activeCard !== 3 ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundImage: `url(/Homes/home2.jpg)` }}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(3)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(3)}
            ><p className="absolute bottom-0 text-2xl text-white font-bold p-1">Arioni test</p>
            </div>

            {/* z-2 */}
            <div
                className={`absolute w-[27%] h-[63%] border-2 rounded-md z-${activeCard === 2 ? 50 : 30} 
    transition-all duration-300 top-[7%] right-[30%] bg-cover
    ${activeCard !== null && activeCard !== 2 ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundImage: `url(/Homes/home9.png)` }}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(2)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(2)}
            />
            {/* z-1 */}
            <div
                className={`absolute w-[38%] h-[47%] border-2 rounded-md z-${activeCard === 1 ? 50 : 40} 
    transition-all duration-300 top-0 left-[15%] bg-cover
    ${activeCard !== null && activeCard !== 1 ? 'opacity-50' : 'opacity-100'}`} style={{ backgroundImage: `url(/Homes/home10.jpeg)` }}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(1)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(1)}
            />
        </div>
    )
}