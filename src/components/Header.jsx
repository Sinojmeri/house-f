import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mode_switch from './Mode_switch';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const user = useAuthStore((store) => store.user);

  const account_list = user
    ? [
      { text: 'Settings', url: 'settings' },
      {
        text: 'List your Properties',
        url: 'list-your-properties/manage-properties',
      },
      { text: 'Questions to properties', url: 'questions-to-properties' },
      { text: 'Bookings', url: 'bookings' },
      { text: 'Complaints', url: 'complaints' },
      { text: 'Help & Support', url: 'help-support' },
      { text: 'About Us', url: 'about-us' },
      { text: 'Sign Out', url: 'sign-out' },
    ]
    : [
      { text: 'Settings', url: 'settings' },
      {
        text: 'List your Properties',
        url: 'list-your-properties/manage-properties',
      },
      // { text: 'Questions to properties', url: 'questions-to-properties' },
      // { text: 'Reviews', url: 'reviews' },
      // { text: 'Complaints', url: 'complaints' },
      { text: 'Help & Support', url: 'help-support' },
      { text: 'About Us', url: 'about-us' },
      { text: 'Login', url: 'login' },
    ];
  const [visible, setVisible] = useState('hidden');
  const navigate = useNavigate();
  const userIcon = useRef();
  const dropdownList = useRef();
  const openList = () => {
    visible === 'hidden' ? setVisible('') : setVisible('hidden');
  };
  useEffect(() => {
    const handleClick = (event) => {
      if (
        !userIcon.current.contains(event.target) &&
        !dropdownList.current.contains(event.target)
      ) {
        setVisible('hidden');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div className="flex p-1 m-1 justify-between items-center">
        <div className="relative flex flex-col">
          <img
            src="https://cdn-icons-png.freepik.com/512/147/147142.png"
            alt="User_Avatar"
            className="border-black border-2 rounded-full w-[45px] h-[45px] cursor-pointer"
            onClick={() => openList()}
            ref={userIcon}
          />
          <div
            className={`${visible} absolute flex flex-col my-2 border-2 border-black bg-[#faf0e6] w-[200px] mt-[50px] z-50`}
            ref={dropdownList}
          >
            <ul className="flex flex-col gap-2 divide-y-2">
              {account_list.map((setting) =>
                setting.text === 'Sign Out' ? (
                  <li key={setting.text} className="p-1">
                    <button
                      className="p-1 w-full text-left"
                      onClick={() => {
                        localStorage.removeItem('auth_token');
                        useAuthStore.setState({
                          user: null,
                        });
                        navigate('/');
                        setVisible('hidden');
                      }}
                    >
                      {setting.text}
                    </button>
                  </li>
                ) : (
                  <li key={setting.text} className="p-1">
                    <Link
                      to={`/${setting.url}`}
                      onClick={() => setVisible('hidden')}
                    >
                      {setting.text}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {user ? <div>Welcome, {user.firstName}</div> : <div />}

        <div className="flex p-1 m-1 gap-2">
          <Link to='/'>
            <img src="/home_icon.png"
              alt="homeIcon"
              className='w-[30px] h-[30px] cursor-pointer'
              title='Home' />
          </Link>
          <Link to="/notifications">
            <img
              src="/notification.png"
              alt="notification.empty"
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </Link>
          <Link to="/messages">
            <img
              src="/message.png"
              alt="empty_inbox"
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </Link>
          <Mode_switch />
        </div>
      </div>
    </>
  );
}
