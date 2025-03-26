import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { getFacilities, CreateHotel } from "../../apis/hotel-api-s";
import LocationModal from "./LocationModal";
const { Option } = Select;

const HotelForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hotelFacilities, setHotelFacilities] = useState({
    count: 0,
    data: [],
  });
  const [form] = Form.useForm();
  const [isModalFormFull, setisModalFormFull] = useState(false);
  const [hotelForm, sethotelForm] = useState({
    location: { state: "", city: "", address: "" },
    hotel: { name: "", number_of_room: 0 },
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

  const handleChange = (values) => {
    setSelectedItems(values);
  };

  const fetchHotels = async () => {
    try {
      const response = await getFacilities({
        page: page,
        pageSize: 10,
        type: "hotel",
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
    required: "${label} je obavezan!!",
    types: {
      number: "${label} mora biti broj",
    },
    number: {
      range: "${label} mora biti izmedju ${min} i ${max}",
    },
  };

  const createHotelFunction = async (value) => {
    try {
      const hotel = await CreateHotel(value);
      return console.log(hotel.message);
    } catch (error) {
      console.error(console.error());
    }
  };
  const onFinish = (values) => {
    let hotel = values.hotel;
    sethotelForm((prevState) => ({
      location: { ...prevState.location },
      ...prevState,
      hotel,
    }));

    console.log(hotelForm);
  };
  const isFillModalForm = (form) => {
    if (form.name) {
    }
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
        name={["hotel", "name"]}
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
        name={["hotel", "number_rooms"]}
        label="Broj Soba"
        rules={[
          {
            type: "number",
            required: true,
            min: 1,
            max: 500,
          },
        ]}
      >
        <InputNumber style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        name={["hotel", "facilities"]}
        label="Facilities"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <div>
          <Select
            mode="multiple"
            style={{ width: "200px" }}
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
              <Option key={facility.name} value={facility.name}>
                {facility.name}
              </Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item
        name={["hotel", "location"]}
        label="Location"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Button type="primary" onClick={showModal}>
          Open Location
        </Button>
        <LocationModal
          isFilled={isFillModalForm}
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
