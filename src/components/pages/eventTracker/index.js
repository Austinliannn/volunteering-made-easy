import React from "react";
import styles from "./styles.module.css";
import { Table, Button } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import NewEventModal from "./form";

function EventTracker() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addOnFinish = (values) => {
    console.log("Added new Event: ", values);
  };

  const currentEventColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Volunteers",
      dataIndex: "volunteers",
      key: "volunteers",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "In-Charge",
      dataIndex: "inCharge",
      key: "inCharge",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const currentEventDS = [
    {
      key: "1",
      name: "Help the Elderly",
      volunteers: "20",
      startDate: "11/6/2023",
      endDate: "23/6/2023",
      inCharge: "Charles",
      contact: "98765432",
      location: "Hougang",
      actions: (
        <div className="actionsBtn">
          <Button type="primary" onClick={() => ""}>
            Edit
          </Button>
          <Button type="primary" className="addBtn" onClick={() => ""}>
            Complete
          </Button>
        </div>
      ),
    },
  ];

  const completedEventColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const completedEventDS = [
    {
      key: "1",
      name: "Help the Dops",
      actions: (
        <Button type="primary" onClick={() => ""}>
          View
        </Button>
      ),
    },
  ];

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
        <div className={styles.content}>
          <div className={styles.currentList}>
            <div className={styles.headerRow}>
              <div>
                <h2 className="headerText">Current Events: </h2>
              </div>
              <div>
                <Button type="primary" onClick={() => showModal()}>
                  Post New Event
                </Button>
              </div>
            </div>
            <Table
              className="customTable"
              dataSource={currentEventDS}
              columns={currentEventColumn}
            />
          </div>

          <div className={styles.completedList}>
            <h2 className="headerText">Completed Events: </h2>
            <Table
              dataSource={completedEventDS}
              columns={completedEventColumn}
            />
          </div>
        </div>
      </div>

      <NewEventModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={addOnFinish}
      />
    </>
  );
}

export default EventTracker;
