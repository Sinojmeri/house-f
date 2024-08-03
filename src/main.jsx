import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header.jsx';
import Mode_switch from './components/Mode_switch.jsx';
import Notifications from './components/Notifications.jsx'
import Account_avatar from './components/Account_avatar.jsx';
import Message from './components/Message.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Header />
      },
      {
        path: '/Account',
        element: <Account_avatar/>
      },
      {
        path: '/mode_switch',
        element: <Mode_switch />
      },
      {
        path: '/notifications',
        element: <Notifications />
      },
      {
        path: '/messages',
        element: <Message />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
