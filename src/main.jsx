import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project, { loader as contactLoader } from "./routes/projects";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "projects/:projectId",
        element: <Project />,
        loader: contactLoader,
      },
      {
        path: "projects/:projectId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
