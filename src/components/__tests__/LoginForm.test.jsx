import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import LoginForm from "../LoginForm";

// Mock Redux store
const mockStore = {
  getState: () => ({ language: { currentLanguage: "en" } }),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

// Mock language constants
jest.mock("../../utils/languageConstants", () => ({
  __esModule: true,
  default: {
    en: {
      sign_in: "Sign In",
      sign_up: "Sign Up",
      signing_in: "Signing In...",
      signing_up: "Signing Up...",
      full_name: "Full Name",
      email: "Email",
      password: "Password",
      new_to_netflix: "New to Netflix?",
      sign_up_now: "Sign up now.",
      already_registered: "Already registered?",
      sign_in_now: "Sign in now.",
      user_already_exists: "User already exists.",
      unknown_error: "Unknown error.",
      incorrect_username_password: "Incorrect username or password.",
      name_cannot_be_empty: "Name cannot be empty.",
    },
  },
}));

// Mock validate
jest.mock("../../utils/validate", () => ({
  validateEmailAndPassword: jest.fn(() => ({})),
  validateName: jest.fn(() => true),
}));

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: "1", email: "test@test.com" } })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: "1", email: "test@test.com" } })),
  updateProfile: jest.fn(() => Promise.resolve()),
}));

// Mock constants
jest.mock("../../utils/constants", () => ({
  USER_DP: "mock-dp.jpg",
  FIREBASE_AUTH_ERROR_CODES: {
    EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
    INVALID_CREDENTIAL: "auth/invalid-credential",
  },
}));

// Mock firebase
jest.mock("../../utils/firebase", () => ({
  auth: {},
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  function renderForm() {
    return render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    );
  }

  it("renders sign in form by default", () => {
    renderForm();
    // Heading
    expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
    // Button
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("New to Netflix?")).toBeInTheDocument();
    expect(screen.getByText("Sign up now.")).toBeInTheDocument();
  });

  it("switches to sign up form when button clicked", () => {
    renderForm();
    fireEvent.click(screen.getByText("Sign up now."));
    // Heading
    expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
    // Button
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Already registered?")).toBeInTheDocument();
    expect(screen.getByText("Sign in now.")).toBeInTheDocument();
  });

  it("shows validation errors if present", () => {
    const { validateEmailAndPassword } = require("../../utils/validate");
    validateEmailAndPassword.mockReturnValueOnce({ email: "Email error", password: "Password error" });
    renderForm();
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "bad" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "bad" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Email error")).toBeInTheDocument();
    expect(screen.getByText("Password error")).toBeInTheDocument();
  });

  it("shows name validation error on sign up", () => {
    const { validateName } = require("../../utils/validate");
    validateName.mockReturnValueOnce(false);
    renderForm();
    fireEvent.click(screen.getByText("Sign up now."));
    fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(screen.getByText("Name cannot be empty.")).toBeInTheDocument();
  });

  it("shows error message if user already exists on sign up", async () => {
    const { createUserWithEmailAndPassword } = require("firebase/auth");
    createUserWithEmailAndPassword.mockImplementationOnce(() => Promise.reject({ code: "auth/email-already-in-use" }));
    renderForm();
    fireEvent.click(screen.getByText("Sign up now."));
    fireEvent.change(screen.getByPlaceholderText("Full Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    await waitFor(() => {
      expect(screen.getByText("User already exists.")).toBeInTheDocument();
    });
  });

  it("shows error message if credentials are invalid on sign in", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockImplementationOnce(() => Promise.reject({ code: "auth/invalid-credential" }));
    renderForm();
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "badpass" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    await waitFor(() => {
      expect(screen.getByText("Incorrect username or password.")).toBeInTheDocument();
    });
  });
});
