import React from "react";
import styles from "./styles.module.css";
import { Card, Badge } from "antd";

export const CustomCard = ({ data, onClick }) => {
  return (
    <Card
      size="small"
      title={data.eventName}
      onClick={onClick}
      className={styles.cardTitle}
    >
      <span>{data.shortDesc}</span>
      <h5>From: {data.startDate}</h5>
      {data.skill.map((data, index) => (
        <Badge
          key={index}
          count={data}
          showZero
          color="blue"
          className={styles.badgeStyle}
        />
      ))}
      <br />

      {data.location.map((data, index) => (
        <Badge
          key={index}
          count={data}
          showZero
          color="green"
          className={styles.badgeStyle}
        />
      ))}
    </Card>
  );
};
