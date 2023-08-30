import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Table, Button, message } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import NewFormModal from "../../shared/customModalForm";
import { CustomModal } from "../../shared/customModal";
import { formSet, currentEventColumn, completedEventColumn } from "./config";
import {
  fetchAllEvents,
  completeEvent,
  postEvent,
  fetchUser,
  updateEvent,
} from "../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function EventTracker() {
  const [eventsData, setEventsData] = useState([]);
  const [editEventId, setEditEventId] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const fetchEvents = () => {
    fetchAllEvents().then((eventData) => {
      setEventsData(eventData);
    });
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const showEditModal = (eventId) => {
    setIsEditModalOpen(true);
    setEditEventId(eventId);
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

  const addOnFinish = async (values) => {
    const orgData = await fetchUser("64e6f5d39f09f2395f0cf85d");
    const response = await postEvent(values, orgData);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Posted Event!");
        fetchEvents();
      }
    } catch (error) {
      message.error(
        "Unable to Post Event. This may occur due to connection problems. Please try again later."
      );
    }
    setIsAddModalOpen(false);
  };

  const editOnFinish = async (values) => {
    const response = await updateEvent(values, editEventId);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Edited Event!");
        fetchEvents();
      }
    } catch (error) {
      message.error(
        "Unable to Edit Event. This may occur due to connection problems. Please try again later."
      );
    }
    setIsEditModalOpen(false);
  };

  const handleComplete = async (eventId) => {
    const response = await completeEvent(eventId);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Completed Event! Congratulations!");
        fetchEvents();
      }
    } catch (error) {
      message.error(
        "Unable to Complete Event. This may occur due to connection problems. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const currentEventDS = eventsData
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
              <Button type="primary" onClick={() => showEditModal(event._id)}>
                Edit
              </Button>
              <Button
                type="primary"
                className="addBtn"
                onClick={() => handleComplete(event._id)}
              >
                Complete
              </Button>
            </div>
          ),
        };
      }
      return null;
    })
    .filter(Boolean);

  const completedEventDS = eventsData
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
            {eventsData.length === 0 ? (
              <div className="loadingDiv">
                Loading Current Events....
                <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
              </div>
            ) : (
              <Table
                className="customTable"
                dataSource={currentEventDS}
                columns={currentEventColumn}
              />
            )}
          </div>

          <div className={styles.completedList}>
            <h2 className="headerText">Completed Events: </h2>
            {eventsData.length === 0 ? (
              <div className="loadingDiv">
                Loading Completed Events....
                <LoadingOutlined style={{ fontSize: 40, marginLeft: 10 }} />
              </div>
            ) : (
              <div>
                <Table
                  dataSource={completedEventDS}
                  columns={completedEventColumn}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <NewFormModal
        modalTitle={"Post New Event"}
        isModalOpen={isAddModalOpen}
        handleCancel={handleAddCancel}
        onFinish={addOnFinish}
        formSet={formSet}
        submitText={"Confirm"}
      />

      <NewFormModal
        modalTitle={"Edit Event"}
        isModalOpen={isEditModalOpen}
        handleCancel={handleEditCancel}
        onFinish={editOnFinish}
        formSet={formSet}
        submitText={"Update"}
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
