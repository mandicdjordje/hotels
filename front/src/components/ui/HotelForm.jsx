import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { getFacilities } from '../../apis/hotel-api-s';
import LocationModal from './LocationModal';
const { Option } = Select;

const HotelForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotelFacilities, setHotelFacilities] = useState({
    count: 0,
    data: [],
  });

  const [hotelForm, sethotelForm] = useState({
    location: { state: '', city: '', address: '' },
    hotel: { name: '', number_of_room: 0 },
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (location) => {
    console.log(location);
    sethotelForm((prevState) => ({
      ...prevState,
      location: { ...prevState.location, ...location },
    }));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(hotelForm);

  const [page, setPage] = useState(1);
  const handleChange = (values) => {
    setSelectedItems(values);
  };

  const fetchHotels = async () => {
    try {
      const response = await getFacilities({
        page: page,
        pageSize: 10,
        type: 'hotel',
      });

      setHotelFacilities({
        count: response.data.count,
        data: [...hotelFacilities.data, ...response.data.data],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['user', 'name']}
        label="Naziv Hotela"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name={['user', 'number_rooms']}
        label="Broj Soba"
        rules={[
          {
            type: 'number',
            min: 1,
            max: 500,
          },
        ]}
      >
        <InputNumber style={{ width: 200 }} />
      </Form.Item>
      <Form.Item name={['user', 'facilities']} label="Facilities">
        <Select
          mode="multiple"
          style={{ width: '200px' }}
          placeholder="Select options"
          onChange={handleChange}
          value={selectedItems}
          onPopupScroll={(e) => {
            const { target } = e;

            if (
              target.scrollTop + target.offsetHeight ===
              target.scrollHeight
            ) {
              if (hotelFacilities.data.length < hotelFacilities.count) {
                setPage(page + 1);
              }
            }
          }}
        >
          {hotelFacilities.data.map((facility) => (
            <Option key={facility.facilitie_id} value={facility.name}>
              {facility.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Location">
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <LocationModal
          isOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HotelForm;
