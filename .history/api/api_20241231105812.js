import axios from "axios";

const API_BASE_URL = "http://localhost:5002"; // Replace with your server's URL if different

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
      error.response || error.message
    );
    throw error;
  }
};

// Fetch weekly tip
export const fetchWeeklyTip = async (week) => {
  try {
    console.log("Fetching weekly tip for week:", week);
    const response = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week/${week}` // Add a slash before `${week}`
    );
    console.log("Weekly Tip Response:", response.data);
    return response.data; // Assuming API response has { week: currentWeek, tip: "Your tip for the week" }
  } catch (error) {
    console.error(
      "Error fetching weekly tip:",
      error.response || error.message
    );
    throw error;
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
    console.error("Error fetching daily tip:", error.response || error.message);
    throw error;
  }
};

// Fetch symptom list
export const fetchSymptomList = async () => {
  try {
    console.log("Fetching symptom list...");
    const response = await axios.get(`${API_BASE_URL}/api/symptoms`);
    console.log("Symptom List Response:", response.data);
    return response.data; // Assuming API response is an array of symptoms
  } catch (error) {
    console.error(
      "Error fetching symptom list:",
      error.response || error.message
    );
    throw error;
  }
};

// Fetch symptom details
export const fetchSymptomDetails = async (id) => {
  try {
    console.log(`Fetching details for symptom with ID: ${id}`);
    const response = await axios.get(`${API_BASE_URL}/api/symptoms/${id}`);
    console.log("Symptom Details Response:", response.data);
    return response.data; // Assuming API response has detailed symptom info
  } catch (error) {
    console.error(
      "Error fetching symptom details:",
      error.response || error.message
    );
    throw error;
  }
};
