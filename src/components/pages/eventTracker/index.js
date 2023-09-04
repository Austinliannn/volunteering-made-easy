import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { Table, Button, message } from "antd";
import { NavigationBar } from "../../shared/navigationBar";
import NewFormModal from "../../shared/customModalForm";
import { CustomModal } from "../../shared/customModal";
import { formSet, currentEventColumn, completedEventColumn } from "./config";
import {
  fetchEvent,
  completeEvent,
  postEvent,
  fetchUser,
  updateEvent,
} from "../../../services/api";
import { LoadingOutlined } from "@ant-design/icons";

function EventTracker() {
  const [orgData, setOrgData] = useState();
  const [eventsData, setEventsData] = useState([]);
  const [editEventId, setEditEventId] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const token = localStorage.getItem("token");

  function DisplayImage({ contentType, data }) {
    const blob = new Blob([new Uint8Array(data.data)], { type: contentType });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  const fetchOrgData = useCallback( async () => {
    const response = await fetchUser(token);
    const imageUrl = DisplayImage({
      contentType: response.user.image.contentType,
      data: response.user.image.data,
    });
    setOrgData({...response, user: { ...response.user, image: imageUrl}});
  },[token]);

  const fetchEventData = (orgId) => {
    fetchEvent(orgId).then((eventData) => {
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
    const imageUrl = DisplayImage({
      contentType: data.image.contentType,
      data: data.image.data,
    });
    setSelectedModalData({...data, image: imageUrl});
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => {
    setIsViewModalOpen(false);
  };

  const addOnFinish = async (values, file) => {
    const response = await postEvent(values, orgData, file);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Posted Event!");
        fetchEventData(orgData.user._id);
      }
    } catch (error) {
      message.error(
        "Unable to Post Event. This may occur due to connection problems. Please try again later."
      );
    }
    setIsAddModalOpen(false);
  };

  const editOnFinish = async (values, file) => {
    const response = await updateEvent(values, editEventId, file);
    try {
      if (response.message === "Successful") {
        message.success("Successfully Edited Event!");
        fetchEventData(orgData.user._id);
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
        fetchEventData(orgData.user._id);
      }
    } catch (error) {
      message.error(
        "Unable to Complete Event. This may occur due to connection problems. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (orgData === undefined) {
      fetchOrgData();
    } else {
      fetchEventData(orgData.user._id);
    }
  }, [orgData, fetchOrgData]);

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
                <h2 className="headerText">
                  Current Events:
                  {orgData === undefined ? (
                    <LoadingOutlined style={{ fontSize: 25, marginLeft: 10 }} />
                  ) : (
                    <></>
                  )}
                </h2>
              </div>
              <div>
                <Button type="primary" onClick={() => showAddModal()}>
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
            <h2 className="headerText">
              Completed Events:
              {orgData === undefined ? (
                <LoadingOutlined style={{ fontSize: 25, marginLeft: 10 }} />
              ) : (
                <></>
              )}
            </h2>
            <Table
              className="customTable"
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
