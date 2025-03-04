import { Modal, Form, Input, Select } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { getCountries, getCitiesFromCountries } from '../../apis/hotel-api-s';
import { debounce } from 'lodash';
const { Option } = Select;

const LocationModal = ({ isOpen, handleOk, handleCancel }) => {
  const [searchCountryValue, setSearchCountryValue] = useState('');
  const [formValues, setFormValues] = useState({
    state: '',
    city: '',
    address: '',
  });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountrySearch = useCallback(
    debounce((value) => {
      console.log('Searching for:', value);
      setSearchCountryValue(value);
    }, 500),
    []
  );

  const fetchCountries = async () => {
    if (!searchCountryValue) return;
    try {
      setLoading(true);
      const _countries = await getCountries({ name: searchCountryValue });
      setCountries(_countries.data.countries);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const _cities = await getCitiesFromCountries({ country_code: code });
      setCities(_cities.data.cities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [code]);

  useEffect(() => {
    fetchCountries();
  }, [searchCountryValue]);

  return (
    <Modal
      open={isOpen}
      onOk={() => {
        handleOk(formValues);
      }}
      onCancel={handleCancel}
      width={400}
    >
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Drzava"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            loading={loading}
            showSearch
            style={{ width: 200 }}
            placeholder="Select a countrie"
            optionFilterProp="children"
            onSearch={(value) => {
              handleCountrySearch(value);
            }}
            onChange={(value) => {
              setFormValues({
                ...formValues,
                state: value,
              });

              const _code = countries.find((c) => c.name === value)?.code || '';
              setCode(_code);
            }}
          >
            {countries.map((countrie) => (
              <Option
                key={countrie.name}
                value={countrie.value}
                label={countrie.name}
              >
                {countrie.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Grad"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            onChange={(value) => {
              setFormValues({
                ...formValues,
                city: value,
              });
              console.log(formValues);
            }}
            style={{ width: 200 }}
          >
            {cities.map((city) => (
              <Option key={city.name} value={city.name} label={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Adresa"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{ width: 200 }}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                address: e.target.value,
              });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LocationModal;
