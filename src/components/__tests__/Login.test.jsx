import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";

// Mock child components
jest.mock("../Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));
jest.mock("../LoginForm", () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">LoginForm</div>,
}));

// Mock constants
jest.mock("../../utils/constants", () => ({
  BACKGROUND_IMAGE: "mock-bg.jpg"
}));

describe("Login", () => {
  it("renders Header, LoginForm, and background image", () => {
    render(<Login />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    const img = screen.getByAltText("bg-image");
    expect(img).toHaveAttribute("src", "mock-bg.jpg");
  });
});
