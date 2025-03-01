import request from "supertest";
import mongoose from "mongoose";
import app from "../server";
import User from "../models/userModel";

process.env.JWT_SECRET = "test_secret";
process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret";

// Sample test user
const testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "password123",
  dueDate: "2025-06-01",
  languagePreference: "English",
};

describe("User Authentication API", () => {
  beforeAll(async () => {
    // Cleanup: Remove existing test users to prevent duplicate key errors
    await User.deleteMany({ email: testUser.email });
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/users/register").send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully.");
  });

  it("should not allow duplicate user registration", async () => {
    const response = await request(app).post("/users/register").send(testUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already in use.");
  });

  it("should log in a registered user", async () => {
    const response = await request(app).post("/users/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.authToken).toBeDefined(); // Should return a valid token
  });

  it("should return 401 for invalid login credentials", async () => {
    const response = await request(app).post("/users/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials.");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
