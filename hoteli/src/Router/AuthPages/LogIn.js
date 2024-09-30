import { useState } from 'react';
import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import './AuthCss.css';
import { logIn } from './api-s/logIn';

export default function Register() {
  const onFinish = async (value) => {
    const response = await logIn(value);
    localStorage.setItem('token', response.token);
  };
  const onFinishFailed = () => {
    console.log('AAAAA');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 1200,
        }}
        initialValues={{
          remember: true,
          email: '',
          password: '',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input valid mail',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Minimun 8 characters',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
