import axios from "axios";
import { backendApiUrl } from "./config";

export async function registerVolunteers(data, file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(backendApiUrl + "/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        data: data,
        type: "volunteer",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Volunteer Registration error:", error);
  }
}

export async function registerOrganizations(data, file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(backendApiUrl + "/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        data: data,
        type: "organization",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Organization Registration error:", error);
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

export async function fetchUser(token) {
  if (token) {
    try {
      const response = await axios.get(backendApiUrl + "/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
}

export async function updateUser(userId, data, file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.put(backendApiUrl + "/updateUser", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        userId: userId,
        data: data,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function fetchAllEvents(userId) {
  try {
    const response = await axios.post(
      backendApiUrl + "/events",
      { userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Events:", error);
  }
}

export async function fetchEvent(orgId) {
  try {
    const response = await axios.post(
      backendApiUrl + "/getEvent",
      { orgId: orgId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

export async function postEvent(data, orgData, file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(backendApiUrl + "/postEvent", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        data: data,
        orgData: orgData,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function updateEvent(data, eventId, file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.put(backendApiUrl + "/updateEvent", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        data: data,
        eventId: eventId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
