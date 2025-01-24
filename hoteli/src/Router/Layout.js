import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid';
import {
  HomeOutlined,
  PlusCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { HotelIcon } from '../icons';
const items = [
  {
    label: 'Pocetna',
    key: '/homePage',
    icon: <HomeOutlined />,
  },
  {
    label: 'Create Admin',
    key: '/createAdmin',
    icon: <UserAddOutlined />,
    style: { color: '#4E89FF' },
  },
  {
    label: 'Delete Admin',
    key: '/deleteAdmin',
    icon: <UserDeleteOutlined />,
    danger: true,
  },
  {
    label: 'Hotel',
    key: '/CreateHotel',
    icon: <HotelIcon  />,
  },
  {
    label: 'Registruj Se',
    key: '/register',
    icon: <PlusCircleOutlined />,
  },
  {
    label: 'Log In',
    key: '/logIn',
    icon: <LoginOutlined />,
  },
  {
    label: 'Sign Out',
    key: '/signOut',
    icon: <LogoutOutlined />,
    danger: true,
  },
];
const Layout = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </>
  );
};
export default Layout;
