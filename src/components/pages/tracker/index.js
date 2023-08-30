import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import { Button, Select, Table } from "antd";
import { getAcceptedEvents } from "../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";
import { updateCheckIn, updateCheckOut } from "../../../services/api";

function VolunteerTracker() {
  const [eventData, setEventData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [toggleCheckIn, setToggleCheckIn] = useState(true);
  const [toggleCheckOut, setToggleCheckOut] = useState(true);
  const [ddlEvent, setDdlEvent] = React.useState([]);

  const capitalize = (data) => {
    return data
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
  };

  useEffect(() => {
    getAcceptedEvents("64e6f3589f09f2395f0cf854").then((eventsData) => {
      const eventsArray = [
        ...new Set(eventsData.map((data) => data.event.eventName)),
      ];

      const createOptions = (array) => {
        return array.map((item) => ({
          value: capitalize(item).join(""),
          label: capitalize(item).join(" "),
        }));
      };

      setEventData(eventsData);
      setFilteredEvents(eventsData);
      setDdlEvent(createOptions(eventsArray));
    });
  }, []);

  const handleChange = async (selectedValues) => {
    try {
      if (!selectedValues || selectedValues === "undefined") {
        setToggleCheckIn(true);
        setToggleCheckOut(true);
        const eventsData = await getAcceptedEvents("64e6f3589f09f2395f0cf854");
        setEventData(eventsData);
        setFilteredEvents(eventsData);
        return;
      }

      const newFilteredEvents = eventData.filter((event) => {
        const isCheckInEmpty = event.checkInDateTime === "";
        const isCheckOutEmpty = event.checkOutDateTime === "";
        const selectedEventName = capitalize(event.event.eventName).join("");

        if (selectedValues.includes(selectedEventName)) {
          if (isCheckInEmpty) {
            setToggleCheckIn(false);
            setToggleCheckOut(true);
          } else if (isCheckOutEmpty) {
            setToggleCheckIn(true);
            setToggleCheckOut(false);
          } else {
            setToggleCheckIn(true);
            setToggleCheckOut(true);
          }
          return true;
        }
        return false;
      });

      setFilteredEvents(newFilteredEvents);
    } catch (error) {
      console.error("Error handling change:", error);
    }
  };

  const handleCheckIn = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const updatedEvents = filteredEvents.map((data) => {
      const updates = {
        ...data,
        checkInDateTime: formattedDate,
      };
      updateCheckIn(updates);
      return updates;
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
      const totalHours =
        Math.floor(timeDiffMillis / (1000 * 60 * 60)) +
        Math.floor(data.totalHours);
      const updates = {
        ...data,
        totalHours: totalHours.toString(),
        checkOutDateTime: formattedDate,
      };
      updateCheckOut(updates);
      return updates;
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
      dataIndex: "event",
      key: "event",
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
  const dataSource = filteredEvents.map((data, index) => ({
    key: index,
    event: data.event.eventName,
    totalHours: data.totalHours.toString(),
    checkInDateTime: data.checkInDateTime,
    checkOutDateTime: data.checkOutDateTime,
  }));

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
            <Button
              type="primary"
              disabled={toggleCheckIn}
              onClick={handleCheckIn}
            >
              Check-In
            </Button>
            <Button
              type="primary"
              disabled={toggleCheckOut}
              onClick={handleCheckOut}
              className={styles.checkOut}
            >
              Check-Out
            </Button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {filteredEvents.length === 0 ? (
            <div className={styles.loadingDiv}>
              Loading Tracker Events....
              <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
            </div>
          ) : (
            <Table dataSource={dataSource} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
}

export default VolunteerTracker;
