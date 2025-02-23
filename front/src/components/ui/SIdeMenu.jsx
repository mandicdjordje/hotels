import HotelImage from '../../img/hotel';

import { useNavigate } from 'react-router';

import React, { useState } from 'react';
import { UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const SideMeni = ({ collapsed }) => {
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState('hotel');

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', minHeight: '100vh' }}
        selectedKeys={selectedKey}
        onClick={({ key }) => setSelectedKey(key)}
        items={[
          {
            key: 'hotel',
            icon: (
              <HotelImage
                style={{
                  width: 14,
                  height: 14,
                  fill: 'white',
                }}
              />
            ),
            label: 'Hotel',
            onClick: () => {
              navigate('/');
            },
          },
          {
            key: 'label',
            icon: <VideoCameraOutlined />,
            label: 'Nav 2',
          },
          {
            key: 'reservation',
            icon: <UploadOutlined />,
            label: 'Nav 3',
          },
          {
            key: 'create',
          },
        ]}
      />
    </Sider>
  );
};
export default SideMeni;
