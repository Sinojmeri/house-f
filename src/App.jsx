import { Outlet } from 'react-router-dom';
import Header from './Components/Header';

export default function App() {
  return (
    <div className="md:w-[70%] w-full mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
