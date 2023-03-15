import {
  renderHook,
  render,
  fireEvent,
  act,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { BrowserRouter, MemoryRouter, useLoaderData } from "react-router-dom";
import ProjectAdd from "./Add";
import Root from "../../routes/root";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

describe("Add Project Component", () => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  beforeEach(() => {
    useLoaderData.mockReturnValue(projects);
  });
  it("renders Add component and state variable", async () => {
    const { result } = renderHook(() => useState(false));
    const [open, setOpen] = result.current;

    expect(open).toBe(false);
    expect(typeof setOpen).toBe("function");

    const { getByTestId, debug } = act(() => {
      render(
        <MemoryRouter initialEntries={["/projects/123"]}>
          <ProjectAdd />
        </MemoryRouter>,
      );
    });
    const button = await screen.getByTestId("dialog-button");
    const a = await userEvent.click(button);
    screen.debug();

    // const dialog = getByTestId("mock-dialog");

    // expect(dialog).toBeInTheDocument();
  });
});
