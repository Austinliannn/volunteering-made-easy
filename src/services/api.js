import axios from "axios";
import { backendApiUrl } from "./config";

export async function fetchUsers() {
  try {
    const response = await axios.get(backendApiUrl + "/users");
    const users = response.data;
    console.log("Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function registerVolunteers(data) {
  try {
    const response = await axios.post(
      backendApiUrl + "/register",
      { data: data, type: "volunteer" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Volunteer registered:", response.data);
  } catch (error) {
    console.error("Volunteer Registration error:", error);
  }
}

export async function registerOrganizations(data) {
    try {
      const response = await axios.post(
        backendApiUrl + "/register",
        { data: data, type: "organization" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Organization registered:", response.data);
    } catch (error) {
      console.error("Organization Registration error:", error);
    }
  }

export async function fetchAllEvents() {
  try {
    const response = await axios.get(backendApiUrl + "/events");
    const events = response.data;
    console.log("Events:", events);
    return events;
  } catch (error) {
    console.error("Error fetching Events:", error);
  }
}
