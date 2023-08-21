import React from "react";
import { Form, Input, Button, Select } from "antd";
import styles from '../styles.module.css'
const { Option } = Select;

function VolSignUpForm({onFinish}) {
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
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contact"
        label="Contact Number"
        rules={[
          {
            required: true,
            message: "Please input your Contact number!",
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
        name="skill"
        label="Skill"
        rules={[
          {
            required: true,
            message: "Please select your skill!",
          },
        ]}
      >
        <Select placeholder="Select your skill">
          <Option value="skill1">Skill 1</Option>
          <Option value="skill2">Skill 2</Option>
          <Option value="skill3">Skill 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="interest"
        label="Interest"
        rules={[
          {
            required: true,
            message: "Please input your interest!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            required: true,
            message: "Please input your location!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Upload Image"
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

export default VolSignUpForm;
