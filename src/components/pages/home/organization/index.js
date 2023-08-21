import React from "react";
import styles from "../styles.module.css";
import { Select, Table, Button } from "antd";
import { NavigationBar } from "../../../shared/navigationBar";

function OrganizationHome() {
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
      title: "Event",
      dataIndex: "event",
      key: "event",
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
      title: "Link",
      dataIndex: "link",
      key: "link",
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
      name: "Josh",
      event: "Help the Dogs",
      email: "Josh@testmail.com",
      contact: "98765432",
      link: "link",
      actions: (
        <Button type="primary" danger onClick={() => ""}>
          Remove
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
        </div>

        <div className={styles.tableContainer}>
          <h2 className="headerText">Volunteer List:</h2>
          <Table className="customTable" dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default OrganizationHome;
