import React from "react";
import styles from "./styles.module.css";
import { Button, Tabs } from "antd";
import { tabItems } from "./config";
import leavesImage from "../../../assets/leaves.jpg";
import loginImage from "../../../assets/login-img.jpg";
import {
  registerVolunteers,
  registerOrganizations,
} from "../../../services/api";

function Login() {
  const [volunteerToggle, setVolunteerToggle] = React.useState(true);

  const loginOnFinish = (values) => {
    if (volunteerToggle) {
      console.log("Volunteer received values of form: ", values);
    } else {
      console.log("Organization received values of form: ", values);
    }
  };

  const signUpOnFinish = (values) => {
    if (volunteerToggle) {
      registerVolunteers(values);
    } else {
      registerOrganizations(values);
    }
  };

  const onClickHandle = () => {
    volunteerToggle ? setVolunteerToggle(false) : setVolunteerToggle(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Button
            className={styles.toggleBtn}
            size={"large"}
            onClick={onClickHandle}
          >
            {volunteerToggle ? "Volunteer" : "Organization"}
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            Volunteering. Made. Easy.
            <img
              src={leavesImage}
              className={styles.leavesImage}
              alt="leave-img"
            />
            <div className={styles.subtitle}>
              “The best way to find yourself is to lose yourself in the service
              of others.” – Gandhi
            </div>
          </div>

          <div className={styles.formBox}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              items={tabItems(volunteerToggle, loginOnFinish, signUpOnFinish)}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.backgroundImage}>
          <img src={loginImage} className={styles.loginImage} alt="leave-img" />
        </div>
      </div>
    </>
  );
}

export default Login;
