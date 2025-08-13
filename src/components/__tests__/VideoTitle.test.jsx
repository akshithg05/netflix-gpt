import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import VideoTitle from "../VideoTitle";

// Mock grommet-icons
jest.mock("grommet-icons", () => ({
  PlayFill: (props) => <svg data-testid="play-icon" {...props} />,
  CircleInformation: (props) => <svg data-testid="info-icon" {...props} />,
}));

// Mock language constants
jest.mock("../../utils/languageConstants", () => ({
  __esModule: true,
  default: {
    en: {
      play: "Play",
      more_info: "More Info",
    },
  },
}));

function makeStore(language = "en") {
  return configureStore({
    reducer: () => ({ language: { currentLanguage: language } }),
    preloadedState: {},
  });
}

describe("VideoTitle", () => {
  it("renders title, overview, and buttons with icons and correct text", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <VideoTitle title="Test Movie" overview="A test overview." />
      </Provider>
    );
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("A test overview.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Play/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /More Info/ })).toBeInTheDocument();
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });
});
