import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "../privacy/page";

describe("Privacy Policy", () => {
  beforeEach(() => {
    render(<PrivacyPolicy />);
  });

  it("renders the main privacy policy heading and effective date", () => {
    const heading = screen.getByText("Privacy Policy");
    expect(heading).toBeInTheDocument();

    const effectiveDate = screen.getByText("Effective Date: 2025-02-15");
    expect(effectiveDate).toBeInTheDocument();
  });

  it("renders all privacy policy sections with correct headings", () => {
    const sections = [
      "1. Information We Collect",
      "2. How We Use Your Information",
      "3. Disclosure of Your Information",
      "4. Data Security",
      "5. Data Retention",
      "6. Your Rights",
      "7. International Data Transfers",
      "8. Third-Party Websites",
      "9. Changes to This Privacy Policy",
      "10. Contact Us",
    ];

    sections.forEach((section) => {
      const sectionHeading = screen.getByText(section);
      expect(sectionHeading).toBeInTheDocument();
    });
  });

  it("displays contact information correctly", () => {
    const email = screen.getByText("Email: contact@adol.tech");
    expect(email).toBeInTheDocument();
  });

  it("has proper heading hierarchy", () => {
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Privacy Policy");

    const subHeadings = screen.getAllByRole("heading", { level: 2 });
    expect(subHeadings).toHaveLength(10); // Verify we have all 10 sections
  });

  it("renders with proper accessibility structure", () => {
    // Verify sections are present
    const sections = screen.getAllByRole("region");
    expect(sections).toHaveLength(10);
  });
});
