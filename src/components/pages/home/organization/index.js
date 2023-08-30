import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Select, Table, Button, message } from "antd";
import { NavigationBar } from "../../../shared/navigationBar";
import { fetchAllEvents, deleteVolunteer } from "../../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function OrganizationHome() {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ddlEvent, setDdlEvent] = React.useState([]);

  const handleChange = (selectedValues) => {
    const newFilteredEvents = eventsData.filter((event) => {
      if (selectedValues === undefined || selectedValues.length === 0) {
        return event;
      } else {
        return selectedValues.includes(capitalize(event.eventName).join(""));
      }
    });
    setFilteredEvents(newFilteredEvents);
  };

  const handleRemove = async (eventId, data) => {
    const response = await deleteVolunteer(eventId, data);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Removed Volunteer from Event!");
        fetchAllEvents().then((eventData) => {
          setEventsData(eventData);
          setFilteredEvents(eventData);
        });
      }
    } catch (error) {
      message.error(
        "Unable to remove Volunteer. This may occur due to connection problems. Please try again later."
      );
      console.error("Error updating user:", error);
    }
  };

  const capitalize = (data) => {
    return data
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
  };

  useEffect(() => {
    fetchAllEvents().then((eventData) => {
      const eventsArray = [...new Set(eventData.map((data) => data.eventName))];
      const createOptions = (array) => {
        return array.map((item) => ({
          value: capitalize(item).join(""),
          label: capitalize(item).join(" "),
        }));
      };

      setEventsData(eventData);
      setFilteredEvents(eventData);
      setDdlEvent(createOptions(eventsArray));
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource = filteredEvents.flatMap((event) => {
    if (event.acceptedVolunteers.length > 0) {
      return event.acceptedVolunteers.map((data, index) => ({
        key: `${event._id}-${index}`,
        name: data.firstName + " " + data.lastName,
        event: event.eventName,
        email: data.email,
        contact: data.contact,
        link: data.link,
        actions: (
          <Button
            type="primary"
            danger
            onClick={() => handleRemove(event._id, data)}
          >
            Remove
          </Button>
        ),
      }));
    }
    return [];
  });

  return (
    <>
      <NavigationBar
        home="/organization"
        logout="/"
        tab1="/applicant"
        tab1Name="Applicant"
        tab2="/event"
        tab2Name="Event"
      />

      <div className={styles.container}>
        <div className={styles.topRow}>
          <div>
            Event:
            <Select
              placeholder="Select an event"
              onChange={handleChange}
              options={ddlEvent}
              allowClear
              className={styles.eventSelector}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <h2 className="headerText">Volunteer List:</h2>
          {filteredEvents.length === 0 ? (
            <div className={styles.loadingDiv}>
              Loading Volunteers....
              <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
            </div>
          ) : (
            <Table
              className="customTable"
              dataSource={dataSource}
              columns={columns}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default OrganizationHome;
