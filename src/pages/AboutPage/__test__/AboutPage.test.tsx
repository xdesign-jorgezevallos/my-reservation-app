import React from "react";
import { render, screen } from '../../../utils/test-utils';

import { AboutPage } from "../AboutPage";

describe('AboutPage',()=>{
  it("render ABOUT page", () => {
    render(<AboutPage />);
    const linkElement = screen.getByTestId("title-page");
    expect(linkElement).toBeInTheDocument();
  });
})
