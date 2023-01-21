import { render, screen } from "@testing-library/react";
import Appointment from "./Appointment";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test Appointment", function () {
  test("Initial Render", () => {
    const { container } = render(<Appointment />);

    const text = screen.getByText(/Appointment Selection/i);
    expect(text).toBeInTheDocument();

    const searchButton = container.querySelector("#search-button");
    expect(searchButton).not.toBeNull();
  });
});
