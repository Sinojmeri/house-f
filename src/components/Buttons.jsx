export default function Buttons() {
  return (
    <div className="flex flex-col">
      <div className={`w-full relative flex mx-auto group z-[1] gap-2 overflow-auto items-start ${window.innerWidth < 425 ? 'justify-start' : 'justify-center'} md:justify-between`}>
        <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
          Houses
        </button>

        <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
          Favorites
        </button>

        <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
          Bookings
        </button>

        <button className="border-2 border-gray-500 rounded-md p-1 bg-gray-100 hover:bg-gray-300">
          Recommendations
        </button>

      </div>
    </div>
  );
}
