import React from "react";
import { act, render } from "@testing-library/react";
import Projects, { action } from "./projects";
import { MemoryRouter, useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

jest.mock("../utils/indexDB", async () => ({
  ...jest.requireActual("../utils/indexDB"),
}));

describe("Projects Route", () => {
  const project = {
    id: 123,
    tasks: [
      {
        id: 234,
        completed: "false",
        title: "Task 1",
        description: "Task description",
      },
    ],
  };
  beforeAll(async () => {
    useLoaderData.mockReturnValue(project);
  });
  it("should render projects route", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/projects/123"]}>
        <Projects />
      </MemoryRouter>,
    );
    const heading = getByRole("heading", { level: 5 });
    expect(heading.innerHTML).toBe("Tasks");
  });

  it("should return a redirect", async () => {
    let request = {
      formData: () => {
        const data = {
          _type: "createTask",
          id: 123,
          title: "abc",
          description: "description",
          completed: "false",
        };
        function get(type) {
          return data[type];
        }
        return { get };
      },
    };

    // const response = await action({ params: {}, request: request });
    // console.log(response);
    // expect(response).toEqual(redirect("/new/path"));
  });
});
