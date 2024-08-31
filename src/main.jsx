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

getCurrentLocation();
await checkLocalStorage();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: 'filters',
        element: <Filters />,
      },
      {
        path: 'List your Properties',
        element: <YourProperties />,
        loader: yourPropertiesLoader,
      },

      {
        path: 'Settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: 'Login',
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
