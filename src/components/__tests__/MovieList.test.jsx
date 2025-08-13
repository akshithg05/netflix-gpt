import React from "react";
import { render, screen } from "@testing-library/react";
import MovieList from "../MovieList";

// Mock MovieCard
jest.mock("../MovieCard", () => ({
  __esModule: true,
  default: ({ posterPath }) => <div data-testid="movie-card">{posterPath}</div>,
}));

describe("MovieList", () => {
  it("renders the title and all movie cards", () => {
    const movies = [
      { id: 1, poster_path: "poster1.jpg" },
      { id: 2, poster_path: "poster2.jpg" },
    ];
    render(<MovieList title="Popular Movies" movies={movies} />);
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    const cards = screen.getAllByTestId("movie-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("poster1.jpg");
    expect(cards[1]).toHaveTextContent("poster2.jpg");
  });

  it("renders no movie cards if movies is empty or undefined", () => {
    render(<MovieList title="Empty List" movies={[]} />);
    expect(screen.getByText("Empty List")).toBeInTheDocument();
    expect(screen.queryAllByTestId("movie-card")).toHaveLength(0);

    render(<MovieList title="No Movies" />);
    expect(screen.getByText("No Movies")).toBeInTheDocument();
    expect(screen.queryAllByTestId("movie-card")).toHaveLength(0);
  });
});
