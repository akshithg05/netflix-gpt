import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";

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
      error_page: "Page not found.",
      netflix_home: "Netflix Home",
    },
  },
}));

// Mock useRouteError
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useRouteError: () => ({ statusText: "Not Found", message: "404 Error" }),
  };
});

describe("ErrorPage", () => {
  it("renders error page with correct text", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Lost your way?")).toBeInTheDocument();
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
    expect(screen.getByText("Netflix Home")).toBeInTheDocument();
  });

  it("shows error statusText or message", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Not Found|404 Error/)).toBeInTheDocument();
  });
});
