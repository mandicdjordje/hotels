import { useState } from 'react';
import Kartica from './Kartica';

import { Button, Checkbox, Form, Input } from 'antd';
export default function CreateAdmin() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onMouseEnter = (event) => {
    event.target.style.background = '#F5F5F5';
    event.target.style.transition = `0.5s`;
  };
  const onMouseLeave = (event) => {
    event.target.style.background = '#FFFFFF';
  };
  return (
    <Form
      name="basic"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        marginInline: 'auto',
        marginTop: 200,
        border: '2px solid #C0C0C0',
        padding: 20,
        borderRadius: '30px',
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last Name"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Molimo unesite email adresu!',
          },
          {
            type: 'email',
            message: 'Uneta email adresa nije validna!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={null}
        style={{
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'right',
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
