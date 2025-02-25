import { Modal, Form, Input, Select } from "antd";
import { useState, useCallback } from "react";
import { getCountries } from "../../apis/hotel-api-s";
import { debounce } from "lodash";
const { Option } = Select;

const LocationModal = ({ isOpen, handleOk, handleCancel }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { value: "belgrade", label: "Belgrade" },
    { value: "novi-sad", label: "Novi Sad" },
    { value: "nis", label: "Niš" },
  ];

  const handleSearch = useCallback(
    debounce((value) => {
      console.log("Searching for:", value);
      setSelectedValue(value);
    }, 5000),
    []
  );
  return (
    <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form>
        <Form.Item
          name={["user", "drzava"]}
          label="Drzava"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Select a city"
            optionFilterProp="children"
            onChange={handleSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            value={selectedValue}
          >
            {options.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["user", "grad"]}
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
          name={["user", "adresa"]}
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
