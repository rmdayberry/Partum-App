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

//Fetch Symptom(Symptom Tracker)

app.get("/api/symptoms", async (req, res) => {
  try {
    const symptoms = await SymptomChecker.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).send("Error fetching symptoms");
  }
});

// API Endpoint to Fetch a Single Symptom by Name
app.get("/api/symptoms/:name", async (req, res) => {
  try {
    const symptom = await SymptomChecker.findOne({
      symptom: req.params.name,
    });
    if (!symptom) return res.status(404).send("Symptom not found");
    res.json(symptom);
  } catch (err) {
    res.status(500).send("Error fetching symptom");
  }
});
