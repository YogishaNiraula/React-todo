import { useEffect, useState } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { insertDataInDB } from "../utils/indexDB";
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from "../utils/project";
import { BsPlus } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProjectMenu from "../components/Project/Menu";
import ProjectAdd from "../components/Project/Add";

export async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("_type");
  switch (actionType) {
    case "createProject":
      const projectId = await createProject(formData.get("project_name"));
      return redirect(`/projects/${projectId}`);
    case "deleteProject":
      await deleteProject(formData.get("delete_id"));
      return redirect("/");
    case "editProject":
      const [edit_id, edit_name] = [
        formData.get("edit_id"),
        formData.get("edit_name"),
      ];
      await editProject({ id: edit_id, project_data: { name: edit_name } });
      return redirect(`/projects/${edit_id}`);
    default:
      throw new Error(`Unknown Action Type ${actionType}`);
  }
}

export async function loader() {
  const projects = await getProjects();
  return projects;
}

export default function Root() {
  const projects = useLoaderData();
  const [showNav, setShowNav] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    insertDataInDB();
  });

  return (
    <div className="flex justify-start space-x-5">
      <aside className="min-h-full p-10 w-[30rem]">
        <div className="flex items-center justify-between">
          <h5>Projects</h5>
          <div className="flex items-center space-x-3">
            <ProjectAdd />
            {showNav ? (
              <button onClick={() => setShowNav(false)}>
                <MdKeyboardArrowUp />
              </button>
            ) : (
              <button onClick={() => setShowNav(true)}>
                <MdKeyboardArrowDown />
              </button>
            )}
          </div>
        </div>
        {openForm && (
          <div className="fixed z-10 top-1/5 left-1/3 w-1/4 bg-white border border-gray-200 drop-shadow-2xl rounded-md p-5">
            <Form method="post" className="flex flex-col justify-center">
              <h3 className="text-xl font-medium">Add Project</h3>
              <label
                htmlFor="project_name"
                className="text-base text-gray-500 my-2"
              >
                Name
              </label>
              <input
                type="text"
                name="project_name"
                id="project_name"
                placeholder="Project Name"
                className="bg-white text-black placeholder:text-gray-600 px-4 py-2 border border-gray-600 rounded my-2"
                required
              />

              <div className="flex space-x-4 justify-end my-4">
                <button
                  onClick={() => setOpenForm(false)}
                  type="button"
                  className="bg-gray-200 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="Submit"
                  name="_type"
                  value="deleteProject"
                  onClick={() => setTimeout(() => setOpenForm(false), 500)}
                  className="bg-[#db4c3f] text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  type="Submit"
                  name="_type"
                  value="updateProject"
                  onClick={() => setTimeout(() => setOpenForm(false), 500)}
                  className="bg-[#db4c3f] text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="Submit"
                  name="_type"
                  value="createProject"
                  onClick={() => setTimeout(() => setOpenForm(false), 500)}
                  className="bg-[#db4c3f] text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </Form>
          </div>
        )}
        {showNav && (
          <nav>
            {projects.length ? (
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex justify-between items-start my-2"
                  >
                    <NavLink to={`projects/${project.id}`}>
                      <p>{project?.name}</p>
                    </NavLink>
                    <div className="flex flex-col items-end">
                      <ProjectMenu project={project} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects</p>
            )}
          </nav>
        )}
      </aside>
      <div className="container mx-auto p-10">
        <Outlet />
      </div>
    </div>
  );
}
