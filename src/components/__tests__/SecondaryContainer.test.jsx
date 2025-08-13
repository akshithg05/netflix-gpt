import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SecondaryContainer from "../SecondaryContainer";

// Mock MovieList
jest.mock("../MovieList", () => ({
  __esModule: true,
  default: ({ title, movies }) => (
    <div data-testid="movie-list">{title} ({(movies && movies.length) || 0})</div>
  ),
}));

// Mock language constants
jest.mock("../../utils/languageConstants", () => ({
  __esModule: true,
  default: {
    en: {
      now_playing: "Now Playing",
      top_rated: "Top Rated",
      popular: "Popular",
      upcoming: "Upcoming",
      horror: "Horror",
      action: "Action",
    },
  },
}));

function makeStore(movies, language = "en") {
  return configureStore({
    reducer: () => ({
      movies,
      language: { currentLanguage: language },
    }),
    preloadedState: {},
  });
}

describe("SecondaryContainer", () => {
  it("renders all MovieList components with correct titles and movie counts", () => {
    const movies = {
      nowPlayingMovies: [{ id: 1 }],
      topRatedMovies: [{ id: 2 }],
      popularMovies: [{ id: 3 }],
      upComingMovies: [{ id: 4 }],
      horrorMovies: [{ id: 5 }],
      actionMovies: [{ id: 6 }],
    };
    const store = makeStore(movies);
    render(
      <Provider store={store}>
        <SecondaryContainer />
      </Provider>
    );
    expect(screen.getByText("Now Playing (1)")).toBeInTheDocument();
    expect(screen.getByText("Top Rated (1)")).toBeInTheDocument();
    expect(screen.getByText("Popular (1)")).toBeInTheDocument();
    expect(screen.getByText("Upcoming (1)")).toBeInTheDocument();
    expect(screen.getByText("Horror (1)")).toBeInTheDocument();
    expect(screen.getByText("Action (1)")).toBeInTheDocument();
  });

  it("renders with empty movie arrays", () => {
    const store = makeStore({});
    render(
      <Provider store={store}>
        <SecondaryContainer />
      </Provider>
    );
    expect(screen.getByText("Now Playing (0)")).toBeInTheDocument();
    expect(screen.getByText("Top Rated (0)")).toBeInTheDocument();
    expect(screen.getByText("Popular (0)")).toBeInTheDocument();
    expect(screen.getByText("Upcoming (0)")).toBeInTheDocument();
    expect(screen.getByText("Horror (0)")).toBeInTheDocument();
    expect(screen.getByText("Action (0)")).toBeInTheDocument();
  });
});
