import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://partum-app.onrender.com";

// Function to refresh auth token
const refreshAuthToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available.");

    const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
      token: refreshToken,
    });

    const { authToken, refreshToken: newRefreshToken } = response.data;

    await AsyncStorage.setItem("authToken", authToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    return authToken;
  } catch (error) {
    console.error(
      "Error refreshing auth token:",
      error.response?.data || error.message
    );

    //  Remove invalid refresh token
    await AsyncStorage.removeItem("refreshToken");

    throw new Error("Failed to refresh auth token.");
  }
};

// Helper to make authorized requests with token refresh
const authorizedRequest = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    if (error.response?.status === 401) {
      const newToken = await refreshAuthToken();

      if (newToken) {
        // Retry the original request with a new token
        return await callback();
      }
    }

    throw error;
  }
};

// Fetch pregnancy progress
export const fetchPregnancyProgress = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/progress`
    );
    return response.data.progress; // Assuming API response has { progress: value }
  } catch (error) {
    console.error(
      "Error fetching pregnancy progress:",
      error.response || error.message
    );
    throw error;
  }
};

// Fetch weekly tip
export const fetchWeeklyTip = async (week, language = "English") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week/${week}?language=${language}`
    );
    return response.data; // Assuming API response has { week: currentWeek, tip: "Your tip for the week" }
  } catch (error) {
    console.error(
      "Error fetching weekly tip:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch daily tip
export const fetchDailyTip = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/daily-tip/${userId}`);
    return response.data; // Ensure it returns the response data
  } catch (error) {
    console.error("Error fetching daily tip:", error.response || error.message);
    throw error;
  }
};

// Fetch all appointments for the user
export const fetchAppointments = async () => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");

    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

// Fetch the user's next appointment
export const fetchNextAppointment = async () => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");
    const response = await axios.get(`${API_BASE_URL}/appointments/next`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

// Add a new appointment
export const addAppointment = async (appointmentData) => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");
    const response = await axios.post(
      `${API_BASE_URL}/appointments`,
      appointmentData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.appointment;
  });
};
//Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");

    const response = await axios.delete(
      `${API_BASE_URL}/appointments/${appointmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

// Submit feedback from user
export const submitFeedback = async (userId, message) => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");
    const response = await axios.post(
      `${API_BASE_URL}/feedback`,
      {
        userId,
        message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};
