import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { NavigationBar } from "../../../shared/navigationBar";
import { DropDownSelect } from "../../../shared/dropDownSelect";
import { CustomCard } from "../../../shared/customCard";
import { CustomModal } from "../../../shared/customModal";
import { fetchAllEvents, applyEvent, fetchUser } from "../../../../services/api";
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
  const token = localStorage.getItem('token');

  const fetchUserData = async () => {
    const response = await fetchUser(token);
    setUserData(response);
  };

  const showModal = (data) => {
    setSelectedModalData(data);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const response = await applyEvent(
      selectedModalData,
      userData.user._id,
    );
    try {
      if (response.message === "Successful") {
        message.success("Application Successfully Sent!");
        setIsModalOpen(false);
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
    fetchUserData();
    fetchAllEvents().then((eventsData) => {
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
  }, []);

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
        <h2 className={styles.title}>List of Opportunities</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselContainer}>
          {filteredEvents.length === 0 ? (
            <div className={`${styles.loadingDiv} ${styles.vol}`}>
              Loading Events....
              <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
            </div>
          ) : (
            filteredEvents.map((data, index) => (
              <div key={index} className={styles.cardDiv}>
                <CustomCard data={data} onClick={() => showModal(data)} />
              </div>
            ))
          )}
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
