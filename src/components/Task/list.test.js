import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskList from "./List";
import Projects from "../../routes/projects";

const list = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    completed: "false",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    completed: "true",
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: () => jest.fn().mockResolvedValue(list),
}));

describe("TaskList", () => {
  it("renders a list of tasks", () => {
    render(
      <BrowserRouter>
        <Projects>
          <TaskList list={list} />
        </Projects>
      </BrowserRouter>,
    );
    expect(screen.getByTestId("list")).toHaveTextContent("Task 1");
    expect(screen.getByTestId("list")).toHaveTextContent("Task 2");
  });

  // it("toggles task completion when the checkbox is clicked", () => {
  //   render(
  //     <BrowserRouter>
  //       <TaskList list={list} />
  //     </BrowserRouter>,
  //   );
  //   const task1Checkbox = screen.getByLabelText("Task 1");
  //   const task2Checkbox = screen.getByLabelText("Task 2");
  //   expect(task1Checkbox).not.toBeChecked();
  //   expect(task2Checkbox).toBeChecked();
  //   task1Checkbox.click();
  //   expect(task1Checkbox).toBeChecked();
  //   expect(task2Checkbox).toBeChecked();
  //   task2Checkbox.click();
  //   expect(task1Checkbox).toBeChecked();
  //   expect(task2Checkbox).not.toBeChecked();
  // });

  // it("displays the task as completed when it is marked as completed", () => {
  //   render(
  //     <BrowserRouter>
  //       <TaskList list={list} />
  //     </BrowserRouter>,
  //   );
  //   const task1 = screen.getByTestId("list-1");
  //   const task2 = screen.getByTestId("list-2");
  //   expect(task1).not.toHaveClass("line-through");
  //   expect(task2).toHaveClass("line-through");
  // });

  // it("displays the task edit and delete buttons on hover", () => {
  //   render(
  //     <BrowserRouter>
  //       <TaskList list={list} />
  //     </BrowserRouter>,
  //   );
  //   const task1 = screen.getByTestId("list-1");
  //   const task2 = screen.getByTestId("list-2");
  //   expect(task1).not.toContainHTML("<TaskEdit />");
  //   expect(task1).not.toContainHTML("<MdDeleteOutline />");
  //   expect(task2).toContainHTML("<TaskEdit />");
  //   expect(task2).toContainHTML("<MdDeleteOutline />");
  // });
});
