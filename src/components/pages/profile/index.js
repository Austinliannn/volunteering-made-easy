import React from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import profilePic from "../../../assets/man.png";
import { Divider, List, Badge, Button } from "antd";
import EditModal from "./form";


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

  const data = {
    name: "John Doe",
    link: "www.johndoe.com",
    skills: [
      { text: "Web Development", color: "#17A2B8" },
      { text: "HTML", color: "#17A2B8" },
      { text: "CSS", color: "#17A2B8" },
      { text: "JavaScript", color: "#17A2B8" },
    ],
    interests: [
      { text: "Basketball", color: "#17A2B8" },
      { text: "Soccer", color: "#17A2B8" },
      { text: "Coding", color: "#17A2B8" },
      { text: "JavaScript", color: "#17A2B8" },
    ],
    locations: [
      { text: "Bedok", color: "#28A745" },
      { text: "Serangoon", color: "#eab308" },
      { text: "Yishun", color: "#b91c1c" },
    ],
    events: ["Help the Dog", "Help the Cat", "Help the Elephant"],
  };

  return (
    <>
      <NavigationBar
        home="/volunteer"
        logout="/"
        tab1="/tracker"
        tab1Name="Tracker"
        tab2="/profile"
        tab2Name="Profile"
      />
      <div className={styles.container}>
        <div className={styles.editContainer}>
          <Button className={styles.editBtn} type="primary" onClick={() => showModal()}>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.profContainer}>
            <div className={styles.header}>
              <img
                src={profilePic}
                className={styles.profileImage}
                alt="profile-img"
              />
              <div>
                <h1>{data.name}</h1>
              </div>
              <div>
                Website/Linkedin: <a href={data.link}>{data.link}</a>
              </div>
            </div>

            <div className={styles.traitsContainer}>
              <h2>Skills: </h2>
              <div className={styles.badgesContainer}>
                {data.skills.map(({ text, color }, index) => (
                  <Badge
                    key={index}
                    count={text}
                    color={color}
                    className={styles.badgeStyle}
                  />
                ))}
              </div>
            </div>

            <div className={styles.traitsContainer}>
              <h2>Interests: </h2>
              <div className={styles.badgesContainer}>
                {data.interests.map(({ text, color }, index) => (
                  <Badge
                    key={index}
                    count={text}
                    color={color}
                    className={styles.badgeStyle}
                  />
                ))}
              </div>
            </div>

            <div className={styles.traitsContainer}>
              <h2>Locations: </h2>
              <div className={styles.badgesContainer}>
                {data.locations.map(({ text, color }, index) => (
                  <Badge
                    key={index}
                    count={text}
                    color={color}
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
              dataSource={data.events}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              pagination={{
                align: "center",
              }}
            />
          </div>
        </div>
      </div>

      <EditModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={editOnFinish}
      />
    </>
  );
}

export default VolunteerProfile;
