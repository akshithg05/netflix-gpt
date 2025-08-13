import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import TrailerModal from "../TrailerModal";

// Mock API and constants
jest.mock("../../utils/api", () => ({
  getMovieTrailerUrl: (id) => `mock-url/${id}`,
}));
jest.mock("../../utils/constants", () => ({
  API_OPTIONS: {},
  TRAILER: "Trailer",
}));

// Mock language constants
jest.mock("../../utils/languageConstants", () => ({
  __esModule: true,
  default: {
    en: {
      loading: "Loading...",
      no_trailer_message: "No trailer found.",
    },
  },
}));

global.fetch = jest.fn();

function makeStore(language = "en") {
  return configureStore({
    reducer: () => ({ language: { currentLanguage: language } }),
    preloadedState: {},
  });
}

describe("TrailerModal", () => {
  const movie = { id: 42, title: "Test Movie" };
  let setIsOpen;

  beforeEach(() => {
    setIsOpen = jest.fn();
    jest.clearAllMocks();
  });

  it("shows loading, then renders trailer iframe if found", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        results: [
          { type: "Trailer", key: "yt123" },
          { type: "Other", key: "yt999" },
        ],
      }),
    });
    render(
      <Provider store={makeStore()}>
        <TrailerModal movie={movie} setIsOpen={setIsOpen} />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
        "src",
        expect.stringContaining("yt123")
      );
    });
  });

  it("shows no trailer message if no trailer found", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });
    render(
      <Provider store={makeStore()}>
        <TrailerModal movie={movie} setIsOpen={setIsOpen} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("No trailer found.")).toBeInTheDocument();
    });
  });

  it("shows error message if fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("fail"));
    render(
      <Provider store={makeStore()}>
        <TrailerModal movie={movie} setIsOpen={setIsOpen} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("No trailer found.")).toBeInTheDocument();
    });
  });

  it("calls setIsOpen(false) when Close button is clicked", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });
    render(
      <Provider store={makeStore()}>
        <TrailerModal movie={movie} setIsOpen={setIsOpen} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("No trailer found.")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Close"));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
