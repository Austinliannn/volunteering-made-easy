import React, { useState, useEffect } from "react";
import "./styles.css";
import { Select, Table, Button } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import { mockEvents } from "../mockData";

function ApplicantTracker() {
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [ddlEvent, setDdlEvent] = React.useState([]);

  const handleChange = (selectedValues) => {
    const newFilteredEvents = mockEvents.filter((event) => {
      if (selectedValues === undefined || selectedValues.length === 0) {
        return event;
      } else {
        return selectedValues.includes(capitalize(event.eventName));
      }
    });
    setFilteredEvents(newFilteredEvents);
  };

  const capitalize = (data) => {
    return data
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  };

  const capitalzeLabel = (data) => {
    return data
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const eventsArray = [
      ...new Set(mockEvents.map((event) => event.eventName)),
    ];
    const createOptions = (array) => {
      return array.map((item) => ({
        value: capitalize(item),
        label: capitalzeLabel(item),
      }));
    };
    setDdlEvent(createOptions(eventsArray));
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

  const dataSource = filteredEvents.flatMap((event) =>
    event.applicants.map((data, index) => ({
      key: `${event._id}-${index}`,
      name: data.firstName + " " + data.lastName,
      link: data.link,
      skill: data.skill.join(", "),
      email: data.email,
      contact: data.contact,
      actions: (
        <div className="actionsBtn">
          <Button type="primary" className="addBtn" onClick={() => ""}>
            +
          </Button>
          <Button type="primary" danger onClick={() => ""}>
            -
          </Button>
        </div>
      ),
    }))
  );

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

export default ApplicantTracker;
