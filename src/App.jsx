import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="md:w-[70%] w-full mx-auto">
      <Outlet />
    </div>
  );
}
