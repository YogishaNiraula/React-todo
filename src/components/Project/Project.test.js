import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import Root from "../../routes/root";
import ProjectAdd from "./Add";
import {
  BrowserRouter,
  createMemoryRouter,
  MemoryRouter,
} from "react-router-dom";

describe("Project Add - Component Test", () => {
  const renderedApp = render(
    <BrowserRouter>
      <Root />
    </BrowserRouter>,
  );
  // test(Root, async () => {
  //   const routes = [
  //     {
  //       path: "/",
  //       element: <Root />,
  //       loader: () => {},
  //     },
  //   ];
  //   const router = createMemoryRouter(routes, {
  //     initialEntries: ["projects"],
  //   });
  //   render(<RouterProvider router={router} />);
  // });
  it("should allow a user to add a new project", async () => {
    const renderedAddProject = render(<ProjectAdd />);
    const input = await renderedAddProject.findByLabelText("project-name");
    user.type(input, "Project 1");
    const addProjectButton = await renderedAddProject.findByLabelText(
      "add-project-btn",
    );
    user.click(addProjectButton);
    const projects = await renderedApp.findAllByTestId(/^project-/);
    expect(projects.length).toEqual(1);
  });
});
