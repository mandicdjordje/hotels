import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { getFacilities } from '../../apis/hotel-api-s';

const { Option } = Select;

const HotelForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [hotelFacilities, setHotelFacilities] = useState([]);

  const handleChange = (values) => {
    console.log('Selected values:', values);
    setSelectedItems(values);
  };

  const fetchHotels = async () => {
    try {
      const data = await getFacilities({ type: 'hotel' });
      setHotelFacilities(data.data.facilities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  console.log(hotelFacilities);

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
        <Input />
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
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'facilities']} label="Facilities">
        <Select
          mode="multiple"
          style={{ width: '300px' }}
          placeholder="Select options"
          onChange={handleChange}
          value={selectedItems}
        >
          {hotelFacilities.map((item) => (
            <Option key={item.facilitie_id} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Location">
        <Input.TextArea />
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
