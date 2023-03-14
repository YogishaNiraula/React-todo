import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLoaderData } from "react-router-dom";
import Root, { loader } from "./root";
import { createProject } from "../utils/project";

jest.mock("../utils/project", () => ({
  getProjects: jest.fn().mockResolvedValue([
    { id: "1", name: "Project 1" },
    { id: "2", name: "Project 2" },
  ]),
}));
jest.mock("../utils/indexDB");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn().mockResolvedValue([
    { id: "1", name: "Project 1" },
    { id: "2", name: "Project 2" },
  ]),
}));
describe("Root route", () => {
  it("renders a list of projects", async () => {
    const { findByTestId } = await render(<Root />);
    const a = await useLoaderData();
    console.log(a);
    // const projectItems = await findByTestId("project-items");
    // expect(projectItems.children.length).toBe(2);
  });

  // it("adds project with actions", async () => {
  //   const { findByTestId } = await render(<Root />);

  //   let new_project = await createProject("ProjectName1");
  //   console.log("newProject", new_project);
  //   // expect(new_project).toBe()
  // });
});

// describe("loader function", () => {
//   it("loads projects from the API", async () => {
//     const projects = await loader();
//     expect(projects.length).toBe(2);
//     expect(projects[0].name).toBe("Project 1");
//     expect(projects[1].name).toBe("Project 2");
//   });
// });
