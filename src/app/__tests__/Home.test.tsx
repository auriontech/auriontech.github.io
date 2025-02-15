import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders welcome message and introduction", () => {
    // Check main heading
    const heading = screen.getByText("🚀 Building Hard Tech for Fun!");
    expect(heading).toBeInTheDocument();

    // Check introduction text
    const introText = screen.getByText(
      /Hey, I'm Adol. I tinker, build, and experiment/
    );
    expect(introText).toBeInTheDocument();
  });

  it("renders work in progress and coming soon messages", () => {
    // Check work in progress message
    const progressText = screen.getByText(/This page is a work in progress/);
    expect(progressText).toBeInTheDocument();

    // Check coming soon text
    const comingSoon = screen.getByText("More fun tech coming soon!");
    expect(comingSoon).toBeInTheDocument();
  });

  it("has proper heading hierarchy", () => {
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("🚀 Building Hard Tech for Fun!");
  });
});
