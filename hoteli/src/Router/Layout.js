import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './Pages/HomePage';
import LogIn from './AuthPages/LogIn';
import Register from './AuthPages/Register';
import { Menu } from 'antd';
const items = [
  {
    label: 'Pocetna',
    key: 'mail',
  },
  {
    label: 'Registruj Se',
    key: 'register',
  },
  {
    label: 'Log In',
    key: 'logIn',
  },
];
const Layout = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
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
