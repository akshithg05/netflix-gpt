import React from "react";
import { render, screen } from "@testing-library/react";
import VideoBackground from "../VideoBackground";

// Mock useMovieTrailer
jest.mock("../../hooks/useMovieTrailer", () => ({
  __esModule: true,
  default: jest.fn(),
}));
const useMovieTrailer = require("../../hooks/useMovieTrailer").default;

describe("VideoBackground", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders iframe with correct YouTube src when trailerVideo is present", () => {
    useMovieTrailer.mockReturnValue({ key: "ytkey123" });
    render(<VideoBackground movieId={42} />);
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("ytkey123")
    );
  });

  it("renders iframe with undefined key if trailerVideo is missing", () => {
    useMovieTrailer.mockReturnValue(undefined);
    render(<VideoBackground movieId={42} />);
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("undefined")
    );
  });
});
