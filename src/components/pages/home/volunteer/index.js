import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css";
import { NavigationBar } from "../../../shared/navigationBar";
import { DropDownSelect } from "../../../shared/dropDownSelect";
import { CustomCard } from "../../../shared/customCard";
import { CustomModal } from "../../../shared/customModal";
import {
  fetchAllEvents,
  applyEvent,
  fetchUser,
} from "../../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

function VolunteerHome() {
  const [userData, setUserData] = useState();
  const [eventData, setEventData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ddlCauses, setDdlCauses] = useState([]);
  const [ddlSkills, setDdlSkills] = useState([]);
  const [ddlLocations, setDdlLocations] = useState([]);
  const [ddlAvailability, setDdlAvailability] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const token = localStorage.getItem("token");

  function DisplayImage({ contentType, data }) {
    const blob = new Blob([new Uint8Array(data.data)], { type: contentType });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  const fetchUserData = useCallback(async () => {
    const response = await fetchUser(token);
    setUserData(response);
  }, [token]);

  const showModal = (data) => {
    const imageUrl = DisplayImage({
      contentType: data.image.contentType,
      data: data.image.data,
    });
    setSelectedModalData({...data, image: imageUrl});
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const response = await applyEvent(selectedModalData, userData.user._id);
    try {
      if (response.message === "Successful") {
        message.success("Application Successfully Sent!");
        setIsModalOpen(false);
        fetchAllEvents(userData.user._id).then((eventsData) => {
          setEventData(eventsData);
          setFilteredEvents(eventsData);
        });
      }
    } catch (error) {
      message.error(
        "Application could not be sent. This may occur if you've already submitted an application for this event or if there was a problem connecting to the database. Please try again later."
      );
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  const capitalize = (data) => {
    return data
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
  };

  useEffect(() => {
    if (userData === undefined) {
      fetchUserData();
    } else {
      fetchAllEvents(userData.user._id).then((eventsData) => {
        if (eventsData !== undefined) {
          const causesArray = [
            ...new Set(eventsData.map((event) => event.cause)),
          ];
          const skillsArray = [
            ...new Set(eventsData.flatMap((event) => event.skill)),
          ];
          const locationsArray = [
            ...new Set(eventsData.flatMap((event) => event.location)),
          ];
          const availabilitiesArray = [
            ...new Set(eventsData.map((event) => event.startDate)),
          ];

          const createOptions = (array) => {
            return array.map((item) => ({
              value: capitalize(item).join(""),
              label: capitalize(item).join(" "),
            }));
          };

          setEventData(eventsData);
          setFilteredEvents(eventsData);
          setDdlCauses(createOptions(causesArray));
          setDdlSkills(createOptions(skillsArray));
          setDdlLocations(createOptions(locationsArray));
          setDdlAvailability(createOptions(availabilitiesArray));
        }
      });
    }
  }, [userData, fetchUserData]);

  const handleFilterChange = (title, selectedValues) => {
    const newFilteredEvents = eventData.filter((event) => {
      if (selectedValues === undefined || selectedValues.length === 0) {
        return true;
      }
      if (title === "Cause") {
        return selectedValues.includes(capitalize(event.cause).join(""));
      }
      if (title === "Skills") {
        return event.skill.some((skill) =>
          selectedValues.includes(capitalize(skill).join(""))
        );
      }
      if (title === "Locations") {
        return event.location.some((location) =>
          selectedValues.includes(capitalize(location).join(""))
        );
      }
      if (title === "Availability") {
        return selectedValues.includes(event.startDate);
      }
      return true;
    });
    setFilteredEvents(newFilteredEvents);
  };

  const filters = [
    {
      title: "Cause",
      placeholder: "Select Cause",
      options: ddlCauses,
      onChange: (selectedValues) => handleFilterChange("Cause", selectedValues),
      mode: "",
    },
    {
      title: "Skills",
      placeholder: "Select Skill",
      options: ddlSkills,
      onChange: (selectedValues) =>
        handleFilterChange("Skills", selectedValues),
      mode: "multiple",
    },
    {
      title: "Location",
      placeholder: "Select Location",
      options: ddlLocations,
      onChange: (selectedValues) =>
        handleFilterChange("Locations", selectedValues),
      mode: "",
    },
    {
      title: "Availability",
      placeholder: "Select From",
      options: ddlAvailability,
      onChange: (selectedValues) =>
        handleFilterChange("Availability", selectedValues),
      mode: "",
    },
  ];

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
        <div className={styles.filter}>
          {filters.map((data, index) => (
            <DropDownSelect key={index} {...data} />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.title}>
          List of Opportunities
          {userData === undefined ? (
            <LoadingOutlined style={{ fontSize: 25, marginLeft: 10 }} />
          ) : (
            ""
          )}
        </h2>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselContainer}>
          <div className={styles.cardDiv}>
            {filteredEvents.length !== 0
              ? filteredEvents.map((data, index) => (
                  <CustomCard
                    key={index}
                    data={data}
                    onClick={() => showModal(data)}
                  />
                ))
              : "There are no events posted at the moment, Please refresh and try again later."}
          </div>

          <CustomModal
            data={selectedModalData}
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            displayOk={true}
          />
        </div>
      </div>
    </>
  );
}

export default VolunteerHome;
