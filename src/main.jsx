import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Notifications from './pages/Notifications.jsx';
import Messages from './pages/Messages.jsx';
import Home from './pages/Home.jsx';
import Filters from './pages/Filters.jsx';
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
import { HouseDetails } from './pages/HouseDetails.jsx';
import { EditHouse } from './pages/EditHouse.jsx';
import AboutUsInfo from './pages/AboutUsInfo.jsx';

getCurrentLocation();
await checkLocalStorage();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/properties/:propertyId',
        element: <HouseDetails />,
        loader: HouseDetails.loader
      },
      {
        path: '/properties/:propertyId/edit',
        element: <EditHouse />,
        loader: EditHouse.loader
      },
      {
        path: '/',
        element: <Home />,
        loader: Home.loader
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/filters',
        element: <Filters />,
      },
      {
        path: '/about-us',
        element: <AboutUsInfo />
      },
      {
        path: '/list-your-properties',
        element: <YourProperties />,
        loader: yourPropertiesLoader,
        children: [
          {
            path: 'add-property',
            element: <NewHouse />
          },
          {
            path: 'manage-properties',
            element: <ManageYourProperty />,
            loader: ManageYourProperty.loader
          }
        ]
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
