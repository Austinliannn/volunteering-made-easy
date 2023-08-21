import React from "react";
import { Form, Input, Button, Select, Modal } from "antd";
import styles from "../styles.module.css";
const { Option } = Select;

function NewEventModal({ isModalOpen, handleCancel, onFinish }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <Modal
      title="Post New Event"
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered={true}
    >
      <Form
        form={form}
        name="addEvent"
        onFinish={onFinish}
        scrollToFirstError
        className={styles.tabContent}
      >
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[
            {
              required: true,
              message: "Please input your Event Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[
            {
              required: true,
              message: "Please input your Start Date!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[
            {
              required: true,
              message: "Please input your End Date!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="inCharge"
          label="In-Charge"
          rules={[
            {
              required: true,
              message: "Please input your naem of In-Charge!",
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
              message: "Please input your Contact Number!",
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
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your Description!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="eventImage"
          label="Event Image"
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
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewEventModal;