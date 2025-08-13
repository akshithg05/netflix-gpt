import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SuggestedMovieCard from "../SuggestedMovieCard";

// Mock TrailerModal
jest.mock("../TrailerModal", () => ({
  __esModule: true,
  default: ({ movie }) => <div data-testid="trailer-modal">Trailer for {movie.title}</div>,
}));

describe("SuggestedMovieCard", () => {
  const movie = {
    poster_path: "poster.jpg",
    title: "Test Movie",
    release_date: "2025-01-01",
    overview: "A test movie overview.",
  };

  it("renders movie details and poster", () => {
    render(<SuggestedMovieCard movie={movie} />);
    expect(screen.getByAltText("Test Movie")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("A test movie overview.")).toBeInTheDocument();
  });

  it("renders placeholder image if poster_path is missing", () => {
    const movieNoPoster = { ...movie, poster_path: undefined };
    render(<SuggestedMovieCard movie={movieNoPoster} />);
    expect(screen.getByAltText("Test Movie")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  it("shows TrailerModal when card is clicked", () => {
    render(<SuggestedMovieCard movie={movie} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("trailer-modal")).toHaveTextContent("Trailer for Test Movie");
  });
});
