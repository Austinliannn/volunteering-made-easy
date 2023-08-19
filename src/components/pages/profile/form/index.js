import React from "react";
import { Modal } from "antd";
import { Form, Input, Button, Select } from "antd";
import styles from "../styles.module.css";
const { Option } = Select;

function EditModal({ isModalOpen, handleCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Edit Profile"
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered={true}
    >
      <Form
        form={form}
        name="update"
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
          name="phone"
          label="Phone Number"
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
              message: "Please select your interest!",
            },
          ]}
        >
          <Select placeholder="Select your interest">
            <Option value="skill1">Skill 1</Option>
            <Option value="skill2">Skill 2</Option>
            <Option value="skill3">Skill 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: "Please select your location!",
            },
          ]}
        >
          <Select placeholder="Select your location">
            <Option value="skill1">Skill 1</Option>
            <Option value="skill2">Skill 2</Option>
            <Option value="skill3">Skill 3</Option>
          </Select>
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

        <Form.Item className={styles.applyBtn}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;