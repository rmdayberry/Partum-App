import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../models/userModel.js";
import WhatToExpectWeekly from "../models/WhatToExpect.js";
import DailyPregnancyTip from "../models/DailyPregnancyTips.js";

process.env.JWT_SECRET = "test_secret";
process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret";

let authToken;
let userId;

beforeAll(async () => {
  // Cleanup: Delete any existing test user
  await User.deleteMany({ email: "pregtest@example.com" });

  // Register the test user
  await request(app).post("/users/register").send({
    name: "Pregnancy Test User",
    email: "pregtest@example.com",
    password: "password123",
    dueDate: "2025-06-01",
    languagePreference: "English",
  });

  // Log in the user
  const loginResponse = await request(app).post("/users/login").send({
    email: "pregtest@example.com",
    password: "password123",
  });

  authToken = loginResponse.body.authToken;
  userId = loginResponse.body.userId;

  console.log("🛠 Auth Token:", authToken);
  console.log("🛠 User ID:", userId);

  expect(authToken).toBeDefined();
  expect(userId).toBeDefined();

  // Ensure test data exists
  await WhatToExpectWeekly.deleteMany({});
  await DailyPregnancyTip.deleteMany({});

  await WhatToExpectWeekly.create([
    {
      week: 27,
      tip: "Your baby is the size of a cauliflower!",
      tipEs: "¡Tu bebé tiene el tamaño de una coliflor!",
    },
  ]);

  // 🔹 Dynamically calculate test user’s pregnancy day
  const dueDate = new Date("2025-06-01");
  const startDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const currentDate = new Date();
  const testPregnancyDay = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );

  console.log("🛠 Test Pregnancy Day:", testPregnancyDay);

  // **Ensure a matching daily tip exists for the calculated day**
  const testTip = await DailyPregnancyTip.create({
    day: testPregnancyDay, // <-- Dynamically setting the correct day
    tip: "Stay hydrated and rest!",
    tipSpanish: "¡Mantente hidratado y descansa!",
  });

  console.log("✅ Created Daily Tip:", testTip);
});

// **Pregnancy Progress Test**
describe("Pregnancy Progress API", () => {
  it("should fetch pregnancy progress", async () => {
    const response = await request(app)
      .get(`/api/pregnancy-progress/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.progress).toBeDefined();
  });

  it("should fetch the weekly pregnancy tip", async () => {
    const response = await request(app)
      .get(`/api/whatToExpectWeekly/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Weekly Tip Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.tip).toBeDefined();
  });

  it("should fetch the daily pregnancy tip", async () => {
    const response = await request(app)
      .get(`/api/daily-tip/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Daily Tip Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.tip).toBeDefined();
  });
});

// **Cleanup: Close DB Connection After Tests**
afterAll(async () => {
  await mongoose.connection.close();
});
