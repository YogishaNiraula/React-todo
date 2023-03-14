// import { renderHook, render, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { useState } from "react";
// import { MemoryRouter } from "react-router-dom";
// import ProjectAdd from "./Add";

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   // useSubmitImpl: jest.fn(),
// }));

// test("renders Add component and state variable", async () => {
//   const { result } = renderHook(() => useState(false));
//   const [open, setOpen] = result.current;

//   expect(open).toBe(false);
//   expect(typeof setOpen).toBe("function");

//   const { getByTestId, debug } = render(
//     <MemoryRouter initialEntries={["/projects/123"]}>
//       <ProjectAdd />
//     </MemoryRouter>,
//   );
//   const button = await getByTestId("dialog-button");

//   const a = await userEvent.click(button);
//   debug();

//   // const dialog = getByTestId("mock-dialog");

//   // expect(dialog).toBeInTheDocument();
// });
