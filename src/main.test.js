import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Root from "./routes/root";
import Projects from "./routes/projects";

jest.mock("./routes/root", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

jest.mock("./routes/projects", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

describe("main.js", () => {
  it("renders Root component with router", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>,
    );

    expect(Root).toHaveBeenCalledTimes(1);
    expect(Projects).not.toHaveBeenCalled();
  });

  it("renders Projects component with router", async () => {
    render(
      <MemoryRouter initialEntries={["/projects/123"]}>
        <Projects />
      </MemoryRouter>,
    );

    // expect(Root).not.toHaveBeenCalled();
    expect(Projects).toHaveBeenCalledTimes(1);
  });
});
