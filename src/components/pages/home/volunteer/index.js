import React from "react";
import styles from "../styles.module.css";
import { NavigationBar } from "../../../shared/navigationBar";
import { DropDownSelect } from "../../../shared/dropDownSelect";
import { CustomCard } from "../../../shared/customCard";
import { CustomModal } from "../../../shared/customModal";
import poster from "../../../../assets/job.jpg";

function VolunteerHome() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedModalData, setSelectedModalData] = React.useState(null);

  const showModal = (data) => {
    setSelectedModalData(data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalData = [
    {
      title: "Help the Dogs",
      summary:
        "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative.",
      description:
        "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website to spread awareness and seek for volunteers who are interested to help. The website should consist of a few pages such as landing page, area tracking page, etc, etc. Reach out to us if you have the skills or wish to learn a new skill such as creating websites.",
      badgesData: [
        { text: "Web Development", color: "#17A2B8" },
        { text: "HTML", color: "#17A2B8" },
        { text: "CSS", color: "#17A2B8" },
        { text: "JavaScript", color: "#17A2B8" },
        { text: "Bedok", color: "#28A745" },
        { text: "Animal", color: "#28A745" },
      ],
      image: poster,
    },
  ];

  const options = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "tom",
      label: "Tom",
    },
  ];

  const DDSHandleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const filters = [
    {
      title: "Skills",
      placeholder: "Select Skill",
      options: options,
      onChange: DDSHandleChange(),
      mode: "multiple",
    },
    {
      title: "Interest",
      placeholder: "Select Interest",
      options: options,
      onChange: DDSHandleChange(),
      mode: "multiple",
    },
    {
      title: "Location",
      placeholder: "Select Location",
      options: options,
      onChange: DDSHandleChange(),
      mode: "",
    },
    {
      title: "Cause",
      placeholder: "Select Cause",
      options: options,
      onChange: DDSHandleChange(),
      mode: "",
    },
    {
      title: "Availability",
      placeholder: "Select Availability",
      options: options,
      onChange: DDSHandleChange(),
      mode: "",
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
        <div className={styles.filter}>
          {filters.map((data, index) => (
            <DropDownSelect
              key={index}
              title={data.title}
              placeholder={data.placeholder}
              options={data.options}
              onChange={data.onChange}
              mode={data.mode}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.title}>List of Opportunities</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselContainer}>
          {modalData.map((data, index) => (
            <div key={index} className={styles.cardDiv}>
              <CustomCard
                title={data.title}
                summary={data.summary}
                badges={data.badgesData}
                onClick={() => showModal(data)}
              />
            </div>
          ))}
          <CustomModal
            data={selectedModalData}
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
}

export default VolunteerHome;
