import React from "react";
import { render, screen } from "@testing-library/react-native";
import App from "./App";

test("renders welcome message", () => {
  render(<App />);
  expect(screen.getByText(/welcome/i)).toBeTruthy();
});
