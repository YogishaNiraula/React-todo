import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./routes/error-page";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Projects, {
  loader as projectLoader,
  action as projectAction,
} from "./routes/projects";
import Root, {
  action as rootAction,
  loader as rootLoader,
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
        element: <Projects />,
        loader: projectLoader,
        action: projectAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
