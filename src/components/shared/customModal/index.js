import "./styles.css";
import { Modal, Badge } from "antd";

export const CustomModal = ({ data, isModalOpen, handleOk, handleCancel }) => {
  if (!data) {
    return null;
  }

  return (
    <Modal
      title={data.title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Apply"
      cancelButtonProps={{ style: { display: "none" } }}
      centered={true}
    >
      <div className="imgContainer">
        <img src={data.image} className="imgStyle" alt="poster-img" />
      </div>
      <div className="desContainer">
        <span>{data.description}</span>
      </div>
      {data.badgesData.map(({ text, color }, index) => (
        <Badge
          key={index}
          count={text}
          showZero
          color={color}
          className="badgeStyle"
        />
      ))}
    </Modal>
  );
};
