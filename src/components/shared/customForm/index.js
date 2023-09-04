import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import styles from "./styles.module.css";
const { Option } = Select;

function NewForm({ name, onFinish, formSet, submitText }) {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const { TextArea } = Input;

  return (
    <Form
      form={form}
      name={name}
      onFinish={(values) => onFinish(values, file)}
      scrollToFirstError
      className={styles.tabContent}
    >
      {formSet.map((data, index) => (
        <Form.Item
          name={data.name}
          label={data.label}
          htmlFor={data.label}
          rules={data.rule}
          key={index}
          dependencies={data.dependencies}
        >
          <div>
            {data.fieldType.name === "input" ? (
              <Input type={data.fieldType.type} id={data.label} />
            ) : (
              ""
            )}
            {data.fieldType.name === "image" ? (
              <Input
                name={data.fieldType.name}
                type='file'
                id={data.label}
                accept={data.fieldType.accept}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFile(file);
                }}
              />
            ) : (
              ""
            )}
            {data.fieldType.name === "inputPassword" ? (
              <Input.Password id={data.label} />
            ) : (
              ""
            )}
            {data.fieldType.name === "textArea" ? (
              <TextArea rows={4} id={data.label} />
            ) : (
              ""
            )}
            {data.fieldType.name === "selector" ? (
              <Select
                placeholder={`Select ${data.label}`}
                allowClear
                onChange={(value) => {
                  form.setFieldsValue({ [data.name]: value });
                }}
                id={data.label}
                mode={data.fieldType.mode}
              >
                {data.fieldType.option.map((option, index) => (
                  <Option key={index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : (
              ""
            )}
          </div>
        </Form.Item>
      ))}
      <Form.Item className={styles.applyBtn}>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewForm;
