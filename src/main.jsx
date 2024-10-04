import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import {
  YourProperties,
  loader as yourPropertiesLoader,
} from './pages/YourProperties.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { Settings } from './pages/Settings.jsx';
import { getCurrentLocation } from './utils/geolocation.js';
import { checkLocalStorage } from './utils/localStorageUtil.js';
import { ErrorBoundary } from './components/Error.jsx';
import NewHouse from './components/NewHouse.jsx';
import { ManageYourProperty } from './pages/ManageProperties.jsx';
import { EditHouse } from './pages/EditHouse.jsx';
import { Results } from './pages/Results.jsx';
import AboutUsInfo from './pages/AboutUsInfo.jsx';
import { ReserveHouseUI } from './pages/ReserveHouseUI.jsx';
import { BookedHouse } from './pages/BookedHouse.jsx';
import { AllReservations } from './pages/AllReservations.jsx';

async function startingApp() {
  getCurrentLocation();
  await checkLocalStorage();
}
startingApp();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/properties/:propertyId/edit',
        element: <EditHouse />,
        loader: EditHouse.loader,
      },
      {
        path: '/',
        element: <Home />,
        loader: Home.loader,
      },
      {
        path: '/results',
        element: <Results />,
        loader: Results.loader,
        id: 'search',
      },
      {
        path: '/results/:id',
        element: <ReserveHouseUI />,
        loader: ReserveHouseUI.loader,
      },
      {
        path: '/bookings',
        element: <AllReservations />,
        loader: AllReservations.loader,
      },
      {
        path: '/bookings/:listingId',
        element: <BookedHouse />,
        loader: BookedHouse.loader,
      },
      {
        path: '/about-us',
        element: <AboutUsInfo />,
      },
      {
        path: '/list-your-properties',
        element: <YourProperties />,
        loader: yourPropertiesLoader,
        children: [
          {
            path: 'add-property',
            element: <NewHouse />,
          },
          {
            path: 'manage-properties',
            element: <ManageYourProperty />,
            loader: ManageYourProperty.loader,
          },
        ],
      },

      {
        path: 'Settings',
        element: <Settings />,
      },
      {
        path: '/about-us',
        element: <AboutUsInfo />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'Sign Up',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
