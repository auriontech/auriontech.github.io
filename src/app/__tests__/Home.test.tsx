import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("renders under development message", () => {
    render(<Home />);

    const heading = screen.getByText("🚧 Under Development 🚧");
    expect(heading).toBeInTheDocument();

    const comingSoon = screen.getByText(
      "We are working on something new. Coming soon!"
    );
    expect(comingSoon).toBeInTheDocument();
  });
});
