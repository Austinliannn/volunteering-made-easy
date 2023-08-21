import React from "react";
import styles from "./styles.module.css";
import { NavigationBar } from "../../shared/navigationBar";
import { Button, Select, Table } from "antd";

function VolunteerTracker() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Total Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Check-In',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
        title: 'Check-Out',
        dataIndex: 'checkOut',
        key: 'checkOut',
      },
  ];

  const dataSource = [
    {
      key: '1',
      event: 'Help the Dogs',
      hours: '4',
      checkIn: '20/06/23 12:00:00',
      checkOut: '20/06/23 16:00:00'
    },
  ];

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
        <div className={styles.topRow}>
          <div>
            Event:
            <Select
              placeholder="Select an event"
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
              className={styles.eventSelector}
            />
          </div>
          <div className={styles.checkBtn}>
            <Button type="primary" onClick={""}>
              Check-In
            </Button>
            <Button type="primary" onClick={""} className={styles.checkOut}>
              Check-Out
            </Button>
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
