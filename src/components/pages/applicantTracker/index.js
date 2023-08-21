import React from "react";
import "./styles.css";
import { Select, Table, Button } from "antd";
import { NavigationBar } from "../../shared/navigationBar";

function ApplicantTracker() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
    },
    {
      title: "Interests",
      dataIndex: "interests",
      key: "interests",
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

  const dataSource = [
    {
      key: "1",
      name: "JohnDoe",
      website: "link",
      skills: ["Web Development", "JS"],
      interests: ["JavaScript", "BasketBall"],
      email: "JohnDoe@testmail.com",
      contact: "98765432",
      actions: (
        <div className='actionsBtn'>
          <Button type="primary" className="addBtn" onClick={() => ""}>
            +
          </Button>
          <Button type="primary" danger onClick={() => ""}>
            -
          </Button>
        </div>
      ),
    },
  ];

  const formattedDataSource = dataSource.map((item) => ({
    ...item,
    skills: item.skills.join(", "),
    interests: item.interests.join(", "),
  }));

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
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
              className="eventSelector"
            />
          </div>
        </div>

        <div className="tableContainer">
          <h2 className="headerText">Applicant List:</h2>
          <Table
            className="customTable"
            dataSource={formattedDataSource}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}

export default ApplicantTracker;
