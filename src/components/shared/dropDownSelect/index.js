import React from "react";
import styles from "./styles.module.css";
import { Select } from "antd";

export const DropDownSelect = ({ title, placeholder, options, onChange, mode }) => {
  return (
    <div>
      {title}: <br />
        <Select
          className={styles.content}
          mode={mode}
          allowClear
          placeholder={placeholder}
          defaultValue={[]}
          onChange={onChange}
          options={options}
        />
    </div>
  );
};
