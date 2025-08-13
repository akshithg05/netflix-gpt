import React from "react";
import { render, screen } from "@testing-library/react";
import MainContainer from "../MainContainer";

// Mock child components
jest.mock("../VideoTitle", () => ({
  __esModule: true,
  default: ({ title, overview }) => (
    <div data-testid="video-title">{title} - {overview}</div>
  ),
}));
jest.mock("../VideoBackground", () => ({
  __esModule: true,
  default: ({ movieId }) => <div data-testid="video-background">{movieId}</div>,
}));

describe("MainContainer", () => {
  it("renders VideoTitle and VideoBackground with movie data", () => {
    const movie = {
      original_title: "Test Movie",
      overview: "A test movie overview.",
      id: 123,
    };
    render(<MainContainer nowPlayingMovies={[movie]} />);
    expect(screen.getByTestId("video-title")).toHaveTextContent("Test Movie - A test movie overview.");
    expect(screen.getByTestId("video-background")).toHaveTextContent("123");
  });

  it("handles empty nowPlayingMovies gracefully", () => {
    render(<MainContainer nowPlayingMovies={[]} />);
    expect(screen.getByTestId("video-title")).toHaveTextContent("-");
    expect(screen.getByTestId("video-background")).toHaveTextContent("");
  });

  it("handles undefined nowPlayingMovies gracefully", () => {
    render(<MainContainer />);
    expect(screen.getByTestId("video-title")).toHaveTextContent("-");
    expect(screen.getByTestId("video-background")).toHaveTextContent("");
  });
});
