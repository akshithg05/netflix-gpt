
// Mock constants to avoid import.meta.env issues
jest.mock("../../utils/constants", () => ({
  NO_RESULTS_FOUND: "No results found",
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import GptSearchMovieSuggestions from "../GptSearchMovieSuggestions";

// Mock Redux store factory
function makeStore(tmdbResults = [], currentLanguage = "en") {
  return {
    getState: () => ({
      gpt: { tmdbResults },
      language: { currentLanguage },
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };
}

// Mock language constants
jest.mock("../../utils/languageConstants", () => ({
  __esModule: true,
  default: {
    en: {
      no_keywords_text: "No movies found.",
    },
  },
}));

// Mock SuggestedMovieCard
jest.mock("../SuggestedMovieCard", () => ({
  __esModule: true,
  default: ({ movie }) => (
    <div data-testid="suggested-movie">{movie.title}</div>
  ),
}));

describe("GptSearchMovieSuggestions", () => {
  it("renders SuggestedMovieCard for each movie", () => {
    const movies = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
    ];
    const store = makeStore(movies);
    render(
      <Provider store={store}>
        <GptSearchMovieSuggestions />
      </Provider>
    );
    const cards = screen.getAllByTestId("suggested-movie");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Movie 1");
    expect(cards[1]).toHaveTextContent("Movie 2");
  });
});
