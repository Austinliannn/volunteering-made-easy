import axios from "axios";
import { backendApiUrl } from "./config";

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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error("Organization Registration error:", error);
  }
}

export async function fetchUser(userId) {
  try {
    const response = await axios.post(
      backendApiUrl + "/user",
      { userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function updateUser(userId, data) {
  try {
    const response = await axios.put(
      backendApiUrl + "/updateUser",
      { userId: userId, data: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function fetchAllEvents() {
  try {
    const response = await axios.get(backendApiUrl + "/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching Events:", error);
  }
}

export async function applyEvent(data, userId) {
  try {
    const response = await axios.post(
      backendApiUrl + "/applyEvent",
      { data: data, userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error applying to event:", error);
  }
}

export async function getAcceptedEvents(userId) {
  try {
    const response = await axios.post(
      backendApiUrl + "/getAcceptedEvents",
      { userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function updateCheckIn(data) {
  try {
    const response = await axios.put(
      backendApiUrl + "/checkIn",
      { data: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function updateCheckOut(data) {
  try {
    const response = await axios.put(
      backendApiUrl + "/checkOut",
      { data: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function deleteVolunteer(eventId, data) {
  try {
    const response = await axios.delete(backendApiUrl + "/deleteVolunteer", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        eventId: eventId,
        data: data,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function deleteApplicant(eventId, data) {
  try {
    const response = await axios.delete(backendApiUrl + "/deleteApplicant", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        eventId: eventId,
        data: data,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function addApplicant(eventId, data) {
  try {
    const response = await axios.post(
      backendApiUrl + "/addApplicant",
      { eventId: eventId, data: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function completeEvent(eventId) {
  try {
    const response = await axios.put(
      backendApiUrl + "/completeEvent",
      { eventId: eventId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function postEvent(data, orgData) {
  try {
    const response = await axios.post(
      backendApiUrl + "/postEvent",
      { data: data, orgData: orgData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function updateEvent(data, eventId) {
  try {
    const response = await axios.put(
      backendApiUrl + "/updateEvent",
      { data: data, eventId: eventId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(backendApiUrl + "/login", {
      email: data.email,
      password: data.password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
