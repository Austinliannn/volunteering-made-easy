import React, { useState, useEffect } from "react";
import "./styles.css";
import { Select, Table, Button, message } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import {
  fetchAllEvents,
  deleteApplicant,
  addApplicant,
} from "../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function ApplicantTracker() {
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

  const capitalize = (data) => {
    return data
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
  };

  const handleAdd = async (eventId, data) => {
    const response = await addApplicant(eventId, data);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Added Applicant to Event!");
        fetchAllEvents().then((eventData) => {
          setEventsData(eventData);
          setFilteredEvents(eventData);
        });
      } else{
        message.error("Volunteer Already Exist!");
      }
    } catch (error) {
      message.error(
        "Unable to add Applicant. This may occur due to connection problems. Please try again later."
      );
      console.error("Error updating user:", error);
    }
  };

  const handleRemove = async (eventId, data) => {
    const response = await deleteApplicant(eventId, data);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Removed Applicant from Event!");
        fetchAllEvents().then((eventData) => {
          setEventsData(eventData);
          setFilteredEvents(eventData);
        });
      }
    } catch (error) {
      message.error(
        "Unable to remove Applicant. This may occur due to connection problems. Please try again later."
      );
      console.error("Error updating user:", error);
    }
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
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Skills",
      dataIndex: "skill",
      key: "skill",
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
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource = filteredEvents.flatMap((event) => {
    if (event.applicants.length > 0) {
      return event.applicants.map((data, index) => ({
        key: `${event._id}-${index}`,
        name: data.firstName + " " + data.lastName,
        link: data.link,
        skill: data.skill.join(", "),
        email: data.email,
        contact: data.contact,
        actions: (
          <div className="actionsBtn">
            <Button
              type="primary"
              className="addBtn"
              onClick={() => handleAdd(event._id, data)}
            >
              +
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleRemove(event._id, data)}
            >
              -
            </Button>
          </div>
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

      <div className="container">
        <div className="topRow">
          <div>
            Event:
            <Select
              placeholder="Select an event"
              onChange={handleChange}
              options={ddlEvent}
              allowClear
              className="eventSelector"
            />
          </div>
        </div>

        <div className="tableContainer">
          <h2 className="headerText">Applicant List:</h2>
          {filteredEvents.length === 0 ? (
            <div className="loadingDiv">
              Loading Applicants....
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

export default ApplicantTracker;
