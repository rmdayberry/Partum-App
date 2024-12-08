import axios from "axios";

const API_BASE_URL = "http://localhost:5002";

//Fetch pregnancy progress
export const fetchPregancyProgress = async (userId) => {
  try {
    console.log("Fetching pregnancy progress for user:", userId);
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/progress`);
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

//Fetch weekly tip
export const fetchWeeklyTip = async (week) => {
  try{
    console.log("Fetching weekly tip for week:", week);
    const repsonse = await axios.get(
      `${API_BASE_URL}/api/whatToExpectWeekly/week${week}`
    );
    console.log("Weekly Tip Response:" , response.data);
    return response.data; /
  }
}
