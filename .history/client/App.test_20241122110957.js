import React from "react";
import { render, screen } from "@testing-library/react-native";
import App from "./App";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders welcome message", async () => {
  fetch.mockResponseOnce(JSON.stringify({ message: "Welcome to the app!" }));

  render(<App />);
  const message = await screen.findByText(/welcome/i);
  expect(message).toBeTruthy();
});
