import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import { Button, Select, Table } from "antd";
import { mockAcceptedEvents } from "../mockData";

function VolunteerTracker() {
  const [filteredEvents, setFilteredEvents] = useState(mockAcceptedEvents);
  const [toggleCheckIn, setToggleCheckIn] = useState(true);
  const [toggleCheckOut, setToggleCheckOut] = useState(true);
  const [ddlEvent, setDdlEvent] = React.useState([]);
  const [eventSelected, setEventSelected] = useState("");

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
      ...new Set(mockAcceptedEvents.map((event) => event.eventId.eventName)),
    ];
    const createOptions = (array) => {
      return array.map((item) => ({
        value: capitalize(item),
        label: capitalzeLabel(item),
      }));
    };
    setDdlEvent(createOptions(eventsArray));
  }, []);

  const handleChange = (selectedValues) => {
    setEventSelected(selectedValues);
    const newFilteredEvents = mockAcceptedEvents.filter((event) => {
      if (selectedValues === undefined || selectedValues.length === 0) {
        return event;
      } else {
        return selectedValues.includes(capitalize(event.eventId.eventName));
      }
    });
    setFilteredEvents(newFilteredEvents);
    if (filteredEvents.checkInDateTime === undefined)
    {
      setToggleCheckIn(false)
    };
  };

  const handleCheckIn = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const updatedEvents = filteredEvents.map((event) => {
      return {
        ...event,
        checkInDateTime: formattedDate,
        checkOutDateTime: '',
      };
    });
    setFilteredEvents(updatedEvents);
    setToggleCheckIn(true);
    setToggleCheckOut(false);
  };

  const handleCheckOut = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const updatedEvents = filteredEvents.map((data) => {
      const checkIn = new Date(data.checkInDateTime);
      const checkOut = new Date(formattedDate);
      const timeDiffMillis = checkOut - checkIn;
      const totalHours = Math.floor(timeDiffMillis / (1000 * 60 * 60)) + Math.floor(data.totalHours);
      return {
        ...data,
        totalHours: totalHours.toString(),
        checkOutDateTime: formattedDate,
      };
    });
    setFilteredEvents(updatedEvents);
    setToggleCheckIn(false);
    setToggleCheckOut(true);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const columns = [
    {
      title: "Event",
      dataIndex: "eventId",
      key: "eventId",
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      key: "totalHours",
    },
    {
      title: "Check-In",
      dataIndex: "checkInDateTime",
      key: "checkInDateTime",
    },
    {
      title: "Check-Out",
      dataIndex: "checkOutDateTime",
      key: "checkOutDateTime",
    },
  ];

  const dataSource = filteredEvents.map((data, index) => {
    return {
      key: index,
      eventId: data.eventId.eventName,
      totalHours: data.totalHours.toString(),
      checkInDateTime: data.checkInDateTime,
      checkOutDateTime: data.checkOutDateTime,
    };
  });

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
        <div className={styles.topRow}>
          <div>
            Event:
            <Select
              placeholder="Select an event"
              onChange={handleChange}
              options={ddlEvent}
              className={styles.eventSelector}
              allowClear
            />
          </div>
          <div className={styles.checkBtn}>
            {eventSelected === "" && (
              <>
                <Button type="primary" disabled={toggleCheckIn} onClick={""}>
                  Check-In
                </Button>
                <Button
                  type="primary"
                  disabled={toggleCheckOut}
                  onClick={""}
                  className={styles.checkOut}
                >
                  Check-Out
                </Button>
              </>
            )}
            {(eventSelected !== "" && filteredEvents.checkInDateTime === undefined) && (
              <>
                <Button type="primary" disabled={toggleCheckIn} onClick={(handleCheckIn)}>
                  Check-In
                </Button>
                <Button
                  type="primary"
                  disabled={toggleCheckOut}
                  onClick={(handleCheckOut)}
                  className={styles.checkOut}
                >
                  Check-Out
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default VolunteerTracker;
