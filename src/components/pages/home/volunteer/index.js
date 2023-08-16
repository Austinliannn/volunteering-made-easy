import React from "react";
import styles from "../styles.module.css";
import { NavigationBar } from "../../../shared/navigationBar";
import { DropDownSelect } from "../../../shared/dropDownSelect";
import { CustomCard } from "../../../shared/card";

function VolunteerHome() {
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

  return (
    <>
      <NavigationBar />

      <div className={styles.container}>
        <div className={styles.filter}>
          <DropDownSelect
            title="Skills"
            placeholder="Select Skill"
            options={options}
            onChange={DDSHandleChange}
            mode="multiple"
          />

          <DropDownSelect
            title="Interest"
            placeholder="Select Interest"
            options={options}
            onChange={DDSHandleChange}
            mode="multiple"
          />

          <DropDownSelect
            title="Location"
            placeholder="Select Location"
            options={options}
            onChange={DDSHandleChange}
            mode=""
          />

          <DropDownSelect
            title="Cause"
            placeholder="Select Cause"
            options={options}
            onChange={DDSHandleChange}
            mode=""
          />

          <DropDownSelect
            title="Availability"
            placeholder="Select Availability"
            options={options}
            onChange={DDSHandleChange}
            mode=""
          />
        </div>
      </div>

    <div className={styles.container}>
      <h2 className={styles.title}>List of Opportunities</h2>
      </div>

      <div className={styles.container}>
      <div className={styles.carouselContainer}>
        <div className={styles.cardDiv}>
          <CustomCard
            title="Help The Dogs"
            text="“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative."
            badges={[
              { text: "Web Development", color: "#17A2B8" },
              { text: "HTML", color: "#17A2B8" },
              { text: "CSS", color: "#17A2B8" },
              { text: "JavaScript", color: "#17A2B8" },
              { text: "Bedok", color: "#28A745" },
              { text: "Animal", color: "#28A745" },
            ]}
          />
        </div>
        
        <div className={styles.cardDiv}>
          <CustomCard
            title="Help The Dogs"
            text="“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative."
            badges={[
              { text: "Web Development", color: "#17A2B8" },
              { text: "HTML", color: "#17A2B8" },
              { text: "CSS", color: "#17A2B8" },
              { text: "JavaScript", color: "#17A2B8" },
              { text: "Bedok", color: "#28A745" },
              { text: "Animal", color: "#28A745" },
            ]}
          />
        </div>

        <div className={styles.cardDiv}>
          <CustomCard
            title="Help The Dogs"
            text="“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative."
            badges={[
              { text: "Web Development", color: "#17A2B8" },
              { text: "HTML", color: "#17A2B8" },
              { text: "CSS", color: "#17A2B8" },
              { text: "JavaScript", color: "#17A2B8" },
              { text: "Bedok", color: "#28A745" },
              { text: "Animal", color: "#28A745" },
            ]}
          />
        </div>

        <div className={styles.cardDiv}>
          <CustomCard
            title="Help The Dogs"
            text="“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative."
            badges={[
              { text: "Web Development", color: "#17A2B8" },
              { text: "HTML", color: "#17A2B8" },
              { text: "CSS", color: "#17A2B8" },
              { text: "JavaScript", color: "#17A2B8" },
              { text: "Bedok", color: "#28A745" },
              { text: "Animal", color: "#28A745" },
            ]}
          />
        </div>

        <div className={styles.cardDiv}>
          <CustomCard
            title="Help The Dogs"
            text="“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative."
            badges={[
              { text: "Web Development", color: "#17A2B8" },
              { text: "HTML", color: "#17A2B8" },
              { text: "CSS", color: "#17A2B8" },
              { text: "JavaScript", color: "#17A2B8" },
              { text: "Bedok", color: "#28A745" },
              { text: "Animal", color: "#28A745" },
            ]}
          />
        </div>
        
      </div>
      </div>
    </>
  );
}

export default VolunteerHome;
