import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Switch,
  Table,
  Checkbox,
  CheckboxProps,
  Input,
  checkedItems,
  Grid,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getHotels, searchHotel } from '../../apis/hotel-api-s';
import { current } from '@reduxjs/toolkit';

const HotelTable = () => {
  const [fixedTop, setFixedTop] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [hotels, setHotels] = useState({ count: 0, data: [] });
  const [filteredData, setFilteredData] = useState(hotels);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const handleClick = () => {
    navigate('/CreateHotel');
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const data = await getHotels({
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: searchText,
      });
      setHotels(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [pagination]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
    fetchHotels();
  }, [searchText]);

  console.log(hotels);
  const onChangleHandler = async (tablePagination) => {
    if (tablePagination.pageSize !== pagination.pageSize) {
      console.log('sss');
      setPagination({
        ...tablePagination,
        current: 1,
      });
      return;
    }
    setPagination(tablePagination);
  };

  const columns = [
    {
      title: 'Ime Hotela',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <strong style={{ letterSpacing: 1, fontSize: 15, color: '	#989898' }}>
          {name}
        </strong>
      ),
    },
    {
      title: 'Broj Soba',
      dataIndex: 'number_of_rooms',
      key: 'number_of_rooms',
      render: (number_of_rooms) => (
        <strong style={{ letterSpacing: 1, fontSize: 25, color: '	#989898' }}>
          {number_of_rooms}
        </strong>
      ),
    },
    {
      title: 'Lokacija',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <>
          <p>
            <span>{location.address}</span>, &nbsp;
            <span>{location.postalCode}</span>, &nbsp;
            <span>{location.city}</span>, &nbsp;
            <span>{location.state}</span>
          </p>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => (
        <>
          <span>
            <Button type="primary">
              <EditOutlined /> Edit
            </Button>
            &nbsp;
            <Button type="primary" danger>
              <DeleteOutlined />
              Delete
            </Button>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button style={{ padding: 20 }} type="primary" onClick={handleClick}>
          Create
        </Button>
        <Input
          style={{ marginBottom: 20, width: 300 }}
          placeholder="Search for hotel"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={hotels.data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          total: hotels.count,
          pageSizeOptions: ['5', '10', '15'],
        }}
        onChange={(val) => onChangleHandler(val)}
        summary={() => (
          <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={2} colSpan={2}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </>
  );
};

export default HotelTable;
