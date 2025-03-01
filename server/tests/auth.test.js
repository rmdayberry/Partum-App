import request from "supertest";
import app from "../server";
import mongoose from "mongoose";

describe("Authentication API", () => {
  it("should return 401 for invalid login", async () => {
    const response = await request(app).post("/users/login").send({
      email: "fake@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
  });
});

//Ensure MongoDB connection is closed after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
