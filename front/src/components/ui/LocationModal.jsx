import { Modal, Form, Input, Select } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { getCountries } from '../../apis/hotel-api-s';
import { debounce } from 'lodash';
const { Option } = Select;

const LocationModal = ({ isOpen, handleOk, handleCancel }) => {
  const [searchCountryValue, setSearchCountryValue] = useState();
  const handleSearch = useCallback(
    debounce((value) => {
      // console.log('Searching for:', value);
      setSearchCountryValue(value);
    }, 1000),
    []
  );

  const fetchCountries = async () => {
    console.log(searchCountryValue);
    const countries = await getCountries({ name: searchCountryValue });
    console.log(countries.data);
  };

  useEffect(() => {
    fetchCountries();
  }, [searchCountryValue]);
  return (
    <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form>
        <Form.Item
          name={['user', 'drzava']}
          label="Drzava"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a city"
            optionFilterProp="children"
            onSearch={(value) => {
              console.log(value);
              handleSearch(value);
            }}
            onChange={(value) => {
              setSearchCountryValue(value);
            }}
          ></Select>
        </Form.Item>
        <Form.Item
          name={['user', 'grad']}
          label="Grad"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'adresa']}
          label="Adresa"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LocationModal;
