import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Router } from "react-router-dom";
import Root, { action, loader } from "./root";

jest.mock("../utils/indexDB");
jest.mock("../utils/project");
jest.mock("./root", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

describe("Root", () => {
  it("renders a list of projects using loader", async () => {
    const projects = [
      { id: "1", name: "Project 1" },
      { id: "2", name: "Project 2" },
    ];
    loader.mockResolvedValueOnce(projects);
    // await loader(projects);
    const { getByText } = render(
      <MemoryRouter initialEntries={["/projects/1"]}>
        <Root />
      </MemoryRouter>,
    );
    expect(getByText("Projects", { exact: false })).toBeInTheDocument();
    // const projectItems = screen.getAllByTestId("custom-element");
    // expect(projectItems).toHaveLength(2);
    // expect(projectItems[0]).toHaveTextContent("Project 1");
    // expect(projectItems[1]).toHaveTextContent("Project 2");
  });
});

// import { loader } from "./loader ko path";
// import { getProject } from "../utils/project";

// jest.mock("../utils/project");

// describe("loader", () => {
//   it("should return project data", async () => {
//     const projectId = "123";
//     const projectData = { id: projectId, name: "Test Project" };
//     getProject.mockResolvedValue(projectData);

//     const params = { projectId };
//     const result = await loader({ params });

//     expect(getProject).toHaveBeenCalledWith(projectId);
//     expect(result).toEqual({ project: projectData });
//   });
// });
