import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  return (
    <div className='md:w-[70%] w-full mx-auto'>
      <Outlet />
    </div>
      
  );
}
