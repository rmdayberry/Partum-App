import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5002";

// Function to refresh auth token
const refreshAuthToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
      token: refreshToken,
    });

    const { authToken, refreshToken: newRefreshToken } = response.data;

    // Save new tokens to AsyncStorage
    if (authToken) {
      await AsyncStorage.setItem("authToken", authToken);
    }
    if (newRefreshToken) {
      await AsyncStorage.setItem("refreshToken", newRefreshToken);
    }

    return authToken; // Return the new access token
  } catch (error) {
    console.error(
      "Error refreshing auth token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to refresh auth token.");
  }
};

// Helper to make authorized requests with token refresh
const authorizedRequest = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Access token expired. Attempting to refresh...");
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
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Fetching pregnancy progress for user:", userId);
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/progress`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Pregnancy Progress Response:", response.data);
    return response.data.progress;
  });
};

// Fetch weekly tip
export const fetchWeeklyTip = async (week) => {
  return await authorizedRequest(async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week/${week}`
    );
    console.log("Weekly Tip Response:", response.data);
    return response.data;
  });
};

// Fetch daily tip
export const fetchDailyTip = async (userId) => {
  return await authorizedRequest(async () => {
    const response = await axios.get(`${API_BASE_URL}/api/daily-tip/${userId}`);
    console.log("Daily Tip Response:", response.data);
    return response.data;
  });
};

// Fetch all appointments for the user
export const fetchAppointments = async () => {
  return await authorizedRequest(async () => {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Auth Token in Fetch Appointments:", token);
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Appointments Response:", response.data);
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
    console.log("Next Appointment Response:", response.data);
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
    console.log("Add Appointment Response:", response.data);
    return response.data.appointment;
  });
};

//Submit feedback from user
export const submitFeedback = async (userId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback`, {
      userId,
      message,
    });
    console.log("Feedback submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to submit feedback."
    );
  }
};
