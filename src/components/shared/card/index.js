import styles from "./styles.module.css"
import { Card, Badge } from "antd";

export const CustomCard = ({ title, text, badges }) => {
  return (
    <Card size="small" title={title} className={styles.cardTitle}>
      <span>{text}</span>
      <br />
      <br />
      {badges.map(({ text, color }, index) => (
        <Badge key={index} count={text} showZero color={color} />
      ))}
    </Card>
  );
};
