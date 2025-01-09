import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5002";

// Fetch pregnancy progress
export const fetchPregnancyProgress = async (userId) => {
  try {
    console.log("Fetching pregnancy progress for user:", userId);
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/progress`
    );
    console.log("Pregnancy Progress Response:", response.data);
    return response.data.progress; // Assuming API response has { progress: value }
  } catch (error) {
    console.error(
      "Error fetching pregnancy progress:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch pregnancy progress.");
  }
};

// Fetch weekly tip
export const fetchWeeklyTip = async (week) => {
  try {
    console.log("Fetching weekly tip for week:", week);
    const response = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week/${week}`
    );
    console.log("Weekly Tip Response:", response.data);
    return response.data; // Assuming API response has { week: currentWeek, tip: "Your tip for the week" }
  } catch (error) {
    console.error(
      "Error fetching weekly tip:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch weekly tip.");
  }
};

// Fetch daily tip
export const fetchDailyTip = async (userId) => {
  try {
    console.log("Fetching daily tip for user:", userId);
    const response = await axios.get(`${API_BASE_URL}/api/daily-tip/${userId}`);
    console.log("Daily Tip Response:", response.data);
    return response.data; // Ensure it returns the response data
  } catch (error) {
    console.error(
      "Error fetching daily tip:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch daily tip.");
  }
};

// Fetch all appointments for the user
export const fetchAppointments = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Auth Token:", token); // Debugging log
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/api/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Appointments Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointments:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch appointments.");
  }
};

// Fetch the user's next appointment
export const fetchNextAppointment = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/api/appointments/next`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Next Appointment Response:", response.data);
    return response.data; // Assuming response contains the next appointment
  } catch (error) {
    console.error(
      "Error fetching next appointment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch next appointment.");
  }
};

// Add a new appointment
export const addAppointment = async (appointmentData) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }
    const response = await axios.post(
      `${API_BASE_URL}/api/appointments`,
      appointmentData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Add Appointment Response:", response.data);
    return response.data; // Assuming response contains the created appointment
  } catch (error) {
    console.error(
      "Error adding appointment:",
      error.response?.data || error.message
    );
    throw new Error("Failed to add appointment.");
  }
};
