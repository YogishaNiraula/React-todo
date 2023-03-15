import React from "react";
import { act, render } from "@testing-library/react";
import TaskList from "./List";
import {
  MemoryRouter,
  useSubmit,
  Form,
  BrowserRouter,
  useSubmitImpl,
  createBrowserRouter,
  Router,
  createMemoryRouter,
} from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe("Task List Component", () => {
  const lists = [
    {
      id: 123,
      title: "Task 1",
      description: "Description 1",
      completed: "false",
    },
    {
      id: 456,
      title: "Task 2",
      description: "Description 2",
      completed: "true",
    },
  ];

  it("renders a list of tasks", async () => {
    // const { debug } = await act(() => {
    //   render(
    //     <MemoryRouter initialEntries={["/projects/123"]}>
    //       <TaskList list={lists} />
    //     </MemoryRouter>,
    //   );
    // });
    // const { debug } = render(
    //   <MemoryRouter initialEntries={["/projects/123"]}>
    //     <TaskList list={lists} />
    //   </MemoryRouter>,
    // );
    // debug();
  });
});
