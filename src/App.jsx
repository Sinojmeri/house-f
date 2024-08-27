import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';

export default function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/Login' || location.pathname === '/Sign%20Up';
  return (
    <div className="md:w-[70%] w-full mx-auto">
      {!hideHeader && <Header />}
      <Outlet />
    </div>
  );
}
