import * as React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskList from "./List";
import Projects from "../../routes/projects";

jest.mock("../../routes/projects", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

describe("List Task Component", () => {
  it("show some list", async () => {
    const tasks = [
      {
        id: "123",
        title: "abc",
        description: "descriptioooonnss",
        completed: "false",
      },
    ];
    let a = await render(
      <MemoryRouter initialEntries={["/projects/345"]}>
        <Projects>
          <TaskList list={tasks} />
        </Projects>
      </MemoryRouter>,
    );
    // screen.debug();
    // const taskName = await screen.getByTestId("list");
    // expect(taskName).toBe("abc");
  });
});
