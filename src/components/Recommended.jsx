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
            {/* z-4*/}
            <div
                className={`absolute w-[500px] h-[330px] border-2 border-yellow-500 rounded-md z-${activeCard === 4 ? 50 : 10} 
        transition-all duration-300 bottom-10 right-[400px]
        ${activeCard !== null && activeCard !== 4 ? 'opacity-50' : 'opacity-100'}`}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(4)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(4)}
            >
                z-4
            </div>

            {/*z-3*/}
            <div
                className={`absolute w-[480px] h-[280px] border-2 border-green-500 rounded-md z-${activeCard === 3 ? 50 : 20} 
        transition-all duration-300 bottom-[120px] left-[100px]
        ${activeCard !== null && activeCard !== 3 ? 'opacity-50' : 'opacity-100'}`}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(3)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(3)}
            >
                z-3
            </div>

            {/* z-2 */}
            <div
                className={`absolute w-[330px] h-[380px] border-2 border-blue-500 rounded-md z-${activeCard === 2 ? 50 : 30} 
        transition-all duration-300 top-[40px] right-[520px]
        ${activeCard !== null && activeCard !== 2 ? 'opacity-50' : 'opacity-100'}`}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(2)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(2)}
            >
                z-2
            </div>

            {/* z-1*/}
            <div
                className={`absolute w-[480px] h-[280px] border-2 border-red-500 z-${activeCard === 1 ? 50 : 40} 
        transition-all duration-300 top-0 left-60
        ${activeCard !== null && activeCard !== 1 ? 'opacity-50' : 'opacity-100'}`}
                onMouseEnter={() => window.innerWidth >= 768 && handleCardEvent(1)}
                onMouseLeave={resetActiveCard}
                onClick={() => window.innerWidth < 768 && handleCardEvent(1)}
            >
                z-1
            </div>
        </div>
    );
}