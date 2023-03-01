import { useEffect, useState } from "react";
import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { insertDataInDB } from "../utils/indexDB";
import { createProject, getProjects } from "../utils/project";
import { BsPlus } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export async function action() {
  const projects = await createProject(project_name.value);
  return { projects };
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
      <aside className="min-h-full p-10 w-96">
        <div className="flex items-center justify-between">
          <h5>Projects</h5>
          <div>
            <button onClick={() => setOpenForm(true)}>
              <BsPlus />
            </button>
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
                  className="bg-gray-200 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="Submit"
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
                  <li key={project.id}>
                    <NavLink to={`projects/${project.id}`}>
                      {project.name}
                    </NavLink>
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
