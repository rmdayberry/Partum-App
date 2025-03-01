import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://partum-app.onrender.com";

// Function to refresh auth token
const refreshAuthToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn(
        "⚠️ No refresh token available. Using existing auth token if valid."
      );
      return null; // Don't force logout, just return null
    }

    const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
      token: refreshToken,
    });

    const { authToken, refreshToken: newRefreshToken } = response.data;

    if (authToken) {
      await AsyncStorage.setItem("authToken", authToken);
    }
    if (newRefreshToken) {
      await AsyncStorage.setItem("refreshToken", newRefreshToken);
    }

    return authToken;
  } catch (error) {
    console.error(
      " Error refreshing auth token:",
      error.response?.data || error.message
    );

    // Only remove refreshToken, keep authToken in case it's still valid
    await AsyncStorage.removeItem("refreshToken");

    return null;
  }
};

// Helper to make authorized requests with token refresh
const authorizedRequest = async (callback) => {
  try {
    let token = await AsyncStorage.getItem("authToken");

    if (!token) {
      console.warn("⚠️ No auth token found. Checking for refresh token...");
      token = await refreshAuthToken();

      if (!token) {
        console.error(" No valid auth or refresh token found.");
        throw new Error("Session expired. Please log in again.");
      }
    }

    return await callback(token);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("⚠️ Token expired. Attempting refresh...");
      const newToken = await refreshAuthToken();

      if (newToken) {
        return await callback(newToken); // Retry request with new token
      } else {
        console.error(
          " No refresh token available. Keeping user authenticated."
        );
        return null; // Don't log out, just return null
      }
    }

    throw error;
  }
};

// Fetch pregnancy progress
export const fetchPregnancyProgress = async (userId) => {
  return await authorizedRequest(async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/progress`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.progress;
  });
};

// Fetch weekly tip
export const fetchWeeklyTip = async (week, language = "English") => {
  return await authorizedRequest(async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week/${week}?language=${language}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  });
};

// Fetch daily tip
export const fetchDailyTip = async (userId) => {
  return await authorizedRequest(async (token) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/daily-tip/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

// Fetch all appointments
export const fetchAppointments = async () => {
  return await authorizedRequest(async (token) => {
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

// Fetch the user's next appointment
export const fetchNextAppointment = async () => {
  return await authorizedRequest(async (token) => {
    const response = await axios.get(`${API_BASE_URL}/appointments/next`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

// Add a new appointment
export const addAppointment = async (appointmentData) => {
  return await authorizedRequest(async (token) => {
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

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  return await authorizedRequest(async (token) => {
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
  return await authorizedRequest(async (token) => {
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
