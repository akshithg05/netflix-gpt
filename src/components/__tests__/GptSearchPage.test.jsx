import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import GptSearchPage from "../GptSearchPage";

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
      searching: "Searching...",
    },
  },
}));

// Mock constants
jest.mock("../../utils/constants", () => ({
  BACKGROUND_IMAGE: "mock-bg.jpg"
}));

// Mock child components
jest.mock("../GptSearchBar", () => ({
  __esModule: true,
  default: (props) => <div data-testid="gpt-search-bar">GptSearchBar</div>,
}));
jest.mock("../GptSearchMovieSuggestions", () => ({
  __esModule: true,
  default: () => <div data-testid="gpt-movie-suggestions">Suggestions</div>,
}));

describe("GptSearchPage", () => {
  function renderPage() {
    return render(
      <Provider store={mockStore}>
        <GptSearchPage />
      </Provider>
    );
  }

  it("renders background image and search bar", () => {
    renderPage();
    expect(screen.getByAltText("bg-image")).toHaveAttribute("src", "mock-bg.jpg");
    expect(screen.getByTestId("gpt-search-bar")).toBeInTheDocument();
  });

  it("shows searching text when isLoading is true", () => {
    // Patch useState to force isLoading = true
    jest.spyOn(React, "useState").mockImplementationOnce(() => [true, jest.fn()]).mockImplementationOnce(() => [false, jest.fn()]);
    renderPage();
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows movie suggestions when not loading and not clear", () => {
    // Patch useState to force isLoading = false, clear = false
    jest.spyOn(React, "useState").mockImplementationOnce(() => [false, jest.fn()]).mockImplementationOnce(() => [false, jest.fn()]);
    renderPage();
    expect(screen.getByTestId("gpt-movie-suggestions")).toBeInTheDocument();
  });

  it("renders nothing when clear is true", () => {
    // Patch useState to force isLoading = false, clear = true
    jest.spyOn(React, "useState").mockImplementationOnce(() => [false, jest.fn()]).mockImplementationOnce(() => [true, jest.fn()]);
    renderPage();
    // Should not find suggestions or searching text
    expect(screen.queryByTestId("gpt-movie-suggestions")).toBeNull();
    expect(screen.queryByText("Searching...")).toBeNull();
  });
});
