import React, { useState } from "react";
import styles from "./styles.module.css";
import { Table, Button } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import NewFormModal from "../../shared/customModalForm";
import { CustomModal } from "../../shared/customModal";
import { mockEvents } from "../mockData";
import { formSet, currentEventColumn, completedEventColumn } from "./config";

function EventTracker() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const showViewModal = (data) => {
    setSelectedModalData(data);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => {
    setIsViewModalOpen(false);
  };

  const addOnFinish = (values) => {
    console.log("Added new Event: ", values);
  };

  const editOnFinish = (values) => {
    console.log("Edit Event: ", values);
  };

  const currentEventDS = mockEvents
    .flatMap((event, index) => {
      if (!event.completed) {
        return {
          key: index,
          name: event.eventName,
          volunteers: event.acceptedVolunteers.length,
          startDate: event.startDate,
          endDate: event.endDate,
          inCharge: event.inCharge,
          contact: event.contact,
          location: event.location.join(", "),
          actions: (
            <div className="actionsBtn">
              <Button type="primary" onClick={() => showEditModal()}>
                Edit
              </Button>
              <Button type="primary" className="addBtn" onClick={() => ""}>
                Complete
              </Button>
            </div>
          ),
        };
      }
      return null;
    })
    .filter(Boolean);

  const completedEventDS = mockEvents
    .flatMap((event, index) => {
      if (event.completed) {
        return {
          key: index,
          name: event.eventName,
          actions: (
            <Button type="primary" onClick={() => showViewModal(event)}>
              View
            </Button>
          ),
        };
      }
      return null;
    })
    .filter(Boolean);

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
                <Button type="primary" onClick={() => showAddModal()}>
                  Post New Event
                </Button>
              </div>
            </div>
            <div>
              <Table
                className="customTable"
                dataSource={currentEventDS}
                columns={currentEventColumn}
              />
            </div>
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

      <NewFormModal
        modalTitle={"Post New Event"}
        isModalOpen={isAddModalOpen}
        handleCancel={handleAddCancel}
        onFinish={addOnFinish}
        formSet={formSet}
        submitText= {"Confirm"}
      />

      <NewFormModal
        modalTitle={"Edit Event"}
        isModalOpen={isEditModalOpen}
        handleCancel={handleEditCancel}
        onFinish={editOnFinish}
        formSet={formSet}
        submitText= {"Update"}
      />

      <CustomModal
        data={selectedModalData}
        isModalOpen={isViewModalOpen}
        handleCancel={handleViewCancel}
        displayOk={false}
      />
    </>
  );
}

export default EventTracker;
