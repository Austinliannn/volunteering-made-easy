import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import { Divider, List, Badge, Button, message } from "antd";
import NewFormModal from "../../shared/customModalForm";
import { formSet } from "./config";
import { fetchUser, updateUser } from "../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function VolunteerProfile() {
  const [profileData, setProfileData] = useState();
  const [eventData, setEventData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function DisplayImage({ contentType, data }) {
    const blob = new Blob([new Uint8Array(data.data)], { type: contentType });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  const fetchUserData = useCallback(async () => {
    const response = await fetchUser(token);
    const imageUrl = DisplayImage({
      contentType: response.user.image.contentType,
      data: response.user.image.data,
    });
    setProfileData({ ...response.user, image: imageUrl });
    setEventData(response.acceptedEvents);
  }, [token]);

  const editOnFinish = async (values, file) => {
    const response = await updateUser(profileData._id, values, file);
    try {
      if (response.message === "Successful") {
        message.success("Updated Profile Successfully");
        setIsModalOpen(false);
        fetchUserData();
      }
    } catch (error) {
      message.error(
        "Profile could not be updated. This may occur due to a problem connecting to the database. Please try again later."
      );
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if(profileData === undefined){
      fetchUserData();
    }
  }, [profileData, fetchUserData]);

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
      {profileData !== undefined ? (
        <>
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
                    src={profileData.image}
                    className={styles.profileImage}
                    alt="profile-img"
                  />
                  <div>
                    <h1>
                      {profileData.firstName + "\n" + profileData.lastName}
                    </h1>
                  </div>
                  <div>
                    Website/Linkedin:{" "}
                    <a href={profileData.link}>{profileData.link}</a>
                  </div>
                </div>

                <div className={styles.traitsContainer}>
                  <h2>Skills: </h2>
                  <div className={styles.badgesContainer}>
                    {profileData.skill.map((data, index) => (
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
                    {profileData.location.map((data, index) => (
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
                  dataSource={eventData}
                  renderItem={(item) => <List.Item>{item.eventName}</List.Item>}
                  pagination={{
                    align: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loadingDiv}>
          Loading Profile....
          <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
        </div>
      )}

      <NewFormModal
        modalTitle={"Edit Profile"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={editOnFinish}
        formSet={formSet}
        submitText={"Confirm"}
      />
    </>
  );
}

export default VolunteerProfile;
