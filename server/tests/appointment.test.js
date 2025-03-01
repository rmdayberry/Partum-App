import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../models/userModel.js";
import Appointment from "../models/appointmentsModel.js";

process.env.JWT_SECRET = "test_secret";
process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret";

let authToken;
let userId;
let appointmentId;

beforeAll(async () => {
  await User.deleteMany({ email: "apptest@example.com" });
  await Appointment.deleteMany({});

  // Register test user
  await request(app).post("/users/register").send({
    name: "Appointment Test User",
    email: "apptest@example.com",
    password: "password123",
    dueDate: "2025-06-01",
    languagePreference: "English",
  });

  // Log in user
  const loginResponse = await request(app).post("/users/login").send({
    email: "apptest@example.com",
    password: "password123",
  });

  authToken = loginResponse.body.authToken;
  userId = loginResponse.body.userId;

  console.log("🛠 Auth Token:", authToken);
  console.log("🛠 User ID:", userId);

  expect(authToken).toBeDefined();
  expect(userId).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("🗓️ Appointment API", () => {
  it("should create a new appointment", async () => {
    const response = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "First Prenatal Checkup",
        date: "2025-03-15",
        time: "10:00 AM",
        location: "Health Clinic",
        notes: "Bring medical records",
      });

    console.log("Appointment Creation Response:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.appointment).toBeDefined();
    expect(response.body.appointment.title).toBe("First Prenatal Checkup");

    appointmentId = response.body.appointment._id; // Store ID for later tests
  });

  it("should fetch all appointments for the user", async () => {
    const response = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Fetched Appointments:", response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fetch the next upcoming appointment", async () => {
    const response = await request(app)
      .get("/appointments/next")
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Next Appointment:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("First Prenatal Checkup");
  });

  it("should update an existing appointment", async () => {
    const updatedResponse = await request(app)
      .put(`/appointments/${appointmentId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Updated Prenatal Checkup",
        date: "2025-03-20",
        time: "11:00 AM",
        location: "Updated Clinic",
        notes: "Bring updated records",
      });

    console.log("Updated Appointment:", updatedResponse.body);

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.appointment.title).toBe(
      "Updated Prenatal Checkup"
    );
    expect(updatedResponse.body.appointment.date).toBe(
      "2025-03-20T00:00:00.000Z"
    );
  });

  it("should delete an appointment", async () => {
    const deleteResponse = await request(app)
      .delete(`/appointments/${appointmentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Delete Response:", deleteResponse.body);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe(
      "Appointment deleted successfully"
    );

    // Confirm it's deleted
    const fetchResponse = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${authToken}`);

    console.log("Appointments After Deletion:", fetchResponse.body);

    expect(
      fetchResponse.body.find((appt) => appt._id === appointmentId)
    ).toBeUndefined();
  });
});
