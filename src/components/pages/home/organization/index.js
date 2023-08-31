import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Select, Table, Button, message } from "antd";
import { NavigationBar } from "../../../shared/navigationBar";
import {
  deleteVolunteer,
  fetchUser,
  fetchEvent,
} from "../../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function OrganizationHome() {
  const [orgData, setOrgData] = useState();
  const [eventsData, setEventsData] = useState(-1);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ddlEvent, setDdlEvent] = React.useState([]);
  const token = localStorage.getItem("token");

  const fetchOrgData = async () => {
    const response = await fetchUser(token);
    setOrgData(response);
  };

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
        fetchEvent(orgData.user._id).then((eventData) => {
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
    if (orgData === undefined) {
      fetchOrgData();
    } else {
      fetchEvent(orgData.user._id).then((eventData) => {
        const eventsArray = [
          ...new Set(eventData.map((data) => data.eventName)),
        ];
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
    }
  }, [orgData]);

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
          <h2 className="headerText">
            Volunteer List:
            {orgData === undefined ? (
              <LoadingOutlined style={{ fontSize: 25, marginLeft: 10 }} />
            ) : (
              <></>
            )}
          </h2>
          <Table
            className="customTable"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}

export default OrganizationHome;
