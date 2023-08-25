import React from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import { Divider, List, Badge, Button } from "antd";
import { mockUsers } from "../mockData";
import NewFormModal from "../../shared/customModalForm";
import { formSet } from "./config";

function VolunteerProfile() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editOnFinish = (values) => {
    console.log("Volunteer edit values of form: ", values);
  };

  const data = mockUsers[0];

  return (
    <>
      <NavigationBar
        home="/volunteer"
        logout="/"
        tab1="/profile"
        tab1Name="Profile"
        tab2="/tracker"
        tab2Name="Tracker"
      />
      <div className={styles.container}>
        <div className={styles.editContainer}>
          <Button
            className={styles.editBtn}
            type="primary"
            onClick={() => showModal()}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.profContainer}>
            <div className={styles.header}>
              <img
                src={data.image}
                className={styles.profileImage}
                alt="profile-img"
              />
              <div>
                <h1>{data.firstName + "\n" + data.lastName}</h1>
              </div>
              <div>
                Website/Linkedin: <a href={data.link}>{data.link}</a>
              </div>
            </div>

            <div className={styles.traitsContainer}>
              <h2>Skills: </h2>
              <div className={styles.badgesContainer}>
                {data.skill.map((data, index) => (
                  <Badge
                    key={index}
                    count={data}
                    color="blue"
                    className={styles.badgeStyle}
                  />
                ))}
              </div>
            </div>

            <div className={styles.traitsContainer}>
              <h2>Locations: </h2>
              <div className={styles.badgesContainer}>
                {data.location.map((data, index) => (
                  <Badge
                    key={index}
                    count={data}
                    color="green"
                    className={styles.badgeStyle}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.eventContainer}>
            <Divider orientation="center">Past Events:</Divider>
            <List
              size="small"
              dataSource={data.acceptedEvents}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              pagination={{
                align: "center",
              }}
            />
          </div>
        </div>
      </div>

      <NewFormModal
        modalTitle={"Edit Profile"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={editOnFinish}
        formSet={formSet}
      />
    </>
  );
}

export default VolunteerProfile;
