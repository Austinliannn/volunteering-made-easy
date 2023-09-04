import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Tabs, message } from "antd";
import { tabItems } from "./config";
import leavesImage from "../../../assets/leaves.jpg";
import loginImage from "../../../assets/login-img.jpg";
import {
  registerVolunteers,
  registerOrganizations,
  loginUser,
} from "../../../services/api";

function Login() {
  const [volunteerToggle, setVolunteerToggle] = React.useState(true);
  const navigate = useNavigate();

  const loginOnFinish = async (values) => {
    if (volunteerToggle) {
      const response = await loginUser(values);
      try {
        if (response.message === "Successful") {
          message.success("Welcome!");
          navigate("/volunteer");
        }
      } catch (error) {
        message.error("Incorrect Password or Email. Please try again.");
        console.error("Error updating user:", error);
      }
    } else {
      const response = await loginUser(values);
      try {
        if (response.message === "Successful") {
          message.success("Welcome!");
          navigate("/organization");
        }
      } catch (error) {
        message.error("Incorrect Password or Email. Please try again.");
        console.error("Error updating user:", error);
      }
    }
  };

  const signUpOnFinish = async (values, file) => {
    if (values.password === values.confirm) {
      if (volunteerToggle) {
        const response = await registerVolunteers(values, file);
        try {
          if (response.message === "Successful") {
            message.success("Successfully Created Account!");
          } else {
            message.error("User Already Exist!");
          }
        } catch (error) {
          message.error(
            "Unable to Create Account. This may occur due to connection problems. Please try again later."
          );
          console.error("Error updating user:", error);
        }
      } else {
        const response = await registerOrganizations(values, file);
        try {
          if (response.message === "Successful") {
            message.success("Successfully Created Account!");
          } else {
            message.error("User Already Exist!");
          }
        } catch (error) {
          message.error(
            "Unable to Create Account. This may occur due to connection problems. Please try again later."
          );
          console.error("Error updating user:", error);
        }
      }
    } else {
      message.error("Unable to Create Account. Password and Confirm Password do not match. Please check again.");
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
