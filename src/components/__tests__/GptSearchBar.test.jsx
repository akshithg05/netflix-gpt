import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import GptSearchBar from "../GptSearchBar";

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
      gpt_search_placeholder: "Search for movies...",
      search: "Search",
      clear: "Clear",
    },
  },
}));

// Mock openai
jest.mock("../../utils/openai", () => ({
  __esModule: true,
  default: {
    responses: {
      create: jest.fn().mockResolvedValue({
        output: [
          { content: [ { text: "Movie1,Movie2" } ] }
        ]
      })
    }
  }
}));

// Mock API and constants
jest.mock("../../utils/constants", () => ({
  API_OPTIONS: {},
  GPT_INSTRUCTIONS: "test instructions"
}));
jest.mock("../../utils/api", () => ({
  searchMovieTMDBUrl: (name) => `mock-url/${name}`
}));

global.fetch = jest.fn((url) => Promise.resolve({
  json: () => Promise.resolve({ results: [{ title: url }] })
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("GptSearchBar", () => {
  let setIsLoading, setClear;
  beforeEach(() => {
    setIsLoading = jest.fn();
    setClear = jest.fn();
    mockStore.dispatch.mockClear();
    mockNavigate.mockClear();
    global.fetch.mockClear();
  });

  function renderBar() {
    return render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GptSearchBar setIsLoading={setIsLoading} setClear={setClear} />
        </MemoryRouter>
      </Provider>
    );
  }

  it("renders input and buttons", () => {
    renderBar();
    expect(screen.getByPlaceholderText("Search for movies...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("calls setClear and dispatches on clear click", () => {
    renderBar();
    fireEvent.click(screen.getByText("Clear"));
    expect(setClear).toHaveBeenCalledWith(true);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it("calls setIsLoading, fetch, and dispatch on search click", async () => {
    renderBar();
    const input = screen.getByPlaceholderText("Search for movies...");
    fireEvent.change(input, { target: { value: "Movie1" } });
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(global.fetch).toHaveBeenCalled();
      expect(mockStore.dispatch).toHaveBeenCalled();
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("navigates to /error if openai response has no output", async () => {
    const openai = require("../../utils/openai").default;
    openai.responses.create.mockResolvedValueOnce({});
    renderBar();
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/error");
    });
  });

  it("navigates to /error on fetch error", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("fail"));
    renderBar();
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/error");
    });
  });
});
