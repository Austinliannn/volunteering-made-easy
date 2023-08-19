import styles from "./styles.module.css";
import { Card, Badge } from "antd";

export const CustomCard = ({ title, summary, badges, onClick }) => {
  return (
    <Card
      size="small"
      title={title}
      onClick={onClick}
      className={styles.cardTitle}
    >
      <span>{summary}</span>
      <br />
      <br />
      {badges.map(({ text, color }, index) => (
        <Badge key={index} count={text} showZero color={color} className={styles.badgeStyle}/>
      ))}
    </Card>
  );
};
