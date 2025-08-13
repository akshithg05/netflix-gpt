import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";

// Mock getTMDBImageUrl
jest.mock("../../utils/api", () => ({
  getTMDBImageUrl: (path) => `mocked-url/${path}`,
}));

describe("MovieCard", () => {
  it("renders image with correct src and alt", () => {
    render(<MovieCard posterPath="poster123.jpg" />);
    const img = screen.getByAltText("Movie card");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "mocked-url/poster123.jpg");
    expect(img).toHaveClass("w-full");
    expect(img).toHaveClass("rounded");
  });
});
