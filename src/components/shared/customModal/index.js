import "./styles.css";
import { Modal, Badge } from "antd";

export const CustomModal = ({ data, isModalOpen, handleOk, handleCancel, displayOk }) => {
  const displayOkStyle = (displayOk ? 'inline-block' : 'none');

  if (!data) {
    return null;
  }

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Apply"
      okButtonProps={{ style: { display: displayOkStyle } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered={true}
    >
      <div className="topContainer">
        <div className="imgContainer">
          <img src={data.image} className="imgStyle" alt="poster-img" />
        </div>
        <div className="orgContainer">
          <h2>{data.eventName}</h2>
          <br />
          Organization: {data.organizationId.organizationName} <br />
          Cause: {data.cause} <br />
          Person-In-Charge: {data.inCharge} <br />
          Start Date: {data.startDate} <br />
          End Date: {data.endDate} <br />
          Contact: {data.contact} <br />
        </div>
      </div>

      <div className="midContainer">
        <span>{data.description}</span>
      </div>

      <div className="badgeRow">
        Skills: <br />
        {data.skill.map((data, index) => (
          <Badge
            key={index}
            count={data}
            showZero
            color="blue"
            className="badgeStyle"
          />
        ))}
      </div>
      <div className="badgeRow">
        Locations: <br />
        {data.location.map((data, index) => (
          <Badge
            key={index}
            count={data}
            showZero
            color="green"
            className="badgeStyle"
          />
        ))}
      </div>
    </Modal>
  );
};
