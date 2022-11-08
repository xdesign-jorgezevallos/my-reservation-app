import React from "react";
import { render, screen } from "../../../utils/test-utils"

import { HomePage } from "../HomePage";

describe('HomePage', () => {
  it("render HOME page", () => {
    render(<HomePage />);
    const titleElement = screen.getByTestId("title-page");
    expect(titleElement).toBeInTheDocument();
  });
})

