import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Mode_switch from './Mode_switch';

export default function Header() {
  const account_list = [
    'Manage your account',
    'Questions to properties',
    'Reviews',
    'Complaints',
    'Settings',
    'Help & Support',
    'List your Properties',
    'Sign Out',
    'Sign Up',
  ];
  const [visible, setVisible] = useState('hidden');
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
            className={`${visible} absolute flex flex-col my-2 border-2 border-black bg-[#faf0e6] w-[200px] mt-[50px] z-10`}
            ref={dropdownList}
          >
            <ul className="flex flex-col gap-2 divide-y-2">
              {account_list.map((setting) => (
                <li className="p-1" key={setting}>
                  <Link
                    to={`/${setting}`}
                    onClick={() => setVisible('hidden')}
                  >{`${setting}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex p-1 m-1 gap-2">
          <Link to="/notifications">
            <img
              src="notification.png"
              alt="notification.empty"
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </Link>
          <Link to="/messages">
            <img
              src="message.png"
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
