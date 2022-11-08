import React from "react";
import { render, screen } from "@testing-library/react";
import NavBarMenu from "./NavBarMenu";

test("render NAVBAR menu", () => {
  render(<NavBarMenu />);
  const linkElement = screen.getByTestId("navbar-menu");
  expect(linkElement).toBeInTheDocument();
});
