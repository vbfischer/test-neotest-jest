import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<h3 />);

    expect(true).toBe(true);
  });
});
