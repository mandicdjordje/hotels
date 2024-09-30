import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  HomeOutlined,
  PlusCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: 'Pocetna',
    key: '/homePage',
    icon: <HomeOutlined />,
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
    console.log('click ', e);
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
