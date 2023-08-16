import React from "react";
import { Form, Input, Button } from "antd";
import styles from '../styles.module.css'
// import { Form, Input, Button, Select } from "antd";
// const { Option } = Select;

function OrgSignUpForm({onFinish}) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      className={styles.tabContent}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "The input is not valid Email!",
          },
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="organizationName"
        label="Organization Name"
        rules={[
          {
            required: true,
            message: "Please input your organization name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: "Please input website!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please input address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Upload Organization Image"
        rules={[
          {
            required: true,
            message: "Please upload an image!",
          },
        ]}
      >
        <Input type="file" />
      </Form.Item>

      <Form.Item className={styles.submitBtn}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OrgSignUpForm;
