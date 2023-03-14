import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import Root, { action } from "./root";
import Projects from "./projects";
import { createProject } from "../utils/project";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

jest.mock("../utils/indexDB", () => ({
  ...jest.requireActual("../utils/indexDB"),
}));
jest.mock("../utils/project", () => ({
  createProject: jest.fn(),
}));
describe("Root route", () => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  beforeEach(() => {
    useLoaderData.mockReturnValue(projects);
  });
  it("renders a list of projects", async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>,
    );

    const projectItems = await findByTestId("project-item");
    expect(projectItems.children.length).toBe(2);
  });

  it("opens and closes project list", async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>,
    );

    const nav = await findByTestId("nav");

    const closeButton = await findByTestId("close");
    fireEvent.click(closeButton);
    expect(nav).not.toBeInTheDocument();

    const openButton = await findByTestId("open");
    fireEvent.click(openButton);
    const projectItems = await findByTestId("project-item");
    expect(projectItems).toBeInTheDocument();
  });

  it("navigates to projects page", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
        <Projects />
      </MemoryRouter>,
    );

    const projectLink = await getByRole("link", { name: "Project 1" });
    const a = fireEvent.click(projectLink);
    expect(document.body.textContent).toContain("Tasks");
  });

  // it("adds a project", async () => {
  //   render(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <Root />
  //     </MemoryRouter>,
  //   );
  //   // console.log(
  //   //   await action({
  //   //     request: {
  //   //       formData: {},
  //   //     },
  //   //   }),
  //   // );
  //   let results = await createProject("Project Test");
  //   console.log(await createProject);
  // });
});
